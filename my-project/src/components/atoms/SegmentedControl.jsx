export default function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="grid gap-1 p-1 rounded-xl bg-slate-500/10" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`py-2 rounded-lg text-sm font-medium transition ${value === o.value ? `${o.active} text-white shadow` : "text-slate-500 hover:bg-slate-500/10"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
