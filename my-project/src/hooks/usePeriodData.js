import { useMemo } from "react";
import { useFinance } from "./useFinance";
import { useUi } from "./useUi";
import { inPeriod, totals } from "../utils/stats";
import { hariIni } from "../utils/format";

/** Data transaksi untuk periode yang sedang dipilih. */
export function usePeriodData() {
  const { state } = useFinance();
  const { period } = useUi();
  return useMemo(() => {
    const all = state.transaksi;
    const items = inPeriod(all, period);
    return {
      all, items, period,
      totals: totals(items),
      allTotals: totals(all),
      monthKey: period === "all" ? hariIni().slice(0, 7) : period,
    };
  }, [state.transaksi, period]);
}
