import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useCurrentBills } from "../../hooks/useCurrentBills";
import { BillPayment } from "../../types/bills";
import { HeroIcon } from "../../types/misc";
import { asFullDate } from "../../utils/formatters";
import { styles } from "../../utils/styles";

function getMockBill(name: string, daysToAdd: number, isPaid = false): BillPayment {
	return {
		id: "",
		billConfigurationId: "",

		isPaid: isPaid,
		isAutoPay: false,

		dateDue: dayjs(new Date()).add(daysToAdd, "day").toDate(),
		name: name,
	};
}

export function CurrentBills() {
	const { data: currentBills } = useCurrentBills();

	return (
		<div className="flow-root">
			<ul role="list" className="-mb-8">
				{currentBills === undefined && (
					<>
						<CurrentBillTimelineItem loading bill={getMockBill("Mortgage", 1, true)} />
						<CurrentBillTimelineItem loading bill={getMockBill("2019 Nissan Rogue", 2)} />
						<CurrentBillTimelineItem loading bill={getMockBill("Solar Panels", 3)} />
						<CurrentBillTimelineItem loading bill={getMockBill("Nationwide Insurance", 4)} />
						<CurrentBillTimelineItem loading bill={getMockBill("T-Mobile", 5)} isFinalItem />
					</>
				)}

				{currentBills?.map((bill, index) => {
					return <CurrentBillTimelineItem key={bill.id} bill={bill} isFinalItem={index === currentBills.length - 1} />;
				})}
			</ul>
		</div>
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
				{!isFinalItem && <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />}
				<Link to="/bills/unpaid" className={classNames("group relative flex space-x-3", { ["pointer-events-none"]: loading })}>
					<div>
						<CurrentBillTimelineIcon loading={loading} isPaid={bill.isPaid} isPastDue={isPastDue} />
					</div>
					<div className="flex min-w-0 flex-1 items-center justify-between space-x-4">
						<div className="flex space-x-4">
							<p
								className={classNames("text-gray-900", {
									[styles.loading]: loading,
									"sm:group-hover:font-semibold": !loading,
								})}>
								{bill.name.split(" - ")[0]}
							</p>
							{isPastDue && (
								<span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 sm:group-hover:bg-red-200 sm:group-hover:text-red-800">
									<svg className="h-1.5 w-1.5 fill-red-500 sm:group-hover:fill-red-600" viewBox="0 0 6 6" aria-hidden="true">
										<circle cx={3} cy={3} r={3} />
									</svg>
									Past Due
								</span>
							)}
						</div>
						<div
							className={classNames("whitespace-nowrap text-right text-sm text-gray-500 sm:group-hover:text-gray-900", {
								[styles.loading]: loading,
							})}>
							<time dateTime={bill.dateDue.toDateString()}>{asFullDate(bill.dateDue)}</time>
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
	let Icon: HeroIcon | undefined;

	if (isPaid) Icon = CheckCircleIcon;
	if (isPastDue) Icon = ExclamationCircleIcon;

	return (
		<span
			className={classNames("flex h-8 w-8 items-center justify-center rounded-full", {
				"text-white": !loading,
				[styles.loading]: loading && (isPaid || isPastDue),
				"bg-green-500 sm:group-hover:bg-green-600": isPaid,
				"bg-red-500 sm:group-hover:bg-red-600": isPastDue,
			})}>
			{Icon ? (
				<Icon className="h-6 w-6 text-inherit" aria-hidden="true" />
			) : (
				<div className={classNames("h-4 w-4 rounded-full bg-gray-200 sm:group-hover:bg-gray-300", { [styles.loading]: loading })}></div>
			)}
		</span>
	);
}
