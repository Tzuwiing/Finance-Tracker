export const CATEGORIES = {
  pemasukan: [
    { name: "Gaji", icon: "💼" },
    { name: "Bisnis", icon: "🏪" },
    { name: "Investasi", icon: "📈" },
    { name: "Bonus", icon: "🎁" },
    { name: "Lainnya", icon: "📦" },
  ],
  pengeluaran: [
    { name: "Makanan", icon: "🍜" },
    { name: "Transportasi", icon: "🚗" },
    { name: "Tagihan", icon: "🧾" },
    { name: "Belanja", icon: "🛍️" },
    { name: "Hiburan", icon: "🎬" },
    { name: "Kesehatan", icon: "💊" },
    { name: "Pendidikan", icon: "📚" },
    { name: "Lainnya", icon: "📦" },
  ],
};

const ICONS = {};
[...CATEGORIES.pemasukan, ...CATEGORIES.pengeluaran].forEach((c) => (ICONS[c.name] = c.icon));

export const iconOf = (name) => ICONS[name] || "📦";
export const catNames = (tipe) => CATEGORIES[tipe].map((c) => c.name);
export const ALL_CATEGORY_NAMES = Object.keys(ICONS);
export const PALETTE = ["#6366f1", "#f43f5e", "#f59e0b", "#10b981", "#0ea5e9", "#a855f7", "#ec4899", "#14b8a6", "#f97316", "#64748b"];
