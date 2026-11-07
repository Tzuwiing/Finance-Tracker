const tones = { good: "bg-emerald-500/10", bad: "bg-rose-500/10", warn: "bg-amber-500/10" };

export default function InsightItem({ icon, text, tone }) {
  return (
    <li className={`flex gap-3 items-start rounded-xl px-3 py-2 text-sm animate-slide-in ${tones[tone] || "bg-slate-500/10"}`}>
      <span>{icon}</span>
      <span>{text}</span>
    </li>
  );
}
