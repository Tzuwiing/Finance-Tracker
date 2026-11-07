import Card from "../atoms/Card";
import { monthlySeries } from "../../utils/stats";
import { rupiahRingkas } from "../../utils/format";
import { useUi } from "../../hooks/useUi";

const X0 = 40, W = 312, BASE = 140, H = 120;

export default function TrendChart({ all, endKey }) {
  const { privacy } = useUi();
  const data = monthlySeries(all, endKey, 6);
  const max = Math.max(1, ...data.flatMap((d) => [d.masuk, d.keluar]));
  const gw = W / data.length;
  const legend = (
    <div className="flex gap-3 text-xs text-slate-500">
      <span><i className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />Masuk</span>
      <span><i className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-1" />Keluar</span>
    </div>
  );
  return (
    <Card title="Arus Kas 6 Bulan" action={legend} delay={50}>
      <svg viewBox="0 0 360 165" className="w-full" role="img" aria-label="Grafik pemasukan dan pengeluaran 6 bulan terakhir">
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line x1={X0} x2={X0 + W} y1={BASE - t * H} y2={BASE - t * H} stroke="currentColor" className="text-slate-500" opacity=".15" />
            {!privacy && <text x={X0 - 5} y={BASE - t * H + 3} textAnchor="end" fontSize="8" className="fill-slate-400">{rupiahRingkas(max * t)}</text>}
          </g>
        ))}
        {data.map((d, i) => {
          const cx = X0 + gw * i + gw / 2;
          const hm = (d.masuk / max) * H, hk = (d.keluar / max) * H;
          return (
            <g key={d.key}>
              <rect x={cx - 17} y={BASE - hm} width="16" height={hm} rx="3" className="fill-emerald-500 animate-bar" style={{ animationDelay: `${i * 90}ms` }}>
                {!privacy && <title>{`${d.label}: masuk ${rupiahRingkas(d.masuk)}`}</title>}
              </rect>
              <rect x={cx + 1} y={BASE - hk} width="16" height={hk} rx="3" className="fill-rose-500 animate-bar" style={{ animationDelay: `${i * 90 + 45}ms` }}>
                {!privacy && <title>{`${d.label}: keluar ${rupiahRingkas(d.keluar)}`}</title>}
              </rect>
              <text x={cx} y={157} textAnchor="middle" fontSize="9" className="fill-slate-500 capitalize">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </Card>
  );
}
