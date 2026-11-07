import ProgressBar from "../atoms/ProgressBar";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import { useMoney } from "../../hooks/useMoney";
import { hariIni, tanggal } from "../../utils/format";

function bulanTersisa(deadline) {
  const ms = new Date(`${deadline}T00:00:00`) - new Date(`${hariIni()}T00:00:00`);
  return Math.max(1, Math.ceil(ms / (30 * 86400000)));
}

export default function GoalCard({ goal, onAdd, onDelete }) {
  const fmt = useMoney();
  const done = goal.terkumpul >= goal.target;
  const sisa = Math.max(0, goal.target - goal.terkumpul);
  return (
    <div className="rounded-2xl p-4 bg-slate-500/5 border border-slate-500/15 animate-pop space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{goal.icon}</span>
          <div>
            <p className="font-semibold">{goal.nama}</p>
            {goal.deadline && <p className="text-xs text-slate-500">Target: {tanggal(goal.deadline)}</p>}
          </div>
        </div>
        {done ? <Badge tone="pemasukan">🎉 Tercapai</Badge> : <span className="text-sm font-semibold">{Math.round((goal.terkumpul / goal.target) * 100)}%</span>}
      </div>
      <ProgressBar value={goal.terkumpul} max={goal.target} auto={false} color={done ? "bg-emerald-500" : "bg-indigo-500"} />
      <div className="text-sm text-slate-500 flex justify-between">
        <span>{fmt(goal.terkumpul)} / {fmt(goal.target)}</span>
        {!done && goal.deadline && <span>≈ {fmt(sisa / bulanTersisa(goal.deadline))}/bln</span>}
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1" onClick={onAdd}>＋ Setor</Button>
        <Button size="sm" variant="soft" onClick={onDelete} aria-label="Hapus tujuan">🗑️</Button>
      </div>
    </div>
  );
}
