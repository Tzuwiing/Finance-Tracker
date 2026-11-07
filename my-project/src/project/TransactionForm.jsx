import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [deskripsi, setDeskripsi] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tipe, setTipe] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deskripsi.trim() || !jumlah || jumlah <= 0 || !tipe) {
      alert("Lengkapi semua form dengan benar!");
      return;
    }

    const transaksiBaru = {
      id: Date.now(),
      deskripsi,
      jumlah: parseFloat(jumlah),
      tipe,
    };

    onAdd(transaksiBaru);
    setDeskripsi("");
    setJumlah("");
    setTipe("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Tambah Transaksi</h2>
      <input
        type="text"
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        placeholder="Jumlah"
        value={jumlah}
        onChange={(e) => setJumlah(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={tipe}
        onChange={(e) => setTipe(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Pilih Tipe</option>
        <option value="pemasukan">Pemasukan</option>
        <option value="pengeluaran">Pengeluaran</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Tambah Transaksi
      </button>
    </form>
  );
}

export default TransactionForm;
