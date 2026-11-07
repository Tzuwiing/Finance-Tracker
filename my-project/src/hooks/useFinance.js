import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance harus dipakai di dalam FinanceProvider");
  return ctx;
}
