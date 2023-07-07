import { useUnpaidBillsQuery } from "../hooks/useUnpaidBills";

import { BillPaymentsGrid } from "../components/BillPayments/BillPaymentsGrid";

export function UnpaidBills() {
	const { data, isLoading } = useUnpaidBillsQuery();

	return (
		<>
			<h1 className="mb-10 text-2xl">Unpaid Bills</h1>
			<BillPaymentsGrid isLoading={isLoading} billPayments={data ?? []} />
		</>
	);
}
