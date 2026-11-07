import { useState, useMemo } from "react";
import Card from "../atoms/Card";
import EmptyState from "../atoms/EmptyState";
import Button from "../atoms/Button";
import TransactionItem from "../molecules/TransactionItem";
import FilterBar from "../molecules/FilterBar";
import { usePeriodData } from "../../hooks/usePeriodData";
import { useTxActions } from "../../hooks/useTxActions";
import { useMoney } from "../../hooks/useMoney";
import { useUi } from "../../hooks/useUi";
import { applyFilter, totals } from "../../utils/stats";
import { exportCsv } from "../../utils/exporters";

const PAGE = 15;
const INIT = { q: "", tipe: "", kategori: "", dompet: "", sort: "terbaru" };

export default function TransactionList() {
  const { items } = usePeriodData();
  const { openTx } = useUi();
  const act = useTxActions();
  const fmt = useMoney();
  const [filter, setFilter] = useState(INIT);
  const [limit, setLimit] = useState(PAGE);
  const shown = useMemo(() => applyFilter(items, filter), [items, filter]);
  const sum = totals(shown);
  const change = (f) => { setFilter(f); setLimit(PAGE); };

  return (
    <Card title="Riwayat Transaksi" action={<Button size="sm" onClick={() => openTx()}>＋ Baru</Button>}>
      <FilterBar filter={filter} setFilter={change} onExport={() => exportCsv(shown)} />
      {shown.length > 0 && (
        <p className="text-xs text-slate-500 mb-2">
          {shown.length} transaksi · <span className="text-emerald-500">+{fmt(sum.masuk)}</span> · <span className="text-rose-500">-{fmt(sum.keluar)}</span>
        </p>
      )}
      {shown.length === 0 ? (
        <EmptyState icon="🔎" text={items.length ? "Tidak ada transaksi yang cocok dengan filter." : "Belum ada transaksi pada periode ini."}>
          {!items.length && <Button size="sm" onClick={() => openTx()}>Tambah transaksi pertama</Button>}
        </EmptyState>
      ) : (
        <>
          <ul>{shown.slice(0, limit).map((t) => <TransactionItem key={t.id} item={t} onEdit={act.edit} onDelete={act.remove} />)}</ul>
          {shown.length > limit && <Button variant="outline" className="w-full mt-3" onClick={() => setLimit(limit + PAGE)}>Muat lebih banyak ({shown.length - limit})</Button>}
        </>
      )}
    </Card>
  );
}
