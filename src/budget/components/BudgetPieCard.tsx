import { useMemo } from "react";
import Chart from "react-google-charts";

import { useBudgetItems } from "..";
import { Card } from "../../shared/components";

const chartOptions: Chart["props"]["options"] = {
	title: "",
	backgroundColor: "transparent",
	legend: {
		alignment: "center",
		position: "top",
	},
	tooltip: {
		showColorCode: true,
	},
	slices: {
		2: { offset: 0.1 },
	},
	pieStartAngle: 135,
	pieSliceText: "value",
};

export function BudgetPieCard() {
	const { data: budgetItems } = useBudgetItems();

	const data = useMemo(() => {
		if (budgetItems === undefined) return null;

		const totalIncome = budgetItems.filter((budgetItem) => budgetItem.category === "Income").reduce((acc, budgetItem) => acc + budgetItem.amount, 0);
		const totalBills = budgetItems.filter((budgetItem) => budgetItem.category === "Bill").reduce((acc, budgetItem) => acc + budgetItem.amount, 0);
		const totalExpenses = budgetItems.filter((budgetItem) => budgetItem.category === "Expense").reduce((acc, budgetItem) => acc + budgetItem.amount, 0);

		const remainingIncome = totalIncome - totalBills - totalExpenses;

		return [
			["Name", "Amount"],
			["Bills", totalBills],
			["Expenses", totalExpenses],
			["Remaining", remainingIncome],
		];
	}, [budgetItems]);

	return (
		<Card color="blue" heading={{ title: "Budget" }} isLoading={!data}>
			{data && <Chart chartType="PieChart" data={data} width="100%" height="400px" options={chartOptions} />}
		</Card>
	);
}
