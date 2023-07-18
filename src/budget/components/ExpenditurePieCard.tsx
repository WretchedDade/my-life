import { useContext, useMemo } from "react";
import Chart from "react-google-charts";

import { useBudgetItems } from "..";
import { Card } from "../../shared/components";
import { DarkModeContext } from "../../shared/DarkModeContext";

const chartOptions: Chart["props"]["options"] = {
	is3D: true,

	backgroundColor: "transparent",
	legend: {
		position: "top",
	},
	tooltip: {
		showColorCode: true,
	},

	sliceVisibilityThreshold: 0.03,
	pieResidueSliceLabel: "3% or Less",
};

export function ExpenditurePieCard() {
	const { data: budgetItems } = useBudgetItems();
	const { isDarkMode } = useContext(DarkModeContext);

	const data = useMemo(() => {
		if (budgetItems === undefined) return null;

		return [
			["Budget Item", "Amount"],
			...Object.entries(
				budgetItems
					.filter((budgetItem) => budgetItem.category !== "Income")
					.reduce<{ [key: string]: number }>((acc, budgetItem) => {
						const name = budgetItem.name.split("|")[0].trim();
						acc[name] = (acc[name] ?? 0) + budgetItem.amount;

						return acc;
					}, {}),
			),
		];
	}, [budgetItems]);

	return (
		<Card heading={{ title: "Expenses" }} isLoading={!data}>
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
