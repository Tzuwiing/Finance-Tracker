import { iconOf } from "../constants/categories";
import { WALLETS } from "../constants/wallets";
import { bulanSingkat, clamp, geserBulan, hariDalamBulan, hariIni, namaBulan } from "./format";

export const inPeriod = (all, period) => (period === "all" ? all : all.filter((t) => t.tanggal.startsWith(period)));

export function totals(items) {
  let masuk = 0, keluar = 0;
  items.forEach((t) => (t.tipe === "pemasukan" ? (masuk += t.jumlah) : (keluar += t.jumlah)));
  return { masuk, keluar, saldo: masuk - keluar };
}

export function byCategory(items, tipe) {
  const m = {};
  items.filter((t) => t.tipe === tipe).forEach((t) => (m[t.kategori] = (m[t.kategori] || 0) + t.jumlah));
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

export function monthlySeries(all, endKey, n = 6) {
  return Array.from({ length: n }, (_, i) => {
    const key = geserBulan(endKey, -(n - 1 - i));
    return { key, label: bulanSingkat(key), ...totals(inPeriod(all, key)) };
  });
}

export function balanceSeries(all, endKey, n = 6) {
  return Array.from({ length: n }, (_, i) => {
    const key = geserBulan(endKey, -(n - 1 - i));
    return { key, label: bulanSingkat(key), saldo: totals(all.filter((t) => t.tanggal.slice(0, 7) <= key)).saldo };
  });
}

export function walletBalances(all) {
  return Object.fromEntries(WALLETS.map((w) => [w.id, totals(all.filter((t) => t.dompet === w.id)).saldo]));
}

export function spentByCategory(all, monthKey) {
  return Object.fromEntries(byCategory(inPeriod(all, monthKey), "pengeluaran"));
}

export function healthScore(masuk, keluar) {
  if (masuk <= 0) return keluar > 0 ? { score: 0, label: "Kritis", tone: "bad", rate: -1 } : null;
  const rate = (masuk - keluar) / masuk;
  const score = Math.round(clamp(50 + rate * 250, 0, 100));
  const [label, tone] = score >= 80 ? ["Sangat sehat", "good"] : score >= 60 ? ["Baik", "good"] : score >= 40 ? ["Waspada", "warn"] : ["Kritis", "bad"];
  return { score, label, tone, rate };
}

export function applyFilter(items, f) {
  const q = f.q.trim().toLowerCase();
  const sorters = {
    terbaru: (a, b) => b.tanggal.localeCompare(a.tanggal),
    terlama: (a, b) => a.tanggal.localeCompare(b.tanggal),
    terbesar: (a, b) => b.jumlah - a.jumlah,
    terkecil: (a, b) => a.jumlah - b.jumlah,
  };
  return items
    .filter((t) =>
      (!f.tipe || t.tipe === f.tipe) && (!f.kategori || t.kategori === f.kategori) && (!f.dompet || t.dompet === f.dompet) &&
      (!q || `${t.deskripsi} ${t.kategori}`.toLowerCase().includes(q)))
    .sort(sorters[f.sort] || sorters.terbaru);
}

export function buildInsights(all, period, fmt) {
  const items = inPeriod(all, period);
  const { masuk, keluar } = totals(items);
  const out = [];
  const cats = byCategory(items, "pengeluaran");
  if (cats.length) out.push({ icon: iconOf(cats[0][0]), text: `Pengeluaran terbesar: ${cats[0][0]} (${Math.round((cats[0][1] / keluar) * 100)}%)` });
  const big = items.filter((t) => t.tipe === "pengeluaran").sort((a, b) => b.jumlah - a.jumlah)[0];
  if (big) out.push({ icon: "💸", text: `Transaksi terbesar: ${big.deskripsi} (${fmt(big.jumlah)})` });
  if (period !== "all") {
    const prevKey = geserBulan(period, -1);
    const prev = totals(inPeriod(all, prevKey));
    if (prev.keluar > 0 && keluar > 0) {
      const d = Math.round(((keluar - prev.keluar) / prev.keluar) * 100);
      out.push({ icon: d > 0 ? "📈" : "📉", tone: d > 0 ? "bad" : "good", text: `Pengeluaran ${d > 0 ? "naik" : "turun"} ${Math.abs(d)}% dibanding ${namaBulan(prevKey)}` });
    }
    const dim = hariDalamBulan(period), now = hariIni();
    const isCur = period === now.slice(0, 7);
    const elapsed = isCur ? Number(now.slice(8)) : dim;
    if (keluar > 0) {
      const avg = keluar / elapsed;
      out.push({ icon: "🗓️", text: `Rata-rata pengeluaran harian ${fmt(avg)}` });
      if (isCur && elapsed < dim) out.push({ icon: "🔮", text: `Proyeksi pengeluaran bulan ini ${fmt(avg * dim)}` });
    }
  }
  if (masuk > 0) {
    const r = Math.round(((masuk - keluar) / masuk) * 100);
    out.push({ icon: r >= 20 ? "🌟" : "💡", tone: r >= 20 ? "good" : "warn", text: r >= 0 ? `Rasio tabungan ${r}% dari pemasukan${r < 20 ? " (target ideal 20%)" : ""}` : "Pengeluaran melebihi pemasukan periode ini" });
  }
  return out;
}
