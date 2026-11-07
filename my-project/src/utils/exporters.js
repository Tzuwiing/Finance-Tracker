function download(name, text, mime) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportCsv(rows, name = "transaksi.csv") {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const head = "Tanggal,Deskripsi,Kategori,Tipe,Dompet,Jumlah";
  const body = rows.map((t) => [t.tanggal, esc(t.deskripsi), t.kategori, t.tipe, t.dompet, t.jumlah].join(","));
  download(name, "\uFEFF" + [head, ...body].join("\n"), "text/csv;charset=utf-8");
}

export function exportJson(state) {
  const stamp = new Date().toISOString().slice(0, 10);
  download(`finance-backup-${stamp}.json`, JSON.stringify(state, null, 2), "application/json");
}
