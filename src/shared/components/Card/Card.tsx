import { classNames } from "../../../shared/utils";

import { ColorWay, ColorWays } from "../../../ColorWays";

import { Button, ButtonProps, LoadingSpinner } from "..";
import { useColorWay } from "../../hooks";

export interface CardProps extends React.PropsWithChildren<object> {
	bordered?: boolean;

	isLoading?: boolean;
	isRefreshing?: boolean;

	className?: string;
	color?: keyof ColorWays;
	contentPaddingDisabled?: boolean;

	heading: {
		title: string;
		description?: string;

		mediaUrl?: string;

		icon?: React.ComponentType<{ colorWay: ColorWay }>;

		action?: Omit<ButtonProps, "size" | "color" | "type" | "children"> & { text: string };
	};

	footer?: React.ComponentType<CardFooterProps>;
}

export interface CardFooterProps {
	colorWay: ColorWay;

	isLoading?: boolean;
	isRefreshing?: boolean;
}

export function Card({
	bordered = false,

	isLoading,
	isRefreshing,

	className,
	color,
	contentPaddingDisabled = false,

	heading,
	children,
	footer: Footer,
}: CardProps) {
	const colorWay = useColorWay(color);

	const { title, description, mediaUrl, icon: Icon, action } = heading;

	return (
		<div
			className={classNames(
				"flex flex-col overflow-hidden bg-white shadow-xl dark:bg-zinc-900",
				colorWay.card.root,
				{ "rounded-t-lg": bordered, "rounded-lg": !bordered },
				className,
			)}>
			{mediaUrl && (
				<div
					style={{ backgroundImage: `url(${mediaUrl})` }}
					className={classNames("flex h-28  items-center gap-x-4 border-b-4 bg-cover bg-center md:h-32 md:bg-top xl:h-52", colorWay.card.header)}
				/>
			)}
			<div
				className={classNames("flex h-16 flex-wrap items-center justify-between px-4 py-5 sm:flex-nowrap sm:px-6", colorWay.card.header, {
					"rounded-t-lg": !mediaUrl,
				})}>
				<div>
					<h3 className={classNames("text-lg font-semibold text-inherit", { "flex items-center gap-x-4 whitespace-nowrap": isRefreshing })}>
						{title}
					</h3>
					{description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
				</div>
				{Icon && (
					<div
						className={classNames(
							"flex h-6 w-6 flex-none items-center justify-center rounded-lg object-cover text-center text-lg sm:h-10 sm:w-10 sm:bg-white sm:ring-2 sm:dark:bg-zinc-800 sm:dark:ring-zinc-950",
							colorWay.card.icon,
						)}>
						<Icon colorWay={colorWay} />
					</div>
				)}

				{(isRefreshing || action) && (
					<div className="flex items-center gap-x-4">
						{isRefreshing && <LoadingSpinner color={colorWay.color} className="h-7 w-7" />}
						{action && (
							<div className="flex-shrink-0">
								<Button color={color} size="lg" type="button" {...action} disabled={action.disabled || isLoading || isRefreshing}>
									{action.text}
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="relative flex flex-grow flex-col">
				<div className={classNames("flex-grow", { "px-4 py-5 sm:p-6": !contentPaddingDisabled })}>{children}</div>
				{Footer && <Footer colorWay={colorWay} isRefreshing={isRefreshing} isLoading={isLoading} />}
				{isLoading && children && (
					<div className="absolute top-0 h-full w-full bg-zinc-600/30">
						<LoadingSpinner color={colorWay.color} centered className="h-1/2 w-1/2" />
					</div>
				)}
				{isLoading && !children && (
					<div className="h-72 w-full">
						<LoadingSpinner color={colorWay.color} centered className="h-1/2 w-1/2" />
					</div>
				)}
			</div>
		</div>
	);
}
