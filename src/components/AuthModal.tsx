import Icon from "@/components/ui/icon";

type AuthView = "login" | "register";

interface AuthModalProps {
  authView: AuthView;
  authForm: { name: string; email: string; password: string };
  authError: string;
  authLoading: boolean;
  onClose: () => void;
  onViewChange: (v: AuthView) => void;
  onFormChange: (field: string, value: string) => void;
  onRegister: () => void;
  onLogin: () => void;
}

export default function AuthModal({
  authView,
  authForm,
  authError,
  authLoading,
  onClose,
  onViewChange,
  onFormChange,
  onRegister,
  onLogin,
}: AuthModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 mb-4 sm:mb-0 glass-card rounded-3xl p-6 border border-white/10 animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground">
          <Icon name="X" size={20} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <Icon name="Banknote" size={16} className="text-black" />
          </div>
          <span className="font-display font-black text-base text-white">Вклад<span className="neon-text">Про</span></span>
        </div>

        <div className="flex gap-1 p-1 rounded-2xl bg-white/5 mb-5">
          {(["login", "register"] as AuthView[]).map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                authView === v ? "bg-emerald-400 text-black" : "text-muted-foreground"
              }`}
            >
              {v === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {authView === "register" && (
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
              <input
                type="text"
                value={authForm.name}
                onChange={(e) => onFormChange("name", e.target.value)}
                placeholder="Иван Иванов"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={authForm.email}
              onChange={(e) => onFormChange("email", e.target.value)}
              placeholder="example@mail.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Пароль</label>
            <input
              type="password"
              value={authForm.password}
              onChange={(e) => onFormChange("password", e.target.value)}
              placeholder="Минимум 6 символов"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        {authError && (
          <div className="mt-3 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {authError}
          </div>
        )}

        <button
          onClick={authView === "register" ? onRegister : onLogin}
          disabled={authLoading}
          className="w-full py-3.5 mt-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-sm active:scale-95 transition-all disabled:opacity-60"
        >
          {authLoading ? "Загрузка..." : authView === "register" ? "Создать аккаунт" : "Войти"}
        </button>

        <p className="text-center text-xs text-muted-foreground mt-3">
          {authView === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <button
            onClick={() => onViewChange(authView === "login" ? "register" : "login")}
            className="text-emerald-400 font-medium"
          >
            {authView === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
}
