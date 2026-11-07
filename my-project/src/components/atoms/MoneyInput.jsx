import Field from "./Field";
import { angka } from "../../utils/format";

/** Input nominal dengan pemisah ribuan. `value` = string angka murni. */
export default function MoneyInput({ value, onChange, ...props }) {
  return (
    <Field
      inputMode="numeric"
      placeholder="0"
      value={value ? angka(value) : ""}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 13))}
      {...props}
    />
  );
}
