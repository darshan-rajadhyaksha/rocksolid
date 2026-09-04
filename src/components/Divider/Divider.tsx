import {
  type ComponentProps,
  type ValidComponent,
  createMemo,
  mergeProps,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  type VariantProps,
} from "tailwind-variants";
import {
  useThemeContext,
} from "@/components/ThemeProvider/";
import cn from "@/components/utils/cn";
import dividerDefaultStyles from "./style";

type DividerVariants = VariantProps<typeof dividerDefaultStyles>;

export type DividerProps<T extends ValidComponent = "div"> = {
  as?: T;
  class?: string;
  orientation?: DividerVariants["orientation"];
} & ComponentProps<T>;

const Divider = <T extends ValidComponent = "div">(
  props: DividerProps<T>,
) => {

  const merged = mergeProps({
    orientation: "horizontal" as const,
  }, props);

  const [local, rest] = splitProps(merged, [
    "as",
    "class",
    "orientation",
  ]);

  const themeContextValue = useThemeContext();
  
  const classes = createMemo(() => {
    const state = {
      orientation: local.orientation,
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.divider(state);
    }
    return dividerDefaultStyles(state);
  });

  return (
    <Dynamic
      role="separator"
      aria-orientation={(
        local.orientation === "horizontal" ? (
          "horizontal" 
        ) : (
          "vertical"
        )
      )}
      {...rest}
      component={local.as || "div"}
      class={cn(
        classes(),
        local.class,
      )}
    />
  );
};

export default Divider;