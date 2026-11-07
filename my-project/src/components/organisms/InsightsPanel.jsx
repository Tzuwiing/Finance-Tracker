import { useMemo } from "react";
import Card from "../atoms/Card";
import InsightItem from "../molecules/InsightItem";
import { usePeriodData } from "../../hooks/usePeriodData";
import { useMoney } from "../../hooks/useMoney";
import { buildInsights, healthScore } from "../../utils/stats";

const ring = { good: "#10b981", warn: "#f59e0b", bad: "#f43f5e" };

export default function InsightsPanel() {
  const { all, period, totals: t } = usePeriodData();
  const fmt = useMoney();
  const health = healthScore(t.masuk, t.keluar);
  const insights = useMemo(() => buildInsights(all, period, fmt), [all, period, fmt]);

  return (
    <Card title="Kesehatan Finansial" delay={80}>
      {health ? (
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-24 h-24 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-slate-500/20" />
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke={ring[health.tone]} strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={`${health.score} ${100 - health.score}`} className="transition-all duration-1000" />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-xl font-extrabold">{health.score}</span>
          </div>
          <div>
            <p className="font-bold text-lg">{health.label}</p>
            <p className="text-xs text-slate-500">Dihitung dari rasio tabungan terhadap pemasukan.</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500 mb-3">Skor muncul setelah ada transaksi pada periode ini.</p>
      )}
      {insights.length > 0 && <ul className="space-y-2">{insights.map((i) => <InsightItem key={i.text} {...i} />)}</ul>}
    </Card>
  );
}
