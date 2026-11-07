import { useState } from "react";
import Field from "../atoms/Field";
import MoneyInput from "../atoms/MoneyInput";
import Button from "../atoms/Button";

const ICONS = ["🎯", "🛟", "✈️", "🏠", "🚗", "💍", "🎓", "💻", "📱", "🎁"];

export default function GoalForm({ onSubmit, onCancel }) {
  const [f, setF] = useState({ nama: "", icon: "🎯", target: "", deadline: "" });
  const [err, setErr] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.nama.trim()) er.nama = "Nama tujuan wajib diisi";
    if (!(Number(f.target) > 0)) er.target = "Target harus lebih dari 0";
    setErr(er);
    if (!Object.keys(er).length) onSubmit({ ...f, nama: f.nama.trim(), target: Number(f.target) });
  };
  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <div className="flex flex-wrap gap-2">
        {ICONS.map((i) => (
          <button type="button" key={i} onClick={() => setF({ ...f, icon: i })} aria-label={`Ikon ${i}`}
            className={`w-10 h-10 rounded-xl text-xl transition ${f.icon === i ? "bg-indigo-600/20 ring-2 ring-indigo-500 scale-110" : "bg-slate-500/10 hover:bg-slate-500/20"}`}>{i}</button>
        ))}
      </div>
      <Field label="Nama tujuan" value={f.nama} onChange={(e) => setF({ ...f, nama: e.target.value })} error={err.nama} placeholder="Contoh: Dana darurat" maxLength={60} autoFocus />
      <MoneyInput label="Target (Rp)" value={f.target} onChange={(v) => setF({ ...f, target: v })} error={err.target} />
      <Field label="Tenggat (opsional)" type="date" value={f.deadline} onChange={(e) => setF({ ...f, deadline: e.target.value })} />
      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1" onClick={onCancel}>Batal</Button>
        <Button type="submit" className="flex-1">Buat Tujuan</Button>
      </div>
    </form>
  );
}
