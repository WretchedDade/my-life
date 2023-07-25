import { classNames } from "../../shared/utils";

import { LoadingSpinner } from ".";

import { ColorWay, ColorWays } from "../../ColorWays";
import { useColorWay } from "../ColorWayContext";

type ButtonShapes = "Circle" | "Square";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	shape?: ButtonShapes;
	color?: keyof ColorWays;
	variant?: keyof ColorWay["actions"];
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	isLoading?: boolean;
}

export function Button({
	shape = "Square",
	color,
	variant = "primary",
	size = "md",
	type = "button",
	isLoading = false,
	children,
	...buttonProps
}: ButtonProps) {
	const colorWay = useColorWay(color);

	return (
		<button
			{...buttonProps}
			type={type}
			disabled={isLoading || buttonProps.disabled}
			className={classNames(
				"flex items-center gap-x-2 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
				colorWay.actions[variant],
				{
					[buttonSizes.xs(shape)]: size === "xs",
					[buttonSizes.sm(shape)]: size === "sm",
					[buttonSizes.md(shape)]: size === "md",
					[buttonSizes.lg(shape)]: size === "lg",
					[buttonSizes.xl(shape)]: size === "xl",
				},
				buttonProps.className,
			)}>
			{children}
			{isLoading && <LoadingSpinner color={colorWay.color} variant={variant === "primary" ? "secondary" : "primary"} className="h-4" />}
		</button>
	);
}

const buttonSizes = {
	xs: (shape: ButtonShapes) => classNames("text-xs", { "px-1.5 py-1 rounded": shape === "Square", "p-1 rounded-full": shape === "Circle" }),
	sm: (shape: ButtonShapes) => classNames("text-sm", { "px-2 py-1 rounded": shape === "Square", "p-2 rounded-full": shape === "Circle" }),
	md: (shape: ButtonShapes) => classNames("text-sm", { "px-2.5 py-1.5 rounded-md": shape === "Square", "p-2.5 rounded-full": shape === "Circle" }),
	lg: (shape: ButtonShapes) => classNames("text-sm", { "px-3 py-2 rounded-md": shape === "Square", "p-3 rounded-full": shape === "Circle" }),
	xl: (shape: ButtonShapes) => classNames("text-sm", { "px-3.5 py-2.5 rounded-md": shape === "Square", "p-3.5 rounded-full": shape === "Circle" }),
};
