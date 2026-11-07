const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const pad = (n) => String(n).padStart(2, "0");

export const rupiah = (n) => idr.format(Math.round(Number(n) || 0));

export const rupiahRingkas = (n) => {
  const a = Math.abs(n), s = n < 0 ? "-" : "";
  if (a >= 1e9) return `${s}${(a / 1e9).toFixed(1).replace(".0", "")} M`;
  if (a >= 1e6) return `${s}${(a / 1e6).toFixed(1).replace(".0", "")} jt`;
  if (a >= 1e3) return `${s}${Math.round(a / 1e3)} rb`;
  return `${s}${Math.round(a)}`;
};

export const hariIni = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const tanggal = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export const namaBulan = (key) =>
  new Date(`${key}-01T00:00:00`).toLocaleDateString("id-ID", { month: "long", year: "numeric" });

export const bulanSingkat = (key) =>
  new Date(`${key}-01T00:00:00`).toLocaleDateString("id-ID", { month: "short" });

export const geserBulan = (key, delta) => {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

export const hariDalamBulan = (key) => {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m, 0).getDate();
};

export const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
export const angka = (n) => new Intl.NumberFormat("id-ID").format(Number(n) || 0);
