import { useNavigate } from "react-router-dom";

import { Button, Group, Skeleton, Table, Text } from "@mantine/core";

import { useBills } from "../Bills/hooks/useBills";
import { format } from "../shared/utils";

export function BillsToPay() {
	const navigate = useNavigate();
	const bills = useBills("Unpaid");

	if (bills.isLoading)
		return (
			<>
				<Skeleton height={16} mb="md" />
				<Skeleton height={16} mb="md" />
				<Skeleton height={16} />
			</>
		);

	if (bills.error)
		return (
			<Text ta="center" c="dimmed" my="xl">
				Something went wrong when fetching your bills.
			</Text>
		);

	if (bills.isSuccess) {
		const billsToPay = bills.data.filter((bill) => !bill.isAutoPay);

		if (billsToPay.length === 0)
			return (
				<Text ta="center" c="dimmed" my="xl">
					There are no bills that require your attention.
				</Text>
			);

		return (
			<>
				<Table striped="even" highlightOnHover withColumnBorders>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Name</Table.Th>
							<Table.Th>Date Due</Table.Th>
							<Table.Th>Amount</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{billsToPay.map((bill) => (
							<Table.Tr key={bill.id}>
								<Table.Td>{bill.name.split(" - ")[0]}</Table.Td>
								<Table.Td>{format.asDateString(bill.dateDue, "medium")}</Table.Td>
								<Table.Td>${bill.amount}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>

				<Group pt="lg" justify="flex-end">
					<Button size="sm" onClick={() => navigate("/unpaid-bills")}>
						Go to Unpaid Bills
					</Button>
				</Group>
			</>
		);
	}
}
