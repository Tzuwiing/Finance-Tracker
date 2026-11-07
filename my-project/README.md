# 💎 Finance Tracker Maximum

Aplikasi pencatat keuangan pribadi — React 19 + Vite 6 + Tailwind CSS 3. **Tanpa dependensi tambahan**
(semua grafik adalah SVG buatan sendiri), data tersimpan di perangkat (localStorage).

## Menjalankan
```bash
npm install
npm run dev       # development  → http://localhost:5173
npm run build     # production   → folder dist/ (siap deploy, SPA redirect sudah ada)
npm run lint
```

## Fitur
| Area | Detail |
|---|---|
| **Dashboard** | 4 kartu ringkasan (count-up), arus kas 6 bulan, skor kesehatan finansial, insight otomatis, donut kategori, saldo per dompet |
| **Transaksi** | Tambah / edit / hapus + **Urungkan**, kategori berikon, 3 dompet, input nominal berformat ribuan, cari, filter (tipe, kategori, dompet), 4 jenis urutan, paginasi, export CSV |
| **Anggaran** | Batas bulanan per kategori, progress bar berwarna (hijau → kuning → merah), peringatan otomatis saat anggaran terlampaui |
| **Tabungan** | Tujuan dengan ikon, target, tenggat, estimasi setoran per bulan, setor / tarik |
| **Laporan** | Arus kas, pertumbuhan saldo, donut pemasukan & pengeluaran, tabel ringkasan bulanan + rasio tabungan |
| **Pengaturan** | Mode gelap, **mode privasi** (sembunyikan nominal), backup & restore JSON, data contoh, hapus semua data |
| **Umum** | Pemilih periode (per bulan / semua waktu), responsif (sidebar desktop, bottom-nav mobile), animasi halus (hormati *reduced motion*), ErrorBoundary |

## Struktur — Atomic Design
```
src/
├── components/
│   ├── atoms/        Button, Card, Field, MoneyInput, Badge, Modal, ProgressBar, SegmentedControl, EmptyState
│   ├── molecules/    StatCard, TransactionItem, FilterBar, MonthPicker, BudgetRow, GoalCard,
│   │                 ConfirmModal, ToastItem, NavItem, InsightItem, WalletCard
│   ├── organisms/    SummaryCards, TransactionForm/Modal/List, RecentTransactions, ExpenseChart, TrendChart,
│   │                 BalanceChart, MonthlyTable, BudgetPanel, GoalForm/Panel, InsightsPanel, WalletsPanel,
│   │                 DataPanel, AppearancePanel, ToastHost
│   └── templates/    DashboardLayout, Sidebar, TopBar, BottomNav, ErrorBoundary
├── pages/            Dashboard, Transactions, Budget, Goals, Reports, Settings
├── context/          FinanceProvider (data + reducer), UiProvider (tema, privasi, periode, toast, modal)
├── hooks/            useFinance, useUi, useMoney, usePeriodData, useTxActions, useCountUp
├── utils/            format, stats, storage (validasi + migrasi), exporters, sampleData
└── constants/        categories, wallets, pages
```

## Catatan
- Data versi lama (kunci `transaksi`) otomatis dimigrasi; data tidak valid dibuang, data rusak tidak membuat aplikasi crash.
- Impor JSON divalidasi dan selalu meminta konfirmasi sebelum menimpa data.
