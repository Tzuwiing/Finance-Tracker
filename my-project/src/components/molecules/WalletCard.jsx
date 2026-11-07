import { useMoney } from "../../hooks/useMoney";

export default function WalletCard({ wallet, saldo }) {
  const fmt = useMoney();
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 bg-slate-500/5 border border-slate-500/15 hover:-translate-y-0.5 transition">
      <span className="text-2xl">{wallet.icon}</span>
      <div className="flex-1">
        <p className="text-xs text-slate-500">{wallet.name}</p>
        <p className={`font-semibold tabular-nums ${saldo < 0 ? "text-rose-500" : ""}`}>{fmt(saldo)}</p>
      </div>
    </div>
  );
}
