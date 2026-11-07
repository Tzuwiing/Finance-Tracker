import ProgressBar from "../atoms/ProgressBar";
import Button from "../atoms/Button";
import { useMoney } from "../../hooks/useMoney";
import { iconOf } from "../../constants/categories";

export default function BudgetRow({ nama, used, limit, onEdit }) {
  const fmt = useMoney();
  const pct = limit ? Math.round((used / limit) * 100) : 0;
  const over = limit && used > limit;
  return (
    <li className="py-3 border-b border-slate-500/15 last:border-0 animate-slide-in">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-medium">{iconOf(nama)} {nama}</span>
        <div className="flex items-center gap-2 text-sm">
          {limit ? (
            <span className={over ? "text-rose-500 font-semibold" : "text-slate-500"}>
              {fmt(used)} / {fmt(limit)} · {pct}%
            </span>
          ) : (
            <span className="text-slate-400">{used ? `${fmt(used)} terpakai` : "Belum diatur"}</span>
          )}
          <Button variant="ghost" size="sm" onClick={onEdit}>{limit ? "Ubah" : "Atur"}</Button>
        </div>
      </div>
      {limit > 0 && <ProgressBar value={used} max={limit} />}
      {over && <p className="text-xs text-rose-500 mt-1">⚠️ Melebihi anggaran {fmt(used - limit)}</p>}
    </li>
  );
}
