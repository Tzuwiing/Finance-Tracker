import { useCountUp } from "../../hooks/useCountUp";
import { useMoney } from "../../hooks/useMoney";

const tone = {
  green: "from-emerald-500 to-teal-500 shadow-emerald-500/30",
  red: "from-rose-500 to-orange-500 shadow-rose-500/30",
  blue: "from-indigo-500 to-violet-500 shadow-indigo-500/30",
  amber: "from-amber-500 to-yellow-500 shadow-amber-500/30",
};

export default function StatCard({ label, value, icon, color, delay = 0, hint }) {
  const fmt = useMoney();
  const shown = useCountUp(value);
  return (
    <div style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up relative overflow-hidden rounded-2xl p-4 sm:p-5 text-white bg-gradient-to-br ${tone[color]} shadow-xl hover:-translate-y-1 transition`}>
      <span className="absolute -right-3 -top-3 text-5xl sm:text-6xl opacity-20 select-none">{icon}</span>
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-lg sm:text-2xl font-bold mt-1 tabular-nums break-words">{fmt(shown)}</p>
      {hint && <p className="text-xs opacity-80 mt-1">{hint}</p>}
    </div>
  );
}
