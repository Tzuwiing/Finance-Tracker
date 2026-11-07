import StatCard from "../molecules/StatCard";
import { usePeriodData } from "../../hooks/usePeriodData";

export default function SummaryCards() {
  const { totals: t, allTotals, items } = usePeriodData();
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      <StatCard label="Pemasukan" icon="📈" value={t.masuk} color="green" hint={`${items.filter((i) => i.tipe === "pemasukan").length} transaksi`} />
      <StatCard label="Pengeluaran" icon="📉" value={t.keluar} color="red" delay={80} hint={`${items.filter((i) => i.tipe === "pengeluaran").length} transaksi`} />
      <StatCard label="Selisih Periode" icon="⚖️" value={t.saldo} color="amber" delay={160} hint={t.saldo >= 0 ? "Surplus 👍" : "Defisit ⚠️"} />
      <StatCard label="Total Saldo" icon="💰" value={allTotals.saldo} color="blue" delay={240} hint="Seluruh waktu" />
    </div>
  );
}
