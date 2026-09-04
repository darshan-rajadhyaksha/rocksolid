import {
  type ComponentProps,
  type JSXElement,
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
import type {
  ThemeColors
} from "@/components/styles/theme/colors";
import cn from "@/components/utils/cn";
import buttonDefaultStyles from "./style";

type ButtonVariants = VariantProps<typeof buttonDefaultStyles>;

type ButtonSlotProps = {
  startIcon?: ComponentProps<"span">;
  endIcon?: ComponentProps<"span">;
};

export type ButtonProps<T extends ValidComponent = "button" | "span"> = {
  as?: T; // Internal API
  color?: keyof ThemeColors;
  disabled?: ButtonVariants["disabled"];
  endIcon?: JSXElement;
  fullWidth?: boolean;
  size?: ButtonVariants["size"];
  slotProps?: ButtonSlotProps;
  startIcon?: JSXElement;
  variant?: ButtonVariants["variant"];
  children?: JSXElement;
  class?: string;
} & ComponentProps<T>;


const Button = <T extends ValidComponent = "button" | "span">(
  props: ButtonProps<T>,
) => {

  const merged = mergeProps({
    as: "button" as const,
    color: "default" as const,
    variant: "solid" as const,
    size: "medium" as const,
  }, props);

  const [local, rest] = splitProps(merged, [
    "as",
    "children",
    "class",
    "color",
    "disabled",
    "endIcon",
    "fullWidth",
    "size",
    "startIcon",
    "variant",
    "slotProps",
  ]);

  const themeContextValue = useThemeContext();

  const classes = createMemo(() => {
    const state = {
      color: local.color,
      disabled: local.disabled,
      fullWidth: local.fullWidth,
      size: local.size,
      variant: local.variant,
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.button(state);
    }
    return buttonDefaultStyles(state);
  });

  return (
    <Dynamic
      component={local.as || "button"}
      {...rest}
      class={cn(
        classes().base(),
        local.class,
      )}
      disabled={local.disabled}
    >
      {local.startIcon ? (
        <span
          {...local.slotProps?.startIcon}
          class={cn(
            classes().startIcon(),
            local.slotProps?.startIcon?.class,
          )}
        >
          {local.startIcon}
        </span>
      ) : null}
      {local.children}
      {local.endIcon ? (
        <span
          {...local.slotProps?.endIcon}
          class={cn(
            classes().endIcon(),
            local.slotProps?.endIcon?.class,
          )}
        >
          {local.endIcon}
        </span>
      ) : null}
    </Dynamic>
  );
};

export default Button;