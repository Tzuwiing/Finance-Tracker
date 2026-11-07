import { useReducer, useEffect, useMemo } from "react";
import { FinanceContext } from "./FinanceContext";
import { loadState, saveState, normalizeTx, normalizeGoal, sanitizeState, emptyState } from "../utils/storage";
import { uid } from "../utils/format";

function reducer(s, a) {
  switch (a.type) {
    case "add": return { ...s, transaksi: [a.tx, ...s.transaksi] };
    case "update": return { ...s, transaksi: s.transaksi.map((t) => (t.id === a.tx.id ? a.tx : t)) };
    case "remove": return { ...s, transaksi: s.transaksi.filter((t) => t.id !== a.id) };
    case "restore": return { ...s, transaksi: [a.tx, ...s.transaksi.filter((t) => t.id !== a.tx.id)] };
    case "budget": {
      const anggaran = { ...s.anggaran };
      if (a.amount > 0) anggaran[a.kategori] = a.amount; else delete anggaran[a.kategori];
      return { ...s, anggaran };
    }
    case "goalAdd": return { ...s, tujuan: [...s.tujuan, a.goal] };
    case "contribute": return { ...s, tujuan: s.tujuan.map((g) => (g.id === a.id ? { ...g, terkumpul: Math.max(0, g.terkumpul + a.amount) } : g)) };
    case "goalRemove": return { ...s, tujuan: s.tujuan.filter((g) => g.id !== a.id) };
    case "replace": return a.state;
    default: return s;
  }
}

export default function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  useEffect(() => { saveState(state); }, [state]);

  const actions = useMemo(() => ({
    add: (tx) => { const n = normalizeTx(tx); if (n) dispatch({ type: "add", tx: n }); return n; },
    update: (tx) => { const n = normalizeTx(tx); if (n) dispatch({ type: "update", tx: n }); },
    remove: (id) => dispatch({ type: "remove", id }),
    restore: (tx) => dispatch({ type: "restore", tx }),
    setBudget: (kategori, amount) => dispatch({ type: "budget", kategori, amount: Number(amount) || 0 }),
    addGoal: (g) => { const n = normalizeGoal({ ...g, id: uid(), terkumpul: 0 }); if (n) dispatch({ type: "goalAdd", goal: n }); },
    contribute: (id, amount) => dispatch({ type: "contribute", id, amount: Number(amount) || 0 }),
    removeGoal: (id) => dispatch({ type: "goalRemove", id }),
    replace: (raw) => dispatch({ type: "replace", state: sanitizeState(raw) }),
    reset: () => dispatch({ type: "replace", state: emptyState() }),
  }), []);

  const value = useMemo(() => ({ state, ...actions }), [state, actions]);
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}
