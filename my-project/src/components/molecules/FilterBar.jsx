import Button from "../atoms/Button";
import { ALL_CATEGORY_NAMES } from "../../constants/categories";
import { WALLETS } from "../../constants/wallets";

export default function FilterBar({ filter, setFilter, onExport }) {
  const set = (k) => (e) => setFilter({ ...filter, [k]: e.target.value });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-4">
      <input className="input col-span-2 sm:col-span-3" placeholder="🔍 Cari transaksi..." value={filter.q} onChange={set("q")} aria-label="Cari" />
      <select className="input" value={filter.tipe} onChange={set("tipe")} aria-label="Tipe">
        <option value="">Semua tipe</option>
        <option value="pemasukan">Pemasukan</option>
        <option value="pengeluaran">Pengeluaran</option>
      </select>
      <select className="input" value={filter.kategori} onChange={set("kategori")} aria-label="Kategori">
        <option value="">Semua kategori</option>
        {ALL_CATEGORY_NAMES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className="input" value={filter.dompet} onChange={set("dompet")} aria-label="Dompet">
        <option value="">Semua dompet</option>
        {WALLETS.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
      </select>
      <select className="input" value={filter.sort} onChange={set("sort")} aria-label="Urutkan">
        <option value="terbaru">Terbaru</option>
        <option value="terlama">Terlama</option>
        <option value="terbesar">Terbesar</option>
        <option value="terkecil">Terkecil</option>
      </select>
      <Button variant="outline" onClick={onExport}>⬇ CSV</Button>
    </div>
  );
}
