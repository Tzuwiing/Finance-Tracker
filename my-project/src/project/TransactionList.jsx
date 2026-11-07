function TransactionList({ transaksi, onDelete }) {
  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Daftar Transaksi</h2>
      {transaksi.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi.</p>
      ) : (
        <ul className="space-y-4">
          {transaksi.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold text-gray-700">{item.deskripsi}</p>
                <p
                  className={`${
                    item.tipe === "pemasukan"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatRupiah(item.jumlah)} ({item.tipe})
                </p>
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
