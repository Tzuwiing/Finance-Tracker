import { useFinance } from "./useFinance";
import { useUi } from "./useUi";

/** Aksi edit & hapus (dengan Urungkan) yang dipakai di banyak tempat. */
export function useTxActions() {
  const { remove, restore } = useFinance();
  const { openTx, toast } = useUi();
  return {
    edit: openTx,
    remove: (tx) => {
      remove(tx.id);
      toast("Transaksi dihapus 🗑️", { actionLabel: "Urungkan", onAction: () => restore(tx) });
    },
  };
}
