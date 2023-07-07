import { BillPayment } from "../../types/bills";
import { BillPaymentsCard } from "./BillPaymentCard";

interface BillPaymentsGridProps {
	isLoading?: boolean;
	billPayments: BillPayment[];
}

const mockBillPayment: BillPayment = {
	id: "1",
	billConfigurationId: "1",
	name: "Mock Bill Payment",
	amount: 100,
	dateDue: new Date(),
	tags: [
		{
			name: "Mock Tag",
			color: "Blue",
		},
	],
	isAutoPay: true,
	isPaid: false,
};

export function BillPaymentsGrid({ isLoading, billPayments }: BillPaymentsGridProps) {
	if (isLoading) {
		return (
			<BillPaymentsGridList>
				<BillPaymentsCard as="li" isLoading billPayment={mockBillPayment} />
				<BillPaymentsCard as="li" isLoading billPayment={mockBillPayment} />
			</BillPaymentsGridList>
		);
	}

	return (
		<BillPaymentsGridList>
			{billPayments.map((billPayment) => (
				<BillPaymentsCard as="li" key={billPayment.id} billPayment={billPayment} />
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
