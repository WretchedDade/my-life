import classNames from "classnames";

import { ColorWays, IsValidColorWay } from "../../ColorWays";
import { Format } from "../../shared/utils";

import { Card, CardFooterActions, Tag } from "../../shared/components";

import { BillPayment, BillPaymentIcon, useMarkBillAsPaidMutation } from "..";

interface BillPaymentsCardProps {
	billPayment: BillPayment;
	isLoading?: boolean;
}

export function BillPaymentsCard({ billPayment, isLoading }: BillPaymentsCardProps) {
	const nonAutoPayTags = billPayment?.tags?.filter((tag) => tag.name !== "Auto-Pay");

	let color: keyof ColorWays = "green";
	if (nonAutoPayTags && nonAutoPayTags.length > 0) {
		const firstTag = nonAutoPayTags[0];

		if (IsValidColorWay(firstTag.color)) color = firstTag.color as keyof ColorWays;
	}

	const markBillAsPaidMutation = useMarkBillAsPaidMutation(color);

	return (
		<Card
			color={color}
			isLoading={isLoading}
			contentPaddingDisabled
			heading={{
				title: billPayment.name.split(" - ")[0],
				mediaUrl: billPayment?.coverUri,
				icon: () => <BillPaymentIcon billPayment={billPayment} className="h-6 w-6" />,
			}}
			footer={(props) => (
				<CardFooterActions
					{...props}
					actions={[
						{ text: "Mark as Paid", onClick: () => markBillAsPaidMutation.mutate(billPayment.id), isLoading: markBillAsPaidMutation.isLoading },
					]}
				/>
			)}>
			<dl className="-my-3 flex-grow divide-y divide-gray-100 p-4 text-sm leading-6">
				<div className="flex justify-between gap-x-4 py-2 md:py-3">
					<dt className="text-gray-500">Date Due</dt>
					<dd className={classNames("text-gray-700")}>
						<time dateTime={billPayment.dateDue.toDateString()}>{Format.asFullDate(billPayment.dateDue)}</time>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-2 md:py-3">
					<dt className="text-gray-500">Amount</dt>
					<dd className="flex items-start gap-x-2">
						<div className={classNames("font-medium text-gray-900")}>{Format.asCurrency(billPayment.amount)}</div>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-2 md:py-3">
					<dt className="text-gray-500">Is Auto-Pay?</dt>
					<dd className="flex items-start gap-x-2">
						<div className={classNames("font-medium text-gray-900")}>{billPayment.isAutoPay ? "Yes" : "No"}</div>
					</dd>
				</div>
				{nonAutoPayTags && nonAutoPayTags.length > 0 && (
					<div className="flex flex-wrap items-center justify-end gap-2 py-2 md:py-3">
						{nonAutoPayTags.map((tag) => (
							<Tag key={`${billPayment.id}-${tag.name}`} color={tag.color}>
								{tag.name}
							</Tag>
						))}
					</div>
				)}
			</dl>
		</Card>
	);
}
