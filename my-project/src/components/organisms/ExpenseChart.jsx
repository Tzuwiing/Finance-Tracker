import { useState } from "react";
import Card from "../atoms/Card";
import EmptyState from "../atoms/EmptyState";
import { PALETTE, iconOf } from "../../constants/categories";
import { byCategory } from "../../utils/stats";
import { useMoney } from "../../hooks/useMoney";

export default function ExpenseChart({ items, tipe = "pengeluaran", title = "Pengeluaran per Kategori" }) {
  const fmt = useMoney();
  const [hover, setHover] = useState(null);
  const rows = byCategory(items, tipe);
  const total = rows.reduce((a, [, v]) => a + v, 0);
  let offset = 25;
  const active = hover != null ? rows[hover] : null;

  return (
    <Card title={title} delay={100}>
      {!total ? (
        <EmptyState icon="🍩" text="Belum ada data untuk periode ini." />
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-44 h-44 animate-pop">
            <svg viewBox="0 0 36 36" className="w-full h-full" role="img" aria-label={title}>
              {rows.map(([k, v], i) => {
                const pct = (v / total) * 100;
                const el = (
                  <circle key={k} cx="18" cy="18" r="15.9155" fill="none" stroke={PALETTE[i % PALETTE.length]}
                    strokeWidth={hover === i ? 5 : 4} strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={offset}
                    className="transition-all duration-300 cursor-pointer" opacity={hover == null || hover === i ? 1 : 0.35}
                    onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
                );
                offset -= pct;
                return el;
              })}
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
              <div>
                <p className="text-xs text-slate-500">{active ? active[0] : "Total"}</p>
                <p className="text-sm font-bold tabular-nums">{fmt(active ? active[1] : total)}</p>
              </div>
            </div>
          </div>
          <ul className="space-y-1.5 text-sm w-full">
            {rows.map(([k, v], i) => (
              <li key={k} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-1 hover:bg-slate-500/10 transition">
                <span className="flex items-center gap-2 min-w-0">
                  <i className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                  <span className="truncate">{iconOf(k)} {k}</span>
                </span>
                <span className="tabular-nums text-slate-500 text-right">{fmt(v)} · {Math.round((v / total) * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
