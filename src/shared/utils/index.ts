import classnames from "classnames";
import { twMerge } from "tailwind-merge";

export * as Format from "./formatters";
export * as Styles from "./styles";

export const classNames: typeof classnames = (...args) => twMerge(classnames(args));
