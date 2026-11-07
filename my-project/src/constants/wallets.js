export const WALLETS = [
  { id: "tunai", name: "Tunai", icon: "💵" },
  { id: "bank", name: "Rekening Bank", icon: "🏦" },
  { id: "ewallet", name: "E-Wallet", icon: "📱" },
];
export const walletOf = (id) => WALLETS.find((w) => w.id === id) || WALLETS[0];
