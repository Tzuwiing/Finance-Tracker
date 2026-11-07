import { useCallback } from "react";
import { useUi } from "./useUi";
import { rupiah } from "../utils/format";

/** Formatter rupiah yang menghormati "mode privasi". */
export function useMoney() {
  const { privacy } = useUi();
  return useCallback((n) => (privacy ? "Rp ••••••" : rupiah(n)), [privacy]);
}
