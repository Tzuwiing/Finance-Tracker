import { useEffect } from "react";

export default function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end sm:place-items-center bg-slate-900/50 backdrop-blur-sm animate-fade-in sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={title}
        className={`card w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-md"} rounded-b-none sm:rounded-b-2xl animate-pop max-h-[92vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">{title}</h2>
          <button aria-label="Tutup" onClick={onClose} className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-500/10">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
