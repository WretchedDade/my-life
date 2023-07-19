import classNames from "classnames";
import { Link } from "react-router-dom";

import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BillFilter, BillPayment, useBills } from "..";
import { Card } from "../../shared/components";
import { Format, Styles } from "../../shared/utils";

interface BillTimelineProps {
	filter: Extract<BillFilter, "ThisWeek" | "NextWeek">;
}

export function BillTimelineCard({ filter }: BillTimelineProps) {
	const { data: bills, isLoading } = useBills(filter);

	const title = filter === "ThisWeek" ? "Bills from this week" : "Bills from next week";

	return (
		<Card color="green" heading={{ title }} isLoading={isLoading}>
			{bills !== undefined && (
				<div className="flow-root">
					<ul role="list" className="-mb-8">
						{bills.map((bill, index) => {
							return <CurrentBillTimelineItem key={bill.id} bill={bill} isFinalItem={index === bills.length - 1} />;
						})}
					</ul>
				</div>
			)}
		</Card>
	);
}

interface CurrentBillTimelineItemProps {
	loading?: boolean;

	bill: BillPayment;
	isFinalItem?: boolean;
}

function CurrentBillTimelineItem({ loading, bill, isFinalItem }: CurrentBillTimelineItemProps) {
	const isPastDue = !bill.isPaid && bill.dateDue < new Date();

	return (
		<li>
			<div className="relative pb-8">
				{!isFinalItem && <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-zinc-800" aria-hidden="true" />}
				<Link to="/bills/unpaid" className={classNames("group relative flex space-x-3", { ["pointer-events-none"]: loading })}>
					<div>
						<CurrentBillTimelineIcon loading={loading} isPaid={bill.isPaid} isPastDue={isPastDue} />
					</div>
					<div className="flex min-w-0 flex-1 items-center justify-between space-x-4">
						<div className="flex space-x-4">
							<p
								className={classNames("text-inherit", {
									[Styles.loading]: loading,
									"sm:group-hover:font-semibold": !loading,
								})}>
								{bill.name.split(" - ")[0]}
							</p>
							{isPastDue && (
								<span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-800 dark:text-gray-50 sm:group-hover:bg-red-200 sm:group-hover:text-red-800 sm:dark:group-hover:bg-red-900 sm:dark:group-hover:text-gray-100">
									<svg
										className="h-1.5 w-1.5 fill-red-500 dark:fill-gray-50 sm:group-hover:fill-red-600 sm:dark:group-hover:fill-gray-100"
										viewBox="0 0 6 6"
										aria-hidden="true">
										<circle cx={3} cy={3} r={3} />
									</svg>
									Past Due
								</span>
							)}
						</div>
						<div
							className={classNames(
								"whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-500 sm:group-hover:text-gray-900 sm:dark:group-hover:text-gray-300",
								{
									[Styles.loading]: loading,
								},
							)}>
							<time dateTime={bill.dateDue.toDateString()}>{Format.asFullDate(bill.dateDue)}</time>
						</div>
					</div>
				</Link>
			</div>
		</li>
	);
}

interface CurrentBillTimelineIconProps {
	loading?: boolean;

	isPaid: boolean;
	isPastDue: boolean;
}

function CurrentBillTimelineIcon({ loading, isPaid, isPastDue }: CurrentBillTimelineIconProps) {
	let icon: typeof faCheck | undefined;

	if (isPaid) icon = faCheck;
	if (isPastDue) icon = faExclamation;

	return (
		<span
			className={classNames("flex h-8 w-8 items-center justify-center rounded-full", {
				"text-white": !loading,
				[Styles.loading]: loading && (isPaid || isPastDue),
				"bg-green-500 dark:bg-green-700 sm:group-hover:bg-green-600 sm:dark:group-hover:bg-green-600": isPaid,
				"bg-red-500 dark:bg-red-700 sm:group-hover:bg-red-600 sm:dark:group-hover:bg-red-600": isPastDue,
			})}>
			{icon ? (
				<FontAwesomeIcon icon={icon} className="h-5 w-5 text-inherit" aria-hidden="true" />
			) : (
				<div
					className={classNames("h-4 w-4 rounded-full bg-gray-200 dark:bg-zinc-800 sm:group-hover:bg-gray-300 sm:dark:group-hover:bg-gray-950", {
						[Styles.loading]: loading,
					})}></div>
			)}
		</span>
	);
}
