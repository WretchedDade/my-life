import { useContext, useMemo } from "react";
import Chart from "react-google-charts";

import { useBudgetItems } from "..";
import { Card } from "../../shared/components";
import { DarkModeContext } from "../../shared/DarkModeContext";

const chartOptions: Chart["props"]["options"] = {
	is3D: true,

	backgroundColor: "transparent",
	legend: {
		alignment: "center",
		position: "top",
	},
	tooltip: {
		showColorCode: true,
	},

	slices: {
		0: { offset: 0.2 },
	},

	pieSliceText: "value",
};

export function BudgetPieCard() {
	const { data: budgetItems } = useBudgetItems();
	const { isDarkMode } = useContext(DarkModeContext);

	const data = useMemo(() => {
		if (budgetItems === undefined) return null;

		const totalIncome = budgetItems.filter((budgetItem) => budgetItem.isIncome).reduce((acc, budgetItem) => acc + budgetItem.amount, 0);
		const totalBills = budgetItems.filter((budgetItem) => budgetItem.category === "Bill").reduce((acc, budgetItem) => acc + budgetItem.amount, 0);
		const totalExpenses = budgetItems.filter((budgetItem) => budgetItem.category === "Expense").reduce((acc, budgetItem) => acc + budgetItem.amount, 0);

		const remainingIncome = totalIncome - totalBills - totalExpenses;

		return [
			["Name", "Amount"],
			["Remaining", remainingIncome],
			["Bills", totalBills],
			["Expenses", totalExpenses],
		];
	}, [budgetItems]);

	return (
		<Card color="blue" heading={{ title: "Budget" }} isLoading={!data}>
			{data && (
				<Chart
					chartType="PieChart"
					data={data}
					width="100%"
					height="400px"
					options={{ ...chartOptions, legend: { ...chartOptions, textStyle: { color: isDarkMode ? "white" : "black" } } }}
				/>
			)}
		</Card>
	);
}
