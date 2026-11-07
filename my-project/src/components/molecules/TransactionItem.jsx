import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { useMoney } from "../../hooks/useMoney";
import { iconOf } from "../../constants/categories";
import { walletOf } from "../../constants/wallets";
import { tanggal } from "../../utils/format";

export default function TransactionItem({ item, onEdit, onDelete }) {
  const fmt = useMoney();
  const masuk = item.tipe === "pemasukan";
  return (
    <li className="animate-slide-in flex items-center gap-3 py-3 border-b border-slate-500/15 last:border-0">
      <div className={`w-10 h-10 rounded-xl grid place-items-center text-xl shrink-0 ${masuk ? "bg-emerald-500/15" : "bg-rose-500/15"}`}>{iconOf(item.kategori)}</div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold truncate">{item.deskripsi}</p>
        <p className="text-xs text-slate-500 flex flex-wrap gap-x-2 gap-y-1 items-center mt-0.5">
          <span>{tanggal(item.tanggal)}</span>
          <Badge tone={item.tipe}>{item.kategori}</Badge>
          <span>{walletOf(item.dompet).icon} {walletOf(item.dompet).name}</span>
        </p>
      </div>
      <span className={`font-semibold tabular-nums text-sm sm:text-base ${masuk ? "text-emerald-500" : "text-rose-500"}`}>
        {masuk ? "+" : "-"}{fmt(item.jumlah)}
      </span>
      {onEdit && <Button variant="ghost" size="icon" onClick={() => onEdit(item)} aria-label="Edit">✏️</Button>}
      {onDelete && <Button variant="soft" size="icon" onClick={() => onDelete(item)} aria-label="Hapus">🗑️</Button>}
    </li>
  );
}
