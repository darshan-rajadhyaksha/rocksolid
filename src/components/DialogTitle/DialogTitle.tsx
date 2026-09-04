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
import dialogTitleStyles from "./style";

export type DialogTitleProps = {
  class?: string;
  children?: JSXElement;
} & TypographyProps;

const DialogTitle = (
  props: DialogTitleProps,
) => {

  const [local, rest] = splitProps(props, [
    "class",
    "children",
  ]);

  const themeContextValue = useThemeContext();

  const classes = createMemo(() => {
    if (themeContextValue) {
      return themeContextValue.componentsTV.dialogTitle();
    }
    return dialogTitleStyles();
  });

  return (
    <Typography
      as="h3"
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

export default DialogTitle;