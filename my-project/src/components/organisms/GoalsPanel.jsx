import { useState } from "react";
import Card from "../atoms/Card";
import Modal from "../atoms/Modal";
import Button from "../atoms/Button";
import EmptyState from "../atoms/EmptyState";
import MoneyInput from "../atoms/MoneyInput";
import SegmentedControl from "../atoms/SegmentedControl";
import GoalCard from "../molecules/GoalCard";
import ConfirmModal from "../molecules/ConfirmModal";
import GoalForm from "./GoalForm";
import { useFinance } from "../../hooks/useFinance";
import { useMoney } from "../../hooks/useMoney";
import { useUi } from "../../hooks/useUi";

const MODE = [
  { value: "setor", label: "Setor", active: "bg-emerald-500" },
  { value: "tarik", label: "Tarik", active: "bg-rose-500" },
];

function ContributeForm({ goal, onSubmit, onCancel }) {
  const [mode, setMode] = useState("setor");
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const go = (e) => {
    e.preventDefault();
    const n = Number(val);
    if (!(n > 0)) return setErr("Masukkan jumlah lebih dari 0");
    onSubmit(mode === "setor" ? n : -n);
  };
  return (
    <form onSubmit={go} className="space-y-3" noValidate>
      <p className="text-sm text-slate-500">{goal.icon} {goal.nama}</p>
      <SegmentedControl options={MODE} value={mode} onChange={setMode} />
      <MoneyInput label="Jumlah (Rp)" value={val} onChange={setVal} error={err} autoFocus />
      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1" onClick={onCancel}>Batal</Button>
        <Button type="submit" className="flex-1">Simpan</Button>
      </div>
    </form>
  );
}

export default function GoalsPanel() {
  const { state, addGoal, contribute, removeGoal } = useFinance();
  const { toast } = useUi();
  const fmt = useMoney();
  const [dlg, setDlg] = useState(null);
  const close = () => setDlg(null);
  const goals = state.tujuan;
  const target = goals.reduce((a, g) => a + g.target, 0);
  const saved = goals.reduce((a, g) => a + g.terkumpul, 0);

  return (
    <div className="space-y-6">
      <Card title="Tabungan & Tujuan" action={<Button size="sm" onClick={() => setDlg({ type: "new" })}>＋ Tujuan Baru</Button>}>
        {goals.length === 0 ? (
          <EmptyState icon="🐷" text="Belum ada tujuan. Mulai menabung untuk impianmu!" />
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-4">Terkumpul <b className="text-slate-800 dark:text-slate-100">{fmt(saved)}</b> dari {fmt(target)}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {goals.map((g) => (
                <GoalCard key={g.id} goal={g} onAdd={() => setDlg({ type: "add", goal: g })} onDelete={() => setDlg({ type: "del", goal: g })} />
              ))}
            </div>
          </>
        )}
        <p className="text-xs text-slate-400 mt-4">ℹ️ Setoran tabungan dicatat terpisah dan tidak mengubah saldo dompet.</p>
      </Card>
      {dlg?.type === "new" && (
        <Modal title="Tujuan Baru" onClose={close}>
          <GoalForm onCancel={close} onSubmit={(g) => { addGoal(g); toast("Tujuan dibuat 🎯"); close(); }} />
        </Modal>
      )}
      {dlg?.type === "add" && (
        <Modal title="Setor / Tarik Tabungan" onClose={close}>
          <ContributeForm goal={dlg.goal} onCancel={close}
            onSubmit={(n) => { contribute(dlg.goal.id, n); toast(n > 0 ? "Setoran tercatat 💰" : "Penarikan tercatat"); close(); }} />
        </Modal>
      )}
      {dlg?.type === "del" && (
        <ConfirmModal danger title="Hapus tujuan?" text={`Tujuan "${dlg.goal.nama}" akan dihapus permanen.`} confirmLabel="Hapus"
          onCancel={close} onConfirm={() => { removeGoal(dlg.goal.id); toast("Tujuan dihapus"); close(); }} />
      )}
    </div>
  );
}
