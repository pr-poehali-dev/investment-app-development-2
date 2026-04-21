import Icon from "@/components/ui/icon";

interface HomePageProps {
  onGoDeposits: () => void;
  onGoDepositSelected: (id: number) => void;
}

export default function HomePage({ onGoDeposits, onGoDepositSelected }: HomePageProps) {
  return (
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
              onClick={onGoDeposits}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-sm transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(0,229,160,0.4)]"
            >
              Открыть вклад
            </button>
            <button
              onClick={onGoDeposits}
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
            onClick={() => onGoDepositSelected(1)}
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
  );
}
