function FinanceSummary({ transaksi }) {
  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);

  const totalPemasukan = transaksi
    .filter((t) => t.tipe === "pemasukan")
    .reduce((total, t) => total + t.jumlah, 0);

  const totalPengeluaran = transaksi
    .filter((t) => t.tipe === "pengeluaran")
    .reduce((total, t) => total + t.jumlah, 0);

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  const summaryBox = (label, value, color) => (
    <div
      className={`p-4 rounded-lg bg-${color}-100 text-${color}-800 shadow-sm`}
    >
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xl font-semibold">{formatRupiah(value)}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {summaryBox("Total Pemasukan", totalPemasukan, "green")}
      {summaryBox("Total Pengeluaran", totalPengeluaran, "red")}
      {summaryBox("Saldo Akhir", saldoAkhir, "blue")}
    </div>
  );
}

export default FinanceSummary;
