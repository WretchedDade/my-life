import { classNames } from "../utils";

import { ColorWays } from "../../ColorWays";
import { useColorWay } from "../hooks";

export interface TextButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	active?: boolean;
	color?: keyof ColorWays;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function TextButton({ active = false, color, size = "md", type = "button", children, ...buttonProps }: TextButtonProps) {
	const colorWay = useColorWay(color);

	return (
		<button
			{...buttonProps}
			type={type}
			className={classNames(
				"flex items-center gap-x-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
				colorWay.textAction.root,
				{
					[sizes.xs]: size === "xs",
					[sizes.sm]: size === "sm",
					[sizes.md]: size === "md",
					[sizes.lg]: size === "lg",
					[sizes.xl]: size === "xl",
					[colorWay.textAction.active]: active,
				},
				buttonProps.className,
			)}>
			{children}
		</button>
	);
}

const sizes = {
	xs: "px-1.5 py-1",
	sm: "px-2 py-1.5",
	md: "px-2.5 py-2",
	lg: "px-3 py-2.5",
	xl: "px-3.5 py-3",
};
