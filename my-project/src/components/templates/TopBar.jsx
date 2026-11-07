import Button from "../atoms/Button";
import MonthPicker from "../molecules/MonthPicker";
import { PAGES } from "../../constants/pages";
import { useUi } from "../../hooks/useUi";

const NO_PERIOD = ["tujuan", "pengaturan"];

export default function TopBar() {
  const { page, period, setPeriod, privacy, setPrivacy, dark, setDark, openTx } = useUi();
  const current = PAGES.find((p) => p.id === page);
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-2xl font-extrabold">{current.icon} {current.label}</h2>
        <p className="text-sm text-slate-500">Pantau keuanganmu dengan cerdas</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {!NO_PERIOD.includes(page) && <MonthPicker value={period} onChange={setPeriod} />}
        <Button variant="outline" size="icon" onClick={() => setPrivacy(!privacy)} aria-label="Mode privasi" title="Sembunyikan nominal">{privacy ? "🙈" : "👁️"}</Button>
        <Button variant="outline" size="icon" onClick={() => setDark(!dark)} aria-label="Ganti tema" title="Ganti tema">{dark ? "☀️" : "🌙"}</Button>
        <Button onClick={() => openTx()}>＋ Transaksi</Button>
      </div>
    </header>
  );
}
