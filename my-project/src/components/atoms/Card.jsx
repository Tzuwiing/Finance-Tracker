export default function Card({ title, action, children, className = "", delay = 0 }) {
  return (
    <section style={{ animationDelay: `${delay}ms` }} className={`card animate-fade-up ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-2 mb-4">
          <h2 className="font-bold text-lg">{title}</h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
