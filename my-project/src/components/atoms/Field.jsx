export default function Field({ label, error, hint, as: Tag = "input", children, ...props }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      <Tag className={`input ${error ? "ring-2 ring-rose-400" : ""}`} {...props}>{children}</Tag>
      {hint && !error && <span className="text-xs text-slate-400 block">{hint}</span>}
      {error && <span role="alert" className="text-xs text-rose-500 animate-shake block">{error}</span>}
    </label>
  );
}
