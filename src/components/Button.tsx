import classNames from "classnames";
import { ColorWay, ColorWays } from "./ColorWays";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	color?: keyof ColorWays;
	variant?: keyof ColorWay["actions"];
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Button({ color = "blue", variant = "primary", size = "md", ...buttonProps }: ButtonProps) {
	const colorWay = ColorWays[color];

	return (
		<button
			{...buttonProps}
			className={classNames(
				"rounded font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
				colorWay.actions[variant],
				{
					"rounded px-2 py-1 text-xs": size === "xs",
					"rounded px-2 py-1 text-sm": size === "sm",
					"rounded-md px-2.5 py-1.5 text-sm": size === "md",
					"rounded-md px-3 py-2 text-sm": size === "lg",
					"rounded-md px-3.5 py-2.5 text-sm": size === "xl",
				},
				buttonProps.className,
			)}
		/>
	);
}
