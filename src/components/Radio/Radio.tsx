import {
  type ComponentProps,
  createMemo,
  createSignal,
  splitProps,
} from "solid-js";
import IconButton, {
  type IconButtonProps
} from "@/components/IconButton";
import {
  useThemeContext,
} from "@/components/ThemeProvider/";
import {
  useRadioGroupContext,
} from "@/components/RadioGroupContext";
import RadioChecked from "@/components/icons/RadioChecked";
import RadioUnchecked from "@/components/icons/RadioUnchecked";
import cn from "@/components/utils/cn";
import radioDefaultStyles from "./style";

type RadioSlotProps = {
  base?: ComponentProps<"span">;
};

export type RadioProps = {
  class?: string;
  checked?: boolean;
  color?: IconButtonProps["color"],
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: (event: Event) => void;
  size?: IconButtonProps["size"];
  slotProps?: RadioSlotProps;
  value?: string;
} & Omit<ComponentProps<"input">, "type">;

const Radio = (
  props: RadioProps,
) => {

  const [local, rest] = splitProps(props, [
    "checked",
    "class",
    "color",
    "defaultChecked",
    "disabled",
    "name",
    "onChange",
    "size",
    "slotProps",
    "value",
    // Skip props
    "children",
  ]);

  const themeContextValue = useThemeContext();

  const radioGroupContextValue = useRadioGroupContext();

  const isControlled = typeof local.checked === "boolean";

  const [localChecked, setLocalChecked] = createSignal(!!local.defaultChecked);

  const isChecked = createMemo(() => {
    if (radioGroupContextValue) {
      return radioGroupContextValue.value() === local.value;
    }
    if (isControlled) {
      return local.checked;
    }
    return localChecked();
  });

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    const value = target.value;
    if (!radioGroupContextValue && !isControlled) {
      setLocalChecked(checked);
    }
    local.onChange?.(event);
    radioGroupContextValue?.onChange(event, value);
  };

  const classes = createMemo(() => {
    const state = {
      checked: isChecked(),
      disabled: local.disabled,
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.radio(state);
    }
    return radioDefaultStyles(state);
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
        <RadioChecked />
      ) : (
        <RadioUnchecked />
      )}
      <input
        name={(
          radioGroupContextValue?.name?.() ?? local.name
        )}
        {...rest}
        type="radio"
        checked={isChecked()}
        onChange={handleChange}
        disabled={local.disabled}
        value={local.value}
        class={cn(
          classes().input(),
          local.class,
        )}
      />
    </IconButton>
  );
};

export default Radio;