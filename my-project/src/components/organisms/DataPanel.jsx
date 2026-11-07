import { useRef, useState } from "react";
import Card from "../atoms/Card";
import Button from "../atoms/Button";
import ConfirmModal from "../molecules/ConfirmModal";
import { useFinance } from "../../hooks/useFinance";
import { useUi } from "../../hooks/useUi";
import { exportCsv, exportJson } from "../../utils/exporters";
import { buatDataContoh } from "../../utils/sampleData";
import { sanitizeState } from "../../utils/storage";

export default function DataPanel() {
  const { state, replace, reset } = useFinance();
  const { toast } = useUi();
  const fileRef = useRef(null);
  const [dlg, setDlg] = useState(null);
  const close = () => setDlg(null);
  const hasData = state.transaksi.length > 0 || state.tujuan.length > 0 || Object.keys(state.anggaran).length > 0;

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data = sanitizeState(JSON.parse(await file.text()));
      setDlg({ type: "import", data });
    } catch (err) {
      toast(`❌ Gagal impor: ${err.message}`, { tone: "warn" });
    }
  };

  const row = "flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-500/15 last:border-0";
  return (
    <Card title="Data & Cadangan">
      <div className={row}>
        <div><p className="font-medium">Export CSV</p><p className="text-xs text-slate-500">Buka di Excel / Google Sheets</p></div>
        <Button variant="outline" size="sm" onClick={() => exportCsv(state.transaksi)} disabled={!state.transaksi.length}>⬇ CSV</Button>
      </div>
      <div className={row}>
        <div><p className="font-medium">Cadangkan data (JSON)</p><p className="text-xs text-slate-500">Termasuk anggaran & tabungan</p></div>
        <Button variant="outline" size="sm" onClick={() => { exportJson(state); toast("Cadangan diunduh 💾"); }}>⬇ JSON</Button>
      </div>
      <div className={row}>
        <div><p className="font-medium">Pulihkan dari cadangan</p><p className="text-xs text-slate-500">Menimpa data saat ini</p></div>
        <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>⬆ Impor</Button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={onFile} aria-label="Pilih file cadangan" />
      </div>
      <div className={row}>
        <div><p className="font-medium">Muat data contoh</p><p className="text-xs text-slate-500">Isi aplikasi dengan data demo 4 bulan</p></div>
        <Button variant="outline" size="sm" onClick={() => (hasData ? setDlg({ type: "sample" }) : (replace(buatDataContoh()), toast("Data contoh dimuat ✨")))}>✨ Muat</Button>
      </div>
      <div className={row}>
        <div><p className="font-medium text-rose-500">Hapus semua data</p><p className="text-xs text-slate-500">Tidak dapat dibatalkan</p></div>
        <Button variant="danger" size="sm" onClick={() => setDlg({ type: "reset" })} disabled={!hasData}>🗑️ Hapus</Button>
      </div>
      {dlg?.type === "import" && (
        <ConfirmModal title="Pulihkan cadangan?" text={`${dlg.data.transaksi.length} transaksi, ${dlg.data.tujuan.length} tujuan akan menggantikan data saat ini.`}
          onCancel={close} onConfirm={() => { replace(dlg.data); toast("Data berhasil dipulihkan ✅"); close(); }} />
      )}
      {dlg?.type === "sample" && (
        <ConfirmModal title="Timpa dengan data contoh?" text="Data Anda saat ini akan diganti data demo." onCancel={close}
          onConfirm={() => { replace(buatDataContoh()); toast("Data contoh dimuat ✨"); close(); }} />
      )}
      {dlg?.type === "reset" && (
        <ConfirmModal danger title="Hapus semua data?" text="Semua transaksi, anggaran, dan tujuan akan dihapus permanen." confirmLabel="Ya, hapus"
          onCancel={close} onConfirm={() => { reset(); toast("Semua data dihapus"); close(); }} />
      )}
    </Card>
  );
}
