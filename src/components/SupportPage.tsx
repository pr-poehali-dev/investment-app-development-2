import { useState } from "react";
import Icon from "@/components/ui/icon";

const faqItems = [
  { q: "Как пополнить вклад в USDT?", a: "Выберите вклад, получите адрес кошелька (TRC-20 или ERC-20) и переведите нужную сумму. Зачисление — в течение 10 минут." },
  { q: "Как выводить проценты?", a: "Проценты выводятся на любой USDT-кошелёк: TRC-20 (Tron) или ERC-20 (Ethereum) — по вашему выбору." },
  { q: "Безопасно ли хранить USDT у вас?", a: "Да. Средства хранятся в холодных кошельках с мультиподписью. Выплаты гарантированы смарт-контрактом." },
  { q: "Можно ли пополнять вклад?", a: "Вклады «Максимум» и «Премиум» поддерживают пополнение в любое время на протяжении всего срока." },
  { q: "Что будет при досрочном закрытии?", a: "При досрочном закрытии выплачивается тело вклада за вычетом 2% — начисленные проценты сгорают." },
];

interface SupportPageProps {
  supportForm: { name: string; phone: string; message: string };
  formSent: boolean;
  onFormChange: (field: string, value: string) => void;
  onFormSend: () => void;
}

export default function SupportPage({ supportForm, formSent, onFormChange, onFormSend }: SupportPageProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
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
                onChange={(e) => onFormChange("name", e.target.value)}
                placeholder="Иван Иванов"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Телефон</label>
              <input
                type="tel"
                value={supportForm.phone}
                onChange={(e) => onFormChange("phone", e.target.value)}
                placeholder="+7 (999) 999-99-99"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
              <textarea
                value={supportForm.message}
                onChange={(e) => onFormChange("message", e.target.value)}
                placeholder="Расскажите, как мы можем помочь..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
              />
            </div>
          </div>
          <button
            onClick={onFormSend}
            className="w-full py-3.5 mt-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-sm active:scale-95 transition-all"
          >
            Отправить сообщение
          </button>
        </div>
      )}
    </div>
  );
}
