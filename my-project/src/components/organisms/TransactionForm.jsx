import { useState } from "react";
import Field from "../atoms/Field";
import MoneyInput from "../atoms/MoneyInput";
import Button from "../atoms/Button";
import SegmentedControl from "../atoms/SegmentedControl";
import { catNames } from "../../constants/categories";
import { WALLETS } from "../../constants/wallets";
import { hariIni } from "../../utils/format";

const empty = () => ({ deskripsi: "", jumlah: "", tipe: "pengeluaran", kategori: "Makanan", tanggal: hariIni(), dompet: "tunai" });
const TIPE = [
  { value: "pengeluaran", label: "Pengeluaran", active: "bg-rose-500" },
  { value: "pemasukan", label: "Pemasukan", active: "bg-emerald-500" },
];

export default function TransactionForm({ initial, onSubmit, onCancel }) {
  const [f, setF] = useState(() => (initial ? { ...initial, jumlah: String(initial.jumlah) } : empty()));
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const setTipe = (tipe) => setF((p) => ({ ...p, tipe, kategori: catNames(tipe)[0] }));
  const names = catNames(f.tipe);
  const kategoriList = names.includes(f.kategori) ? names : [...names, f.kategori];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.deskripsi.trim()) er.deskripsi = "Deskripsi wajib diisi";
    if (!(Number(f.jumlah) > 0)) er.jumlah = "Jumlah harus lebih dari 0";
    if (!f.tanggal) er.tanggal = "Tanggal wajib diisi";
    setErr(er);
    if (Object.keys(er).length) return;
    onSubmit({ ...f, deskripsi: f.deskripsi.trim(), jumlah: Number(f.jumlah) });
  };

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <SegmentedControl options={TIPE} value={f.tipe} onChange={setTipe} />
      <Field label="Deskripsi" value={f.deskripsi} onChange={set("deskripsi")} error={err.deskripsi} placeholder="Contoh: Makan siang" maxLength={120} autoFocus />
      <MoneyInput label="Jumlah (Rp)" value={f.jumlah} onChange={(v) => setF((p) => ({ ...p, jumlah: v }))} error={err.jumlah} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Kategori" as="select" value={f.kategori} onChange={set("kategori")}>
          {kategoriList.map((c) => <option key={c}>{c}</option>)}
        </Field>
        <Field label="Dompet" as="select" value={f.dompet} onChange={set("dompet")}>
          {WALLETS.map((w) => <option key={w.id} value={w.id}>{w.icon} {w.name}</option>)}
        </Field>
      </div>
      <Field label="Tanggal" type="date" value={f.tanggal} onChange={set("tanggal")} error={err.tanggal} />
      <div className="flex gap-2 pt-2">
        {onCancel && <Button variant="outline" className="flex-1" onClick={onCancel}>Batal</Button>}
        <Button type="submit" className="flex-1">{initial ? "Simpan Perubahan" : "Simpan"}</Button>
      </div>
    </form>
  );
}
