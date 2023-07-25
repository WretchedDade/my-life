import { forwardRef } from "react";
import { ColorWaysKey } from "../../../ColorWays";
import { classNames } from "../../../shared/utils";
import { useColorWay } from "../../ColorWayContext";

interface InputBaseProps {
	color?: ColorWaysKey;

	error?: boolean;
}

type InputProps = InputBaseProps & Omit<React.ComponentPropsWithRef<"input">, keyof InputBaseProps>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ color, className, error = false, ...props }, ref) => {
	const colorWay = useColorWay(color);
	return (
		<input
			ref={ref}
			{...props}
			className={classNames(
				"block w-full appearance-none rounded-md border-0 p-1.5 text-sm text-gray-900 shadow-sm outline-none ring-2 ring-inset  focus:ring-inset dark:bg-zinc-700 dark:text-gray-50 dark:ring-zinc-900 dark:focus:ring-zinc-950 sm:leading-6",
				{
					"ring-red-900 focus:ring-red-900": error,
					[colorWay.form.input]: !error,
				},
				className,
			)}
		/>
	);
});
