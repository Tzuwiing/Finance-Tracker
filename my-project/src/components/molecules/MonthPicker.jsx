import { geserBulan, hariIni, namaBulan } from "../../utils/format";

export default function MonthPicker({ value, onChange }) {
  const now = hariIni().slice(0, 7);
  const all = value === "all";
  const btn = "w-8 h-8 rounded-lg grid place-items-center hover:bg-slate-500/10 disabled:opacity-30 disabled:pointer-events-none transition";
  return (
    <div className="flex items-center gap-1 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-500/15 p-1 text-sm">
      <button className={btn} disabled={all} onClick={() => onChange(geserBulan(value, -1))} aria-label="Bulan sebelumnya">‹</button>
      <span className="min-w-[110px] text-center font-medium capitalize">{all ? "Semua waktu" : namaBulan(value)}</span>
      <button className={btn} disabled={all || value >= now} onClick={() => onChange(geserBulan(value, 1))} aria-label="Bulan berikutnya">›</button>
      <button className="px-2 h-8 rounded-lg text-xs hover:bg-slate-500/10 transition" onClick={() => onChange(all ? now : "all")}>
        {all ? "Per bulan" : "Semua"}
      </button>
    </div>
  );
}
