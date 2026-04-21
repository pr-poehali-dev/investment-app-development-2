"""
Регистрация и авторизация пользователей по email.
POST / {"action": "register"} — создать аккаунт (имя, email, пароль)
POST / {"action": "login"} — войти (email, пароль)
POST / {"action": "me"} — данные текущего пользователя по токену
"""
import json
import os
import hashlib
import hmac
import base64
import time
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def get_schema():
    return os.environ["MAIN_DB_SCHEMA"]

def hash_password(password: str) -> str:
    salt = os.environ.get("JWT_SECRET", "fallback_secret_key_32chars_min!")
    return hashlib.sha256((salt + password).encode()).hexdigest()

def make_token(user_id: int) -> str:
    secret = os.environ.get("JWT_SECRET", "fallback_secret_key_32chars_min!").encode()
    payload = base64.b64encode(json.dumps({"id": user_id, "ts": int(time.time())}).encode()).decode()
    sig = hmac.new(secret, payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}.{sig}"

def verify_token(token: str):
    if not token:
        return None
    secret = os.environ.get("JWT_SECRET", "fallback_secret_key_32chars_min!").encode()
    parts = token.split(".")
    if len(parts) != 2:
        return None
    payload, sig = parts
    expected = hmac.new(secret, payload.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(sig, expected):
        return None
    data = json.loads(base64.b64decode(payload).decode())
    return data.get("id")

def ok(body: dict, status=200):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(body, ensure_ascii=False)}

def err(msg: str, status=400):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg}, ensure_ascii=False)}

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action", "")
    schema = get_schema()

    # REGISTER
    if action == "register":
        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not all([name, email, password]):
            return err("Заполните все поля")
        if "@" not in email or "." not in email:
            return err("Введите корректный email")
        if len(password) < 6:
            return err("Пароль должен быть минимум 6 символов")

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {schema}.users WHERE email = %s", (email,))
        if cur.fetchone():
            conn.close()
            return err("Email уже зарегистрирован")

        cur.execute(
            f"INSERT INTO {schema}.users (name, phone, email, password_hash) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, "", email, pw_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        token = make_token(user_id)
        return ok({"token": token, "user": {"id": user_id, "name": name, "email": email}})

    # LOGIN
    if action == "login":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not email or not password:
            return err("Введите email и пароль")

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, email FROM {schema}.users WHERE email = %s AND password_hash = %s",
            (email, pw_hash)
        )
        row = cur.fetchone()
        conn.close()

        if not row:
            return err("Неверный email или пароль")

        user_id, name, email = row
        token = make_token(user_id)
        return ok({"token": token, "user": {"id": user_id, "name": name, "email": email}})

    # ME
    if action == "me":
        token = body.get("token") or event.get("headers", {}).get("X-Auth-Token", "")
        user_id = verify_token(token)
        if not user_id:
            return err("Не авторизован", 401)

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, name, email, created_at FROM {schema}.users WHERE id = %s", (user_id,))
        row = cur.fetchone()
        conn.close()

        if not row:
            return err("Пользователь не найден", 404)

        return ok({"user": {"id": row[0], "name": row[1], "email": row[2], "created_at": str(row[3])}})

    return err("Неизвестное действие", 400)
