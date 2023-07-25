import classnames from "classnames";
import { twMerge } from "tailwind-merge";

export * as Format from "./formatters";
export * as Styles from "./styles";

export const classNames: typeof classnames = (...args) => twMerge(classnames(args));

export const getFormData = (form: HTMLFormElement, additionalData: Record<string, unknown> = {}) => {
	const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

	return {...formJson, ...additionalData};
}