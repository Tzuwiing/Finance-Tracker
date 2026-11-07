const variants = {
  primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:brightness-110",
  success: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600",
  danger: "bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600",
  outline: "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-500/10",
  ghost: "text-slate-600 dark:text-slate-300 hover:bg-slate-500/10",
  soft: "text-rose-500 hover:bg-rose-500/10",
};
const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  icon: "w-9 h-9 grid place-items-center text-base",
};

export default function Button({ variant = "primary", size = "md", className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`rounded-xl font-medium transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
