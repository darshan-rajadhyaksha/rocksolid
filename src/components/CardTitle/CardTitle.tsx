import {
  type JSXElement,
  createMemo,
  splitProps,
} from "solid-js";
import Typography, {
  type TypographyProps,
} from "@/components/Typography/Typography";
import {
  useThemeContext,
} from "@/components/ThemeProvider/";
import cn from "@/components/utils/cn";
import cardTitleStyles from "./style";

export type CardTitleProps = {
  class?: string;
  children?: JSXElement;
} & TypographyProps;

const CardTitle = (
  props: CardTitleProps,
) => {

  const [local, rest] = splitProps(props, [
    "class",
    "children",
  ]);

  const themeContextValue = useThemeContext();

  const classes = createMemo(() => {
    if (themeContextValue) {
      return themeContextValue.componentsTV.cardTitle();
    }
    return cardTitleStyles();
  });

  return (
    <Typography
      as="h2"
      color="textPrimary"
      {...rest}
      class={cn(
        classes(),
        local.class,
      )}
    >
      {local.children}
    </Typography>
  );
};

export default CardTitle;