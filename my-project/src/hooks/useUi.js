import { useContext } from "react";
import { UiContext } from "../context/UiContext";

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi harus dipakai di dalam UiProvider");
  return ctx;
}
