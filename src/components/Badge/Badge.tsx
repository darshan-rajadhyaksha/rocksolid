import {
  type ComponentProps,
  type JSXElement,
  type ParentProps,
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
import badgeDefaultStyles from "./style";

type BadgeVariants = VariantProps<typeof badgeDefaultStyles>;

type BadgeSlotProps = {
  badge?: ComponentProps<"span">;
};

export type BadgeProps = {
  badgeContent?: JSXElement;
  class?: string;
  color?: keyof ThemeColors;
  overlap?: BadgeVariants["overlap"];
  position?: { 
    x: BadgeVariants["xPos"],
    y: BadgeVariants["yPos"],
  };
  slotProps?: BadgeSlotProps;
} & ComponentProps<"span">;

const Badge = (
  props: ParentProps<BadgeProps>,
) => {

  const merged = mergeProps({
    color: "default" as const,
    overlap: "circle" as const,
  }, props);

  const [local, rest] = splitProps(merged, [
    "badgeContent",
    "children",
    "class",
    "color",
    "position",
    "overlap",
    "slotProps",
  ]);

  const themeContextValue = useThemeContext();

  const isBadgeContentEmpty = createMemo(() => (
    typeof local.badgeContent === "undefined"
  ));

  const classes = createMemo(() => {
    const state = {
      color: local.color,
      overlap: local.overlap,
      xPos: local.position?.x ?? "right",
      yPos: local.position?.y ?? "top",
      empty: isBadgeContentEmpty(),
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.badge(state);
    }
    return badgeDefaultStyles(state);
  });

  return (
    <span
      {...rest}
      class={cn(
        classes().base(),
        local.class,
      )}
    >
      {local.children}
      <span
        aria-hidden={isBadgeContentEmpty()}
        {...local.slotProps?.badge}
        class={cn(
          classes().badge(),
          local.slotProps?.badge?.class,
        )}
      >
        {local.badgeContent}
      </span>
    </span>
  );
};

export default Badge;