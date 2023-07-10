import classNames from "classnames";
import { ColorWay, ColorWays } from "../ColorWays";
import { styles } from "../utils/styles";
import { LoadingSpinner } from "./LoadingSpinner";

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
					[styles.buttonSizes.xs]: size === "xs",
					[styles.buttonSizes.sm]: size === "sm",
					[styles.buttonSizes.md]: size === "md",
					[styles.buttonSizes.lg]: size === "lg",
					[styles.buttonSizes.xl]: size === "xl",
				},
				buttonProps.className,
			)}>
			{children}
			{isLoading && <LoadingSpinner color={colorWay.color} variant={variant === "primary" ? "secondary" : "primary"} className="h-4" />}
		</button>
	);
}
