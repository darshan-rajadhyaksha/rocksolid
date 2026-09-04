import {
  type ComponentProps,
  type JSX,
  createMemo,
  mergeProps,
  splitProps,
} from "solid-js";
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
import inputDefaultStyles from "./style";

type InputVariants = VariantProps<typeof inputDefaultStyles>;

type InputSlotProps = {
  base?: ComponentProps<"div">;
  prefix?: ComponentProps<"span">;
  suffix?: ComponentProps<"span">;
};

type InputTypes =
  | "number"
  | "search"
  | "time"
  | "image"
  | "text"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "month"
  | "password"
  | "tel"
  | "url"
  | "week";

export type InputProps = {
  class?: string;
  color?: keyof ThemeColors;
  disabled?: boolean;
  fullWidth?: boolean;
  inputSize?: number;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  prefix?: JSX.Element;
  size?: InputVariants["size"];
  slotProps?: InputSlotProps;
  suffix?: JSX.Element;
  type?: InputTypes;
  variant?: InputVariants["variant"];
} & Omit<
  ComponentProps<"input">,
  "type" | "onInput" | "prefix" | "size"
>;

const Input = (
  props: InputProps,
) => {

  const merged = mergeProps({
    color: "default" as const,
    disabled: false,
    variant: "outlined" as const,
    size: "medium" as const,
    type: "text" as const,
  }, props);

  const [local, rest] = splitProps(merged, [
    "class",
    "color",
    "disabled",
    "fullWidth",
    "inputSize",
    "prefix",
    "size",
    "slotProps",
    "suffix",
    "type",
    "variant",
    // Skip props
    "children",
  ]);

  const themeContextValue = useThemeContext();

  const classes = createMemo(() => {
    const state = {
      color: local.color,
      disabled: local.disabled,
      variant: local.variant,
      size: local.size,
      fullWidth: local.fullWidth,
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.input(state);
    }
    return inputDefaultStyles(state);
  });

  return (
    <div
      {...local.slotProps?.base}
      class={cn(
        classes().base(),
        local.slotProps?.base?.class,
      )}
    >
      {local.prefix ? (
        <span
          {...local.slotProps?.prefix}
          class={cn(
            classes().prefix(),
            local.slotProps?.prefix?.class,
          )}
        >
          {local.prefix}
        </span>
      ) : null}
      <input
        {...rest}
        type={local.type}
        disabled={local.disabled}
        size={local.inputSize}
        class={cn(
          classes().input(),
          local.class,
        )}
      />
      {local.suffix ? (
        <span
          {...local.slotProps?.suffix}
          class={cn(
            classes().suffix(),
            local.slotProps?.suffix?.class,
          )}
        >
          {local.suffix}
        </span>
      ) : null}
    </div>
  );
};

export default Input;