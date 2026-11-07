import AppearancePanel from "../components/organisms/AppearancePanel";
import DataPanel from "../components/organisms/DataPanel";

export default function SettingsPage() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <AppearancePanel />
      <DataPanel />
    </div>
  );
}
