import classNames from "classnames";
import { ColorWays, ColorWaysKey } from "../../../ColorWays";

interface InputBaseProps {
	color: ColorWaysKey;

	error?: boolean;
}

type InputProps = InputBaseProps & Omit<React.ComponentPropsWithoutRef<"input">, keyof InputBaseProps>;

export function Input({ color, className, error = false, ...props }: InputProps) {
	const colorWay = ColorWays[color];
	return (
		<input
			{...props}
			className={classNames(
				"dark: block w-full appearance-none rounded-md border-0 p-1.5 text-sm text-gray-900 shadow-sm outline-none ring-2 ring-inset  focus:ring-inset dark:bg-zinc-700 dark:text-gray-50 dark:ring-zinc-900 dark:focus:ring-zinc-950 sm:leading-6",
				{
					"ring-red-900 focus:ring-red-900": error,
					[colorWay.form.input]: !error,
				},
				className,
			)}
		/>
	);
}
