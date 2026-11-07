const tones = {
  pemasukan: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  pengeluaran: "bg-rose-500/15 text-rose-500",
  warn: "bg-amber-500/15 text-amber-600",
  neutral: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
};

export default function Badge({ tone = "neutral", children }) {
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${tones[tone] || tones.neutral}`}>{children}</span>;
}
