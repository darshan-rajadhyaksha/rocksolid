import {
  type ComponentProps,
  createMemo,
  createSignal,
  splitProps,
} from "solid-js";
import IconButton, {
  type IconButtonProps,
} from "@/components/IconButton";
import {
  useThemeContext,
} from "@/components/ThemeProvider/";
import cn from "@/components/utils/cn";
import CheckboxChecked from "@/components/icons/CheckboxChecked";
import CheckboxUnchecked from "@/components/icons/CheckboxUnchecked";
import checkboxDefaultStyles from "./style";

type CheckboxSlotProps = {
  base?: ComponentProps<"span">;
};

export type CheckboxProps = {
  checked?: boolean;
  class?: string;
  color?: IconButtonProps["color"];
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string; 
  onChange?: (event: Event, checked: boolean) => void;
  size?: IconButtonProps["size"]; 
  slotProps?: CheckboxSlotProps;
} & Omit<ComponentProps<"input">, "onChange">;

const Checkbox = (
  props: CheckboxProps,
) => {

  const [local, rest] = splitProps(props, [
    "checked",
    "class",
    "color",
    "defaultChecked",
    "disabled",
    "id",
    "onChange",
    "size",
    "slotProps",
    // Skip props
    "children",
  ]);

  const themeContextValue = useThemeContext();

  const isControlled = typeof local.checked === "boolean";
  
  const [localChecked, setLocalChecked] = createSignal(!!local.defaultChecked);

  const isChecked = createMemo(() => (
    isControlled ? local.checked! : localChecked()
  ));

  const handleChange = (event: Event) => {
    const checked = (
      event.currentTarget as HTMLInputElement
    ).checked;
    if (!isControlled) {
      setLocalChecked(checked);
    }
    local.onChange?.(event, checked);  
  };

  const classes = createMemo(() => {
    const state = {
      checked: isChecked(),
      disabled: local.disabled,
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.checkbox(state);
    }
    return checkboxDefaultStyles(state);
  });

  return (
    <IconButton
      {...local.slotProps?.base}
      as="span"
      class={cn(
        classes().base(),
        local.slotProps?.base?.class,
      )}
      color={local.color}
      size={local.size}
      disabled={local.disabled}
    >
      {isChecked() ? (
        <CheckboxChecked />
      ) : (
        <CheckboxUnchecked />
      )}
      <input
        {...rest}
        id={local.id}
        type="checkbox"
        checked={isChecked()}
        onChange={handleChange}
        disabled={local.disabled}
        class={cn(
          classes().input(),
          local.class,
        )}
      />
    </IconButton>
  );
};

export default Checkbox;