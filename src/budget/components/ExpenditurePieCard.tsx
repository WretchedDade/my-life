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
	const { data } = useBudgetItems();
	const { isDarkMode } = useContext(DarkModeContext);

	const { items } = data ?? {};

	const dataPoints = useMemo(() => {
		if (items === undefined) return null;

		return [
			["Budget Item", "Amount"],
			...Object.entries(
				items
					.filter((budgetItem) => budgetItem.category !== "Income")
					.reduce<{ [key: string]: number }>((acc, budgetItem) => {
						const name = budgetItem.name.split("|")[0].trim();
						acc[name] = (acc[name] ?? 0) + budgetItem.amount;

						return acc;
					}, {}),
			),
		];
	}, [items]);

	return (
		<Card heading={{ title: "Expenses" }} isLoading={!dataPoints}>
			{dataPoints && (
				<Chart
					chartType="PieChart"
					data={dataPoints}
					width="100%"
					height="400px"
					options={{ ...chartOptions, legend: { ...chartOptions, textStyle: { color: isDarkMode ? "white" : "black" } } }}
				/>
			)}
		</Card>
	);
}
