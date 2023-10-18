import { Divider, Title } from "@mantine/core";
import { BillsGrid } from "./BillsGrid";
import { useBills } from "./hooks/useBills";

export function UnpaidBills() {
	const unpaidBills = useBills("Unpaid");

	return (
		<div>
			<Title order={2} my="md" size="h3">
				Unpaid Bills
			</Title>
			<Divider my="xl" />
			{unpaidBills.isLoading && <BillsGrid skeleton numberOfSkeletons={3} />}
			{unpaidBills.isSuccess && <BillsGrid bills={unpaidBills.data} />}
		</div>
	);
}
