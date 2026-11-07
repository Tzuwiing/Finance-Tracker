import Card from "../atoms/Card";
import Button from "../atoms/Button";
import { useUi } from "../../hooks/useUi";

export default function AppearancePanel() {
  const { dark, setDark, privacy, setPrivacy } = useUi();
  const row = "flex items-center justify-between gap-3 py-3 border-b border-slate-500/15 last:border-0";
  return (
    <Card title="Tampilan" delay={60}>
      <div className={row}>
        <div><p className="font-medium">Mode gelap</p><p className="text-xs text-slate-500">Nyaman untuk mata di malam hari</p></div>
        <Button variant="outline" size="sm" onClick={() => setDark(!dark)}>{dark ? "☀️ Terang" : "🌙 Gelap"}</Button>
      </div>
      <div className={row}>
        <div><p className="font-medium">Mode privasi</p><p className="text-xs text-slate-500">Sembunyikan semua nominal</p></div>
        <Button variant="outline" size="sm" onClick={() => setPrivacy(!privacy)}>{privacy ? "🙈 Aktif" : "👁️ Nonaktif"}</Button>
      </div>
    </Card>
  );
}
