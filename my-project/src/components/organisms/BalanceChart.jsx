import Card from "../atoms/Card";
import { balanceSeries } from "../../utils/stats";
import { rupiahRingkas } from "../../utils/format";
import { useUi } from "../../hooks/useUi";

const X0 = 40, W = 312, TOP = 12, H = 118;

export default function BalanceChart({ all, endKey }) {
  const { privacy } = useUi();
  const data = balanceSeries(all, endKey, 6);
  const vals = data.map((d) => d.saldo);
  const min = Math.min(0, ...vals);
  let max = Math.max(0, ...vals);
  if (max === min) max = min + 1;
  const x = (i) => X0 + (i * W) / (data.length - 1);
  const y = (v) => TOP + H - ((v - min) / (max - min)) * H;
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.saldo).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <Card title="Pertumbuhan Saldo" delay={100}>
      <svg viewBox="0 0 360 160" className="w-full" role="img" aria-label="Grafik pertumbuhan saldo kumulatif">
        <defs>
          <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity=".35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={X0} x2={X0 + W} y1={y(0)} y2={y(0)} stroke="currentColor" strokeDasharray="3 3" className="text-slate-500" opacity=".35" />
        {!privacy && <text x={X0 - 5} y={y(max) + 3} textAnchor="end" fontSize="8" className="fill-slate-400">{rupiahRingkas(max)}</text>}
        {!privacy && min < 0 && <text x={X0 - 5} y={y(min) + 3} textAnchor="end" fontSize="8" className="fill-slate-400">{rupiahRingkas(min)}</text>}
        <path d={area} fill="url(#balGrad)" className="animate-fade-in" />
        <path d={line} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="animate-draw" />
        {data.map((d, i) => (
          <g key={d.key}>
            <circle cx={x(i)} cy={y(d.saldo)} r="3.5" fill="#6366f1" className="animate-pop" style={{ animationDelay: `${600 + i * 80}ms` }}>
              {!privacy && <title>{`${d.label}: ${rupiahRingkas(d.saldo)}`}</title>}
            </circle>
            <text x={x(i)} y={154} textAnchor="middle" fontSize="9" className="fill-slate-500 capitalize">{d.label}</text>
          </g>
        ))}
      </svg>
    </Card>
  );
}
