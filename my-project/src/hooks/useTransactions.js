import { useState, useEffect, useCallback } from "react";
import { hariIni } from "../utils/format";

const KEY = "transaksi";
const load = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    // migrasi data lama: tambahkan kategori & tanggal bila belum ada
    return Array.isArray(data) ? data.map((t) => ({ kategori: "Lainnya", tanggal: hariIni(), ...t })) : [];
  } catch {
    return [];
  }
};

export function useTransactions() {
  const [items, setItems] = useState(load);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(items)), [items]);
  const add = useCallback((t) => setItems((p) => [{ id: crypto.randomUUID(), ...t }, ...p]), []);
  const remove = useCallback((id) => setItems((p) => p.filter((t) => t.id !== id)), []);
  return { items, add, remove };
}
