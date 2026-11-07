export default function ToastItem({ toast, onClose }) {
  const tone = toast.tone === "warn" ? "border-amber-400" : "border-indigo-400";
  return (
    <div role="status" className={`animate-fade-up flex items-center gap-3 rounded-xl border-l-4 ${tone} bg-slate-900 text-white text-sm px-4 py-3 shadow-2xl`}>
      <span className="flex-1">{toast.text}</span>
      {toast.actionLabel && (
        <button className="font-semibold text-indigo-300 hover:text-indigo-200"
          onClick={() => { toast.onAction?.(); onClose(); }}>{toast.actionLabel}</button>
      )}
      <button aria-label="Tutup" className="text-slate-400 hover:text-white" onClick={onClose}>✕</button>
    </div>
  );
}
