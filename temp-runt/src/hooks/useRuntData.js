import { useContext } from "react";

import { RuntDataContext } from "../context/RuntDataContext";

export default function useRuntData() {
  const context = useContext(RuntDataContext);

  if (!context) {
    throw new Error("useRuntData must be used within a RuntDataProvider");
  }

  return context;
}
