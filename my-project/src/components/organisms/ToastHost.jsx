import ToastItem from "../molecules/ToastItem";
import { useUi } from "../../hooks/useUi";

export default function ToastHost() {
  const { toasts, dismiss } = useUi();
  return (
    <div className="fixed z-[60] left-1/2 -translate-x-1/2 bottom-24 lg:bottom-6 w-[92vw] max-w-md space-y-2" aria-live="polite">
      {toasts.map((t) => <ToastItem key={t.id} toast={t} onClose={() => dismiss(t.id)} />)}
    </div>
  );
}
