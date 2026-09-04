import {
  useContext,
} from "solid-js";
import {
  ThemeContext,
} from "@/components/ThemeProvider/ThemeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context.theme;
};

export default useTheme;