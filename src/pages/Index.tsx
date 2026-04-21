import { useState } from "react";
import Icon from "@/components/ui/icon";
import AuthModal from "@/components/AuthModal";
import HomePage from "@/components/HomePage";
import DepositsPage from "@/components/DepositsPage";
import SupportPage from "@/components/SupportPage";

const AUTH_URL = "https://functions.poehali.dev/73cb23fb-72fa-4df1-9156-0acecaa2a7c6";

type Page = "home" | "deposits" | "support";
type AuthView = "login" | "register";

interface User {
  id: number;
  name: string;
  email: string;
}

const deposits = [
  {
    id: 0,
    name: "Старт",
    rate: 8,
    minAmount: 100,
    term: "3–6 мес",
    color: "from-blue-500/20 to-blue-600/10",
    accent: "#3b82f6",
    features: ["Ежемесячные выплаты", "Частичное снятие", "TRC-20 / ERC-20"],
    badge: null,
  },
  {
    id: 1,
    name: "Максимум",
    rate: 15,
    minAmount: 500,
    term: "12–24 мес",
    color: "from-emerald-500/20 to-emerald-600/10",
    accent: "#00e5a0",
    features: ["Капитализация процентов", "Автопролонгация", "TRC-20 / ERC-20"],
    badge: "Популярный",
  },
  {
    id: 2,
    name: "Премиум",
    rate: 22,
    minAmount: 5000,
    term: "6–36 мес",
    color: "from-purple-500/20 to-purple-600/10",
    accent: "#a855f7",
    features: ["Персональный менеджер", "Гибкие условия", "VIP-обслуживание"],
    badge: "VIP",
  },
];

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "deposits", label: "Вклады", icon: "TrendingUp" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [calcAmount, setCalcAmount] = useState(1000);
  const [calcMonths, setCalcMonths] = useState(12);
  const [selectedDeposit, setSelectedDeposit] = useState(1);
  const [supportForm, setSupportForm] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const callAuth = async (action: string, payload: object) => {
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    return res.json();
  };

  const handleRegister = async () => {
    setAuthError("");
    setAuthLoading(true);
    const data = await callAuth("register", {
      name: authForm.name,
      email: authForm.email,
      password: authForm.password,
    });
    setAuthLoading(false);
    if (data.error) { setAuthError(data.error); return; }
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setShowAuth(false);
    setAuthForm({ name: "", email: "", password: "" });
  };

  const handleLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    const data = await callAuth("login", {
      email: authForm.email,
      password: authForm.password,
    });
    setAuthLoading(false);
    if (data.error) { setAuthError(data.error); return; }
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setShowAuth(false);
    setAuthForm({ name: "", email: "", password: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const selectedRate = deposits[selectedDeposit].rate;
  const income = parseFloat(((calcAmount * selectedRate / 100) * (calcMonths / 12)).toFixed(2));
  const total = parseFloat((calcAmount + income).toFixed(2));

  return (
    <div className="min-h-screen bg-background pb-24">

      {showAuth && (
        <AuthModal
          authView={authView}
          authForm={authForm}
          authError={authError}
          authLoading={authLoading}
          onClose={() => setShowAuth(false)}
          onViewChange={(v) => { setAuthView(v); setAuthError(""); }}
          onFormChange={(field, value) => setAuthForm(f => ({ ...f, [field]: value }))}
          onRegister={handleRegister}
          onLogin={handleLogin}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <Icon name="Banknote" size={16} className="text-black" />
          </div>
          <span className="font-display font-black text-base tracking-tight text-white">
            Вклад<span className="neon-text">Про</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-emerald-500/20">
                <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                  <span className="text-[10px] font-black text-black">{user.name[0].toUpperCase()}</span>
                </div>
                <span className="text-xs text-white font-medium">{user.name.split(" ")[0]}</span>
              </div>
              <button onClick={handleLogout} className="text-muted-foreground">
                <Icon name="LogOut" size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowAuth(true); setAuthView("login"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400 text-black text-xs font-bold"
            >
              <Icon name="User" size={13} />
              Войти
            </button>
          )}
        </div>
      </header>

      {/* Pages */}
      <main className="max-w-2xl mx-auto">
        {page === "home" && (
          <HomePage
            onGoDeposits={() => setPage("deposits")}
            onGoDepositSelected={(id) => { setSelectedDeposit(id); setPage("deposits"); }}
          />
        )}

        {page === "deposits" && (
          <DepositsPage
            deposits={deposits}
            selectedDeposit={selectedDeposit}
            calcAmount={calcAmount}
            calcMonths={calcMonths}
            income={income}
            total={total}
            onSelectDeposit={setSelectedDeposit}
            onCalcAmountChange={setCalcAmount}
            onCalcMonthsChange={setCalcMonths}
            onOpenDeposit={() => setPage("support")}
          />
        )}

        {page === "support" && (
          <SupportPage
            supportForm={supportForm}
            formSent={formSent}
            onFormChange={(field, value) => setSupportForm(f => ({ ...f, [field]: value }))}
            onFormSend={() => setFormSent(true)}
          />
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/5">
        <div className="flex items-center max-w-2xl mx-auto">
          {navItems.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
                  active ? "text-emerald-400" : "text-muted-foreground"
                }`}
              >
                <div className={`relative w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                  active ? "bg-emerald-500/15" : ""
                }`}>
                  <Icon name={item.icon} size={20} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
