import {
  createContext,
  useContext,
  type Accessor,
} from "solid-js";

export type TableContextValue = {
  dense: Accessor<boolean>;
};

export const TableContext = (
  createContext<TableContextValue>()
);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used inside TableContextProvider");
  }
  return context;
};