import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "deposits" | "support";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [calcAmount, setCalcAmount] = useState(1000);
  const [calcMonths, setCalcMonths] = useState(12);
  const [selectedDeposit, setSelectedDeposit] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [supportForm, setSupportForm] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

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

  const faqItems = [
    { q: "Как пополнить вклад в USDT?", a: "Выберите вклад, получите адрес кошелька (TRC-20 или ERC-20) и переведите нужную сумму. Зачисление — в течение 10 минут." },
    { q: "Как выводить проценты?", a: "Проценты выводятся на любой USDT-кошелёк: TRC-20 (Tron) или ERC-20 (Ethereum) — по вашему выбору." },
    { q: "Безопасно ли хранить USDT у вас?", a: "Да. Средства хранятся в холодных кошельках с мультиподписью. Выплаты гарантированы смарт-контрактом." },
    { q: "Можно ли пополнять вклад?", a: "Вклады «Максимум» и «Премиум» поддерживают пополнение в любое время на протяжении всего срока." },
    { q: "Что будет при досрочном закрытии?", a: "При досрочном закрытии выплачивается тело вклада за вычетом 2% — начисленные проценты сгорают." },
  ];

  const selectedRate = deposits[selectedDeposit].rate;
  const income = parseFloat(((calcAmount * selectedRate / 100) * (calcMonths / 12)).toFixed(2));
  const total = parseFloat((calcAmount + income).toFixed(2));

  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "deposits", label: "Вклады", icon: "TrendingUp" },
    { id: "support", label: "Поддержка", icon: "MessageCircle" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
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
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">Лицензия ЦБ РФ</div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />
        </div>
      </header>

      {/* Pages */}
      <main className="max-w-2xl mx-auto">

        {/* HOME */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <section className="relative px-4 pt-10 pb-8 overflow-hidden gradient-mesh">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

              <div className="relative animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs text-emerald-400 font-medium mb-4">
                  <Icon name="Sparkles" size={12} />
                  До 22% годовых в USDT — лучшие условия 2026
                </div>

                <h1 className="font-display text-4xl font-black text-white leading-tight mb-3">
                  Ваши деньги<br />
                  <span className="neon-text">работают</span> за вас
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Вклады в USDT — стабильный доход в криптовалюте. Без рисков волатильности, без скрытых комиссий.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPage("deposits")}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-sm transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(0,229,160,0.4)]"
                  >
                    Открыть вклад
                  </button>
                  <button
                    onClick={() => setPage("deposits")}
                    className="px-5 py-3.5 rounded-2xl glass-card text-white font-semibold text-sm border border-white/10 active:scale-95"
                  >
                    Расчёт
                  </button>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="px-4 py-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "22%", label: "Макс. ставка", icon: "Percent" },
                  { value: "USDT", label: "Стабильная монета", icon: "Shield" },
                  { value: "10 мин", label: "Зачисление", icon: "Zap" },
                ].map((stat, i) => (
                  <div key={i} className="glass-card rounded-2xl p-4 flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-2">
                      <Icon name={stat.icon} size={16} className="text-emerald-400" />
                    </div>
                    <div className="font-display font-black text-xl text-white">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured deposit */}
            <section className="px-4 pb-6">
              <h2 className="text-lg font-bold text-white mb-3">Лучшее предложение</h2>
              <div className="relative rounded-3xl overflow-hidden neon-border p-5 bg-gradient-to-br from-emerald-500/10 to-transparent">
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-400 text-black text-xs font-bold">
                  Популярный
                </div>
                <div className="font-display text-5xl font-black neon-text mb-1">15%</div>
                <div className="text-white font-semibold text-lg mb-1">Вклад «Максимум»</div>
                <div className="text-muted-foreground text-sm mb-4">от 500 USDT · 12–24 месяца · Капитализация</div>
                <button
                  onClick={() => { setSelectedDeposit(1); setPage("deposits"); }}
                  className="w-full py-3 rounded-2xl bg-emerald-400 text-black font-bold text-sm active:scale-95"
                >
                  Подробнее
                </button>
              </div>
            </section>

            {/* How it works */}
            <section className="px-4 pb-8">
              <h2 className="text-lg font-bold text-white mb-4">Как это работает</h2>
              <div className="space-y-3">
                {[
                  { step: "01", title: "Выберите вклад", desc: "Подберите условия под ваши цели и сумму", icon: "MousePointerClick" },
                  { step: "02", title: "Переведите USDT", desc: "TRC-20 или ERC-20 — на ваш выбор", icon: "ArrowUpRight" },
                  { step: "03", title: "Получайте доход", desc: "Проценты начисляются в USDT автоматически", icon: "Coins" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 glass-card rounded-2xl p-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                      <Icon name={item.icon} size={18} className="text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{item.title}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{item.desc}</div>
                    </div>
                    <div className="font-display font-black text-2xl text-white/10">{item.step}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* DEPOSITS */}
        {page === "deposits" && (
          <div className="px-4 pt-8 animate-fade-in">
            <h1 className="font-display text-3xl font-black text-white mb-1">Вклады</h1>
            <p className="text-muted-foreground text-sm mb-6">Выберите подходящий вариант</p>

            <div className="space-y-3 mb-8">
              {deposits.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDeposit(d.id)}
                  className={`relative rounded-3xl p-5 cursor-pointer transition-all bg-gradient-to-br ${d.color} ${
                    selectedDeposit === d.id ? "scale-[1.01]" : "opacity-80 active:scale-[0.99]"
                  }`}
                  style={{ border: selectedDeposit === d.id ? `1px solid ${d.accent}50` : "1px solid rgba(255,255,255,0.06)" }}
                >
                  {d.badge && (
                    <div
                      className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-black"
                      style={{ backgroundColor: d.accent }}
                    >
                      {d.badge}
                    </div>
                  )}
                  <div className="flex items-end gap-3 mb-3">
                    <div className="font-display font-black text-4xl text-white">{d.rate}%</div>
                    <div className="text-muted-foreground text-sm pb-1">годовых</div>
                  </div>
                  <div className="font-semibold text-white text-lg mb-1">{d.name}</div>
                  <div className="text-muted-foreground text-xs mb-4">
                    от {d.minAmount.toLocaleString("ru")} USDT · {d.term}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {d.features.map((f, fi) => (
                      <span
                        key={fi}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${d.accent}18`, color: d.accent }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculator */}
            <div className="glass-card rounded-3xl p-5 mb-8 neon-border">
              <h2 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                <Icon name="Calculator" size={18} className="text-emerald-400" />
                Калькулятор доходности
              </h2>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Сумма вклада</span>
                  <span className="font-semibold text-white">{calcAmount.toLocaleString("ru")} USDT</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={50000}
                  step={100}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(+e.target.value)}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>100 USDT</span>
                  <span>50 000 USDT</span>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Срок</span>
                  <span className="font-semibold text-white">{calcMonths} мес.</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={36}
                  step={3}
                  value={calcMonths}
                  onChange={(e) => setCalcMonths(+e.target.value)}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3 мес.</span>
                  <span>36 мес.</span>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Доход</span>
                  <span className="font-display font-black text-xl neon-text">+{income.toLocaleString("ru")} USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Итого</span>
                  <span className="font-bold text-white text-lg">{total.toLocaleString("ru")} USDT</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  По вкладу «{deposits[selectedDeposit].name}» · {deposits[selectedDeposit].rate}% годовых
                </div>
              </div>
            </div>

            <button
              onClick={() => setPage("support")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-base mb-4 active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(0,229,160,0.4)]"
            >
              Открыть выбранный вклад
            </button>
          </div>
        )}

        {/* SUPPORT */}
        {page === "support" && (
          <div className="px-4 pt-8 animate-fade-in">
            <h1 className="font-display text-3xl font-black text-white mb-1">Поддержка</h1>
            <p className="text-muted-foreground text-sm mb-6">Мы на связи 24/7</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: "Phone", label: "Позвонить", sub: "8 800 555-00-00", color: "from-blue-500/15 to-blue-600/5", accent: "#3b82f6" },
                { icon: "MessageSquare", label: "Чат", sub: "Онлайн прямо сейчас", color: "from-emerald-500/15 to-emerald-600/5", accent: "#00e5a0" },
                { icon: "MapPin", label: "Офисы", sub: "137 отделений", color: "from-orange-500/15 to-orange-600/5", accent: "#f97316" },
                { icon: "Clock", label: "Режим работы", sub: "Пн–Вс, 9:00–21:00", color: "from-purple-500/15 to-purple-600/5", accent: "#a855f7" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-4 bg-gradient-to-br ${item.color} border border-white/5 cursor-pointer active:scale-95 transition-all`}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.accent}20` }}>
                    <Icon name={item.icon} size={18} style={{ color: item.accent }} />
                  </div>
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>

            <h2 className="font-bold text-white text-base mb-3">Частые вопросы</h2>
            <div className="space-y-2 mb-8">
              {faqItems.map((item, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-4 text-left"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  >
                    <span className="font-medium text-white text-sm pr-3">{item.q}</span>
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`text-muted-foreground shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {faqOpen === i && (
                    <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h2 className="font-bold text-white text-base mb-3">Написать нам</h2>
            {formSent ? (
              <div className="glass-card rounded-3xl p-8 text-center neon-border mb-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={28} className="text-emerald-400" />
                </div>
                <div className="font-bold text-white text-lg mb-2">Заявка отправлена!</div>
                <div className="text-muted-foreground text-sm">Мы свяжемся с вами в течение 15 минут</div>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-5 mb-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      value={supportForm.name}
                      onChange={(e) => setSupportForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Телефон</label>
                    <input
                      type="tel"
                      value={supportForm.phone}
                      onChange={(e) => setSupportForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+7 (999) 999-99-99"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                    <textarea
                      value={supportForm.message}
                      onChange={(e) => setSupportForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Расскажите, как мы можем помочь..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setFormSent(true)}
                  className="w-full py-3.5 mt-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-sm active:scale-95 transition-all"
                >
                  Отправить сообщение
                </button>
              </div>
            )}
          </div>
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