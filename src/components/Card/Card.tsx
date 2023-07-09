import classNames from "classnames";

import { Button } from "../Button";
import { ColorWay, ColorWays } from "../ColorWays";
import { LoadingSpinner } from "../LoadingSpinner";

export interface CardProps extends React.PropsWithChildren<object> {
	isLoading?: boolean;

	color?: keyof ColorWays;

	title: string;
	description?: string;

	action?: {
		act: () => void;
		text: string;
	};

	footer?: React.ComponentType<CardFooterProps>;

	contentPaddingDisabled?: boolean;

	className?: string;
}

export interface CardFooterProps {
	colorWay: ColorWay;
}

export function Card({
	isLoading,
	title,
	description,
	children,
	color = "blue",
	action,
	footer: Footer,
	className,
	contentPaddingDisabled = false,
}: CardProps) {
	const colorWay = ColorWays[color];

	return (
		<div className={classNames("overflow-hidden rounded-lg bg-white shadow-xl", colorWay.card.root, className)}>
			<div className={classNames("rounded-t-lg  px-4 py-5 sm:px-6", colorWay.card.header)}>
				<div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div className="ml-4 mt-4">
						<h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
						{description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
					</div>
					{action && (
						<div className="ml-4 mt-4 flex-shrink-0">
							<Button color={color} size="lg" type="button" onClick={action.act}>
								{action.text}
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className="relative">
				<div className={classNames({ "px-4 py-5 sm:p-6": !contentPaddingDisabled })}>{children}</div>
				{Footer && <Footer colorWay={colorWay} />}
				{isLoading && children && (
					<div className="absolute top-0 h-full w-full bg-slate-600/25 text-red-600">
						<LoadingSpinner centered className="h-1/2 w-1/2" />
					</div>
				)}
				{isLoading && !children && (
					<div className="h-72 w-full text-red-600">
						<LoadingSpinner centered className="h-1/2 w-1/2" />
					</div>
				)}
			</div>
		</div>
	);
}
