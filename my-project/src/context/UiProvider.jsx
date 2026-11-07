import { useState, useEffect, useMemo, useCallback } from "react";
import { UiContext } from "./UiContext";
import { lsGet, lsSet } from "../utils/storage";
import { hariIni, uid } from "../utils/format";

export default function UiProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = lsGet("tema");
    if (saved) return saved === "dark";
    try { return !!window.matchMedia?.("(prefers-color-scheme: dark)").matches; } catch { return false; }
  });
  const [privacy, setPrivacy] = useState(() => lsGet("privasi") === "1");
  const [period, setPeriod] = useState(() => hariIni().slice(0, 7));
  const [page, setPage] = useState("dashboard");
  const [toasts, setToasts] = useState([]);
  const [txModal, setTxModal] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    lsSet("tema", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => { lsSet("privasi", privacy ? "1" : "0"); }, [privacy]);

  const dismiss = useCallback((id) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  const toast = useCallback((text, opts = {}) => {
    const id = uid();
    setToasts((p) => [...p.slice(-2), { id, text, ...opts }]);
    setTimeout(() => dismiss(id), opts.ms ?? 5000);
  }, [dismiss]);
  const openTx = useCallback((tx = null) => setTxModal({ tx }), []);
  const closeTx = useCallback(() => setTxModal(null), []);

  const value = useMemo(() => ({
    dark, setDark, privacy, setPrivacy, period, setPeriod, page, setPage,
    toasts, toast, dismiss, txModal, openTx, closeTx,
  }), [dark, privacy, period, page, toasts, toast, dismiss, txModal, openTx, closeTx]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
