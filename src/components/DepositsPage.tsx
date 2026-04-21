import Icon from "@/components/ui/icon";

interface Deposit {
  id: number;
  name: string;
  rate: number;
  minAmount: number;
  term: string;
  color: string;
  accent: string;
  features: string[];
  badge: string | null;
}

interface DepositsPageProps {
  deposits: Deposit[];
  selectedDeposit: number;
  calcAmount: number;
  calcMonths: number;
  income: number;
  total: number;
  onSelectDeposit: (id: number) => void;
  onCalcAmountChange: (v: number) => void;
  onCalcMonthsChange: (v: number) => void;
  onOpenDeposit: () => void;
}

export default function DepositsPage({
  deposits,
  selectedDeposit,
  calcAmount,
  calcMonths,
  income,
  total,
  onSelectDeposit,
  onCalcAmountChange,
  onCalcMonthsChange,
  onOpenDeposit,
}: DepositsPageProps) {
  return (
    <div className="px-4 pt-8 animate-fade-in">
      <h1 className="font-display text-3xl font-black text-white mb-1">Вклады</h1>
      <p className="text-muted-foreground text-sm mb-6">Выберите подходящий вариант</p>

      <div className="space-y-3 mb-8">
        {deposits.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelectDeposit(d.id)}
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
            onChange={(e) => onCalcAmountChange(+e.target.value)}
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
            onChange={(e) => onCalcMonthsChange(+e.target.value)}
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
        onClick={onOpenDeposit}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-base mb-4 active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(0,229,160,0.4)]"
      >
        Открыть выбранный вклад
      </button>
    </div>
  );
}
