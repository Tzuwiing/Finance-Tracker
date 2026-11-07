import Card from "../atoms/Card";
import WalletCard from "../molecules/WalletCard";
import { WALLETS } from "../../constants/wallets";
import { usePeriodData } from "../../hooks/usePeriodData";
import { walletBalances } from "../../utils/stats";

export default function WalletsPanel() {
  const { all } = usePeriodData();
  const bal = walletBalances(all);
  return (
    <Card title="Dompet" delay={120}>
      <div className="space-y-2">{WALLETS.map((w) => <WalletCard key={w.id} wallet={w} saldo={bal[w.id]} />)}</div>
    </Card>
  );
}
