import { geserBulan, hariDalamBulan, hariIni, uid } from "./format";

export function buatDataContoh() {
  const now = hariIni(), cur = now.slice(0, 7), today = Number(now.slice(8));
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const transaksi = [];
  const push = (key, day, deskripsi, jumlah, tipe, kategori, dompet) => {
    const d = Math.min(day, key === cur ? today : hariDalamBulan(key));
    transaksi.push({ id: uid(), deskripsi, jumlah: Math.round(jumlah), tipe, kategori, dompet, tanggal: `${key}-${String(d).padStart(2, "0")}` });
  };
  [0, -1, -2, -3].forEach((off) => {
    const k = geserBulan(cur, off);
    push(k, 1, "Gaji bulanan", 8500000, "pemasukan", "Gaji", "bank");
    push(k, 12, "Proyek freelance", 1000000 + rnd() * 1000000, "pemasukan", "Bisnis", "tunai");
    push(k, 10, "Reimburse kantor", 1200000, "pemasukan", "Bonus", "ewallet");
    push(k, 3, "Sewa kost", 1800000, "pengeluaran", "Tagihan", "bank");
    push(k, 5, "Listrik & internet", 450000, "pengeluaran", "Tagihan", "ewallet");
    for (let i = 0; i < 8; i++)
      push(k, 2 + i * 3, ["Makan siang", "Kopi & snack", "Makan malam", "Belanja dapur"][i % 4], 25000 + rnd() * 70000, "pengeluaran", "Makanan", i % 2 ? "ewallet" : "tunai");
    for (let i = 0; i < 4; i++) push(k, 4 + i * 7, "Ojek online / bensin", 20000 + rnd() * 50000, "pengeluaran", "Transportasi", "ewallet");
    push(k, 15, "Streaming & game", 150000 + rnd() * 100000, "pengeluaran", "Hiburan", "ewallet");
    push(k, 20, "Nonton bioskop", 100000, "pengeluaran", "Hiburan", "tunai");
    push(k, 18, "Belanja bulanan", 250000 + rnd() * 300000, "pengeluaran", "Belanja", "bank");
    push(k, 22, "Vitamin & obat", 80000 + rnd() * 70000, "pengeluaran", "Kesehatan", "tunai");
  });
  return {
    transaksi,
    anggaran: { Makanan: 1500000, Transportasi: 600000, Hiburan: 400000, Belanja: 700000, Tagihan: 2500000 },
    tujuan: [
      { id: uid(), nama: "Dana Darurat", icon: "🛟", target: 20000000, terkumpul: 6500000, deadline: "" },
      { id: uid(), nama: "Liburan Bali", icon: "✈️", target: 8000000, terkumpul: 3000000, deadline: `${geserBulan(cur, 6)}-28` },
    ],
  };
}
