import { BillPaymentsGrid, useBills } from "../bills";

export function UnpaidBills() {
	const { data, isLoading } = useBills("Unpaid");

	return (
		<>
			<h1 className="mb-10 text-2xl">Unpaid Bills</h1>
			<BillPaymentsGrid isLoading={isLoading} billPayments={data ?? []} />
		</>
	);
}
