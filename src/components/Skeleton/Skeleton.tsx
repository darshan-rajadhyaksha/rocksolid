import {
  type ComponentProps,
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
import cn from "@/components/utils/cn";
import skeletonDefaultStyles from "./style";

type SkeletonVariants = VariantProps<typeof skeletonDefaultStyles>;

export type SkeletonProps = {
  variant?: SkeletonVariants["variant"];
} & ComponentProps<"span">;

const Skeleton = (
  props: ParentProps<SkeletonProps>,
) => {

  const merged = mergeProps({
    variant: "rectangle" as const,
  }, props);

  const [local, rest] = splitProps(merged, [
    "children",
    "class",
    "variant",
  ]);

  const themeContextValue = useThemeContext();

  const classes = createMemo(() => {
    const state = {
      variant: local.variant,
    };
    if (themeContextValue) {
      return themeContextValue.componentsTV.skeleton(state);
    }
    return skeletonDefaultStyles(state);
  });

  return (
    <span
      {...rest}
      class={cn(
        classes(),
        local.class,
      )}
    />
  );
};

export default Skeleton;