import { useMemo, useState } from "react";
import Card from "../atoms/Card";
import Modal from "../atoms/Modal";
import Button from "../atoms/Button";
import MoneyInput from "../atoms/MoneyInput";
import ProgressBar from "../atoms/ProgressBar";
import BudgetRow from "../molecules/BudgetRow";
import { useFinance } from "../../hooks/useFinance";
import { usePeriodData } from "../../hooks/usePeriodData";
import { useMoney } from "../../hooks/useMoney";
import { useUi } from "../../hooks/useUi";
import { catNames } from "../../constants/categories";
import { spentByCategory } from "../../utils/stats";
import { namaBulan } from "../../utils/format";

export default function BudgetPanel() {
  const { state, setBudget } = useFinance();
  const { all, monthKey } = usePeriodData();
  const { toast } = useUi();
  const fmt = useMoney();
  const [editing, setEditing] = useState(null);
  const [val, setVal] = useState("");
  const spent = useMemo(() => spentByCategory(all, monthKey), [all, monthKey]);
  const names = catNames("pengeluaran");
  const limits = state.anggaran;
  const totalLimit = names.reduce((a, n) => a + (limits[n] || 0), 0);
  const totalUsed = names.filter((n) => limits[n]).reduce((a, n) => a + (spent[n] || 0), 0);

  const open = (n) => { setEditing(n); setVal(String(limits[n] || "")); };
  const save = () => {
    setBudget(editing, val);
    toast(Number(val) > 0 ? `Anggaran ${editing} disimpan 🎯` : `Anggaran ${editing} dihapus`);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <Card title={`Ringkasan Anggaran · ${namaBulan(monthKey)}`}>
        {totalLimit > 0 ? (
          <div className="space-y-3">
            <ProgressBar value={totalUsed} max={totalLimit} />
            <div className="grid grid-cols-3 text-center text-sm">
              <div><p className="text-xs text-slate-500">Anggaran</p><p className="font-semibold">{fmt(totalLimit)}</p></div>
              <div><p className="text-xs text-slate-500">Terpakai</p><p className="font-semibold">{fmt(totalUsed)}</p></div>
              <div><p className="text-xs text-slate-500">Sisa</p><p className={`font-semibold ${totalLimit - totalUsed < 0 ? "text-rose-500" : "text-emerald-500"}`}>{fmt(totalLimit - totalUsed)}</p></div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Atur batas anggaran bulanan per kategori agar pengeluaranmu terkendali. 🎯</p>
        )}
      </Card>
      <Card title="Anggaran per Kategori" delay={100}>
        <ul>{names.map((n) => <BudgetRow key={n} nama={n} used={spent[n] || 0} limit={limits[n] || 0} onEdit={() => open(n)} />)}</ul>
      </Card>
      {editing && (
        <Modal title={`Anggaran ${editing}`} onClose={() => setEditing(null)}>
          <div className="space-y-4">
            <MoneyInput label="Batas per bulan (Rp)" value={val} onChange={setVal} hint="Kosongkan lalu simpan untuk menghapus anggaran." autoFocus />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditing(null)}>Batal</Button>
              <Button onClick={save}>Simpan</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
