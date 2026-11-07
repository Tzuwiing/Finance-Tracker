export default function EmptyState({ icon = "🌱", text, children }) {
  return (
    <div className="text-center py-8 text-slate-400 animate-fade-in">
      <div className="text-4xl mb-2 animate-float">{icon}</div>
      <p className="text-sm">{text}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
