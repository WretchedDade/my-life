import { GetColorWay } from "../../ColorWays";
import { classNames } from "../../shared/utils";

type TagVariants = "Normal" | "Solid" | "Dim-Solid";

interface TagProps {
	color: string;

	className?: string;

	variant?: TagVariants;
}

export function Tag({ color, className, variant = "Normal", children }: React.PropsWithChildren<TagProps>) {
	const colorWay = GetColorWay(color);

	return (
		<div
			className={classNames(
				"whitespace-nowrap rounded px-2 py-1 text-xs ring-1 ring-inset",
				{ [colorWay.tag.normal]: variant === "Normal", [colorWay.tag.solid]: variant === "Solid", [colorWay.tag.dimSolid]: variant === "Dim-Solid" },
				className,
			)}>
			{children}
		</div>
	);
}
