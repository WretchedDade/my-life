import classNames from "classnames";

import { ColorWay, ColorWays } from "../../ColorWays";

import { Button } from "../Button";
import { LoadingSpinner } from "../LoadingSpinner";

export interface CardProps extends React.PropsWithChildren<object> {
	className?: string;
	isLoading?: boolean;
	color?: keyof ColorWays;
	contentPaddingDisabled?: boolean;

	heading: {
		title: string;
		description?: string;

		mediaUrl?: string;

		icon?: React.ComponentType<{ colorWay: ColorWay }>;

		action?: {
			act: () => void;
			text: string;
		};
	};

	footer?: React.ComponentType<CardFooterProps>;
}

export interface CardFooterProps {
	colorWay: ColorWay;
}

export function Card({
	className,
	isLoading,
	color = "blue",
	contentPaddingDisabled = false,

	heading,
	children,
	footer: Footer,
}: CardProps) {
	const colorWay = ColorWays[color];

	const { title, description, mediaUrl, icon: Icon, action } = heading;

	return (
		<div className={classNames("flex flex-col overflow-hidden rounded-lg bg-white shadow-xl", colorWay.card.root, className)}>
			{mediaUrl && (
				<div
					style={{ backgroundImage: `url(${mediaUrl})` }}
					className={classNames("flex h-28  items-center gap-x-4 border-b-4 bg-cover bg-center md:h-32 md:bg-top xl:h-52", colorWay.card.header)}
				/>
			)}
			<div
				className={classNames("flex flex-wrap items-center justify-between px-4 py-5 sm:flex-nowrap sm:px-6", colorWay.card.header, {
					"rounded-t-lg": !mediaUrl,
				})}>
				{/* <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"> */}
				<div>
					<h3 className={classNames("text-lg font-semibold leading-6 text-gray-900")}>{title}</h3>
					{description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
				</div>
				{Icon && (
					<div
						className={classNames(
							"flex h-6 w-6 flex-none items-center justify-center rounded-lg object-cover text-center text-lg sm:h-10 sm:w-10 sm:bg-white sm:ring-1",
							colorWay.card.icon,
						)}>
						<Icon colorWay={colorWay} />
					</div>
				)}
				{action && (
					<div className="ml-4 mt-4 flex-shrink-0">
						<Button color={color} size="lg" type="button" onClick={action.act}>
							{action.text}
						</Button>
					</div>
				)}
				{/* </div> */}
			</div>
			<div className="relative flex flex-grow flex-col">
				<div className={classNames("flex-grow", { "px-4 py-5 sm:p-6": !contentPaddingDisabled })}>{children}</div>
				{Footer && <Footer colorWay={colorWay} />}
				{isLoading && children && (
					<div className="absolute top-0 h-full w-full bg-slate-600/30">
						<LoadingSpinner color={color} centered className="h-1/2 w-1/2" />
					</div>
				)}
				{isLoading && !children && (
					<div className="h-72 w-full">
						<LoadingSpinner color={color} centered className="h-1/2 w-1/2" />
					</div>
				)}
			</div>
		</div>
	);
}
