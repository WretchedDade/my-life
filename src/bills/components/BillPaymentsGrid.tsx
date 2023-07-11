import { BillPayment, BillPaymentsCard } from "..";

import { LoadingSpinner } from "../../shared/components";

interface BillPaymentsGridProps {
	isLoading?: boolean;
	billPayments: BillPayment[];
}

export function BillPaymentsGrid({ isLoading, billPayments }: BillPaymentsGridProps) {
	if (isLoading) {
		return (
			<div className="flex-grow">
				<LoadingSpinner centered className="h-32" />
			</div>
		);
	}

	return (
		<BillPaymentsGridList>
			{billPayments.map((billPayment) => (
				<BillPaymentsCard key={billPayment.id} billPayment={billPayment} />
			))}
		</BillPaymentsGridList>
	);
}

function BillPaymentsGridList({ children }: React.PropsWithChildren<object>) {
	return (
		<ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-8">
			{children}
		</ul>
	);
}
