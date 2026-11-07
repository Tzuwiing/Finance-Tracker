import Card from "../atoms/Card";
import { monthlySeries } from "../../utils/stats";
import { namaBulan } from "../../utils/format";
import { useMoney } from "../../hooks/useMoney";

export default function MonthlyTable({ all, endKey }) {
  const fmt = useMoney();
  const rows = monthlySeries(all, endKey, 6).reverse();
  return (
    <Card title="Ringkasan Bulanan" delay={200}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="text-xs text-slate-500 text-right">
            <tr><th className="text-left pb-2 font-medium">Bulan</th><th className="pb-2 font-medium">Pemasukan</th><th className="pb-2 font-medium">Pengeluaran</th><th className="pb-2 font-medium">Selisih</th><th className="pb-2 font-medium">Rasio Tabung</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-slate-500/15 text-right tabular-nums">
                <td className="py-2 text-left capitalize">{namaBulan(r.key)}</td>
                <td className="text-emerald-500">{fmt(r.masuk)}</td>
                <td className="text-rose-500">{fmt(r.keluar)}</td>
                <td className={r.saldo < 0 ? "text-rose-500" : ""}>{fmt(r.saldo)}</td>
                <td>{r.masuk > 0 ? `${Math.round((r.saldo / r.masuk) * 100)}%` : "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
