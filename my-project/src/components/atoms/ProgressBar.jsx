import { useEffect, useState } from "react";
import { clamp } from "../../utils/format";

export default function ProgressBar({ value, max, auto = true, color = "bg-indigo-500" }) {
  const pct = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  const tone = !auto ? color : pct >= 100 ? "bg-rose-500" : pct >= 80 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="h-2.5 rounded-full bg-slate-500/15 overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full transition-all duration-1000 ease-out ${tone}`} style={{ width: `${w}%` }} />
    </div>
  );
}
