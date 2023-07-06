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
			<ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
				<BillPaymentsCard as="li" isLoading billPayment={mockBillPayment} />
				<BillPaymentsCard as="li" isLoading billPayment={mockBillPayment} />
			</ul>
		);
	}

	return (
		<ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
			{billPayments.map((billPayment) => (
				<BillPaymentsCard as="li" key={billPayment.id} billPayment={billPayment} />
			))}
		</ul>
	);
}
