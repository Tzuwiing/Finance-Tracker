import Modal from "../atoms/Modal";
import Button from "../atoms/Button";

export default function ConfirmModal({ title, text, confirmLabel = "Ya, lanjutkan", danger = false, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-slate-500 mb-5">{text}</p>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Batal</Button>
        <Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}
