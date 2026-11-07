import Card from "../atoms/Card";
import Button from "../atoms/Button";
import EmptyState from "../atoms/EmptyState";
import TransactionItem from "../molecules/TransactionItem";
import { usePeriodData } from "../../hooks/usePeriodData";
import { useTxActions } from "../../hooks/useTxActions";
import { useUi } from "../../hooks/useUi";
import { applyFilter } from "../../utils/stats";

export default function RecentTransactions() {
  const { items } = usePeriodData();
  const { setPage, openTx } = useUi();
  const act = useTxActions();
  const latest = applyFilter(items, { q: "", sort: "terbaru" }).slice(0, 6);
  return (
    <Card title="Transaksi Terbaru" delay={150} action={<Button variant="ghost" size="sm" onClick={() => setPage("transaksi")}>Lihat semua →</Button>}>
      {latest.length === 0 ? (
        <EmptyState text="Belum ada transaksi di periode ini.">
          <Button size="sm" onClick={() => openTx()}>＋ Tambah transaksi</Button>
        </EmptyState>
      ) : (
        <ul>{latest.map((t) => <TransactionItem key={t.id} item={t} onEdit={act.edit} onDelete={act.remove} />)}</ul>
      )}
    </Card>
  );
}
