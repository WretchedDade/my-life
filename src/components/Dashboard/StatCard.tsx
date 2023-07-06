import classNames from "classnames";
import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

import { HeroIcon } from "../../types/misc";
import { styles } from "../../utils/styles";

export interface StatCardProps {
	name: string;
	stat: string;
	icon: HeroIcon;

	change?: string;
	changeType?: "increase" | "decrease";

	totalValue?: string;
	previousStat?: string;

	viewAllPath: string;

	loading?: boolean;
}

export function StatCard(props: StatCardProps) {
	const Icon = props.icon;

	return (
		<div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
			<dt>
				<div
					className={classNames("absolute rounded-md bg-indigo-500 p-3", {
						"text-white": !props.loading,
						[styles.loading]: props.loading,
					})}>
					<Icon className="h-8 w-8 text-inherit" aria-hidden="true" />
				</div>
				<p
					className={classNames("mb-1 ml-16 truncate text-sm font-medium text-gray-500", {
						[styles.loading]: props.loading,
					})}>
					{props.name}
				</p>
			</dt>
			<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
				<div
					className={classNames("flex items-baseline text-2xl font-semibold text-gray-900", {
						[styles.loading]: props.loading,
					})}>
					{props.stat}

					{props.totalValue && (
						<span className={classNames("ml-2 text-sm font-medium text-gray-500", { [styles.loading]: props.loading })}>of {props.totalValue}</span>
					)}

					{props.previousStat && (
						<span className={classNames("ml-2 text-sm font-medium text-gray-500", { [styles.loading]: props.loading })}>
							from {props.previousStat}
						</span>
					)}
				</div>
				{props.change && props.changeType && (
					<p
						className={classNames("ml-2 flex items-baseline text-sm font-semibold", {
							"text-green-600": props.changeType === "increase",
							"text-red-600": props.changeType === "decrease",
						})}>
						{props.changeType === "increase" ? (
							<ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
						) : (
							<ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
						)}

						<span className="sr-only"> {props.changeType === "increase" ? "Increased" : "Decreased"} by </span>
						{props.change}
					</p>
				)}
				<div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
					<div className="text-sm">
						<Link to={props.viewAllPath} className="font-medium text-indigo-600 hover:text-indigo-500">
							View all<span className="sr-only"> {props.name} stats</span>
						</Link>
					</div>
				</div>
			</dd>
		</div>
	);
}
