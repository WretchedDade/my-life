import classNames from "classnames";

import { LoadingSpinner } from ".";

import { ColorWay, ColorWays } from "../../ColorWays";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	color?: keyof ColorWays;
	variant?: keyof ColorWay["actions"];
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	isLoading?: boolean;
}

export function Button({ color = "blue", variant = "primary", size = "md", type = "button", isLoading = false, children, ...buttonProps }: ButtonProps) {
	const colorWay = ColorWays[color];

	return (
		<button
			{...buttonProps}
			type={type}
			disabled={isLoading || buttonProps.disabled}
			className={classNames(
				"flex items-center gap-x-2 rounded font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
				colorWay.actions[variant],
				{
					[buttonSizes.xs]: size === "xs",
					[buttonSizes.sm]: size === "sm",
					[buttonSizes.md]: size === "md",
					[buttonSizes.lg]: size === "lg",
					[buttonSizes.xl]: size === "xl",
				},
				buttonProps.className,
			)}>
			{children}
			{isLoading && <LoadingSpinner color={colorWay.color} variant={variant === "primary" ? "secondary" : "primary"} className="h-4" />}
		</button>
	);
}

const buttonSizes = {
	xs: "rounded px-1.5 py-1 text-xs",
	sm: "rounded px-2 py-1 text-sm",
	md: "rounded-md px-2.5 py-1.5 text-sm",
	lg: "rounded-md px-3 py-2 text-sm",
	xl: "rounded-md px-3.5 py-2.5 text-sm",
};
