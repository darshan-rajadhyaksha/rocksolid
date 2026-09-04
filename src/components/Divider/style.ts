import { tv } from "tailwind-variants";
import defaultTheme, {
  type Theme,
} from "@/components/styles/theme/";

export const divider = (
  theme: Theme = defaultTheme,
) => tv({
  base: [
    "border-thin",
    theme.divider,
  ],
  variants: {
    orientation: {
      horizontal: "border-t w-full",
      vertical: "border-l h-auto self-stretch",
    },
  },
});

export default divider();