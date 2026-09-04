import {
  type ComponentProps,
  For,
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
import selectDefaultStyles from "./style";

type SelectVariants = VariantProps<typeof selectDefaultStyles>;

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = {
  class?: string;
  color?: keyof ThemeColors;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (event: InputEvent) => void;
  options?: SelectOption[];
  size?: SelectVariants["size"];
  variant?: SelectVariants["variant"];
} & Omit<
  ComponentProps<"select">,
  "multiple" | "onChange"
>;

const Select = (
  props: SelectProps,
) => {

  const merged = mergeProps({
    color: "default" as const,
    disabled: false,
    variant: "outlined" as const,
    size: "medium" as const,
  }, props);

  const [local, rest] = splitProps(merged, [
    "class",
    "color",
    "disabled",
    "fullWidth",
    "options",
    "size",
    "variant",
    // Skip props
    "children",
    // @ts-ignore
    "multiple",
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
      return themeContextValue.componentsTV.select(state);
    }
    return selectDefaultStyles(state);
  });

  const selectOptions = createMemo(() => (
    local.options ?? []
  ));

  return (
    <select
      {...rest}
      multiple={false}
      disabled={local.disabled}
      class={cn(
        classes(),
        local.class,
      )}
    >
      <For each={selectOptions()}>
        {(option) => (
          <option
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        )}
      </For>
    </select>
  );
};

export default Select;