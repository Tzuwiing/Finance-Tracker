import Modal from "../atoms/Modal";
import TransactionForm from "./TransactionForm";
import { useUi } from "../../hooks/useUi";
import { useFinance } from "../../hooks/useFinance";
import { useMoney } from "../../hooks/useMoney";
import { uid } from "../../utils/format";

export default function TransactionModal() {
  const { txModal, closeTx, toast } = useUi();
  const { state, add, update } = useFinance();
  const fmt = useMoney();
  if (!txModal) return null;
  const editing = txModal.tx;

  const submit = (data) => {
    if (editing) {
      update({ ...data, id: editing.id });
      toast("Transaksi diperbarui ✏️");
    } else {
      add({ ...data, id: uid() });
      toast("Transaksi ditambahkan ✅");
      const limit = state.anggaran[data.kategori];
      if (data.tipe === "pengeluaran" && limit) {
        const bulan = data.tanggal.slice(0, 7);
        const used = state.transaksi
          .filter((t) => t.tipe === "pengeluaran" && t.kategori === data.kategori && t.tanggal.startsWith(bulan))
          .reduce((a, t) => a + t.jumlah, 0) + data.jumlah;
        if (used > limit) setTimeout(() => toast(`⚠️ Anggaran ${data.kategori} terlampaui ${fmt(used - limit)}`, { tone: "warn", ms: 6000 }), 300);
      }
    }
    closeTx();
  };

  return (
    <Modal title={editing ? "Edit Transaksi" : "Tambah Transaksi"} onClose={closeTx}>
      <TransactionForm key={editing?.id || "baru"} initial={editing} onSubmit={submit} onCancel={closeTx} />
    </Modal>
  );
}
