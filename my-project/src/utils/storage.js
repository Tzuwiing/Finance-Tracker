import { hariIni, uid } from "./format";
import { WALLETS } from "../constants/wallets";

const KEY = "finance-tracker-v2";
const LEGACY = "transaksi";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const lsGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
export const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage penuh / diblokir */ } };

export const emptyState = () => ({ transaksi: [], anggaran: {}, tujuan: [] });

export function normalizeTx(t) {
  if (!t || typeof t !== "object") return null;
  const jumlah = Number(t.jumlah);
  if (!Number.isFinite(jumlah) || jumlah <= 0) return null;
  if (t.tipe !== "pemasukan" && t.tipe !== "pengeluaran") return null;
  return {
    id: t.id != null ? String(t.id) : uid(),
    deskripsi: String(t.deskripsi ?? "").trim().slice(0, 120) || "Tanpa deskripsi",
    jumlah,
    tipe: t.tipe,
    kategori: String(t.kategori || "Lainnya"),
    tanggal: DATE_RE.test(t.tanggal) ? t.tanggal : hariIni(),
    dompet: WALLETS.some((w) => w.id === t.dompet) ? t.dompet : "tunai",
  };
}

export function normalizeGoal(g) {
  if (!g || typeof g !== "object") return null;
  const target = Number(g.target);
  if (!Number.isFinite(target) || target <= 0) return null;
  return {
    id: g.id != null ? String(g.id) : uid(),
    nama: String(g.nama || "Tujuan").slice(0, 60),
    icon: g.icon || "🎯",
    target,
    terkumpul: Math.max(0, Number(g.terkumpul) || 0),
    deadline: DATE_RE.test(g.deadline) ? g.deadline : "",
  };
}

export function sanitizeState(raw) {
  const isArr = Array.isArray(raw);
  if (!raw || typeof raw !== "object" || (!isArr && !("transaksi" in raw || "anggaran" in raw || "tujuan" in raw))) {
    throw new Error("Format file tidak dikenali");
  }
  const src = isArr ? { transaksi: raw } : raw;
  const anggaran = {};
  const rawAng = src.anggaran && typeof src.anggaran === "object" ? src.anggaran : {};
  Object.entries(rawAng).forEach(([k, v]) => {
    const n = Number(v);
    if (Number.isFinite(n) && n > 0) anggaran[k] = n;
  });
  return {
    transaksi: (Array.isArray(src.transaksi) ? src.transaksi : []).map(normalizeTx).filter(Boolean),
    anggaran,
    tujuan: (Array.isArray(src.tujuan) ? src.tujuan : []).map(normalizeGoal).filter(Boolean),
  };
}

export function loadState() {
  try {
    const v2 = lsGet(KEY);
    if (v2) return sanitizeState(JSON.parse(v2));
    const old = lsGet(LEGACY); // migrasi dari versi lama
    if (old) return sanitizeState(JSON.parse(old));
  } catch (e) {
    console.error("Gagal memuat data:", e);
  }
  return emptyState();
}

export const saveState = (s) => lsSet(KEY, JSON.stringify(s));
