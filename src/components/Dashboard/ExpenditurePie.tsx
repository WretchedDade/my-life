import { useMemo } from "react";
import Chart from "react-google-charts";

import { useBudgetItems } from "../../hooks/useBudgetItems";
import { LoadingSpinner } from "../LoadingSpinner";

const chartOptions: Chart["props"]["options"] = {
	title: "",
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

export function ExpenditurePie() {
	const { data: budgetItems } = useBudgetItems();

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

	if (data == null) return <LoadingSpinner centered className="mb-16 mt-10 h-32 w-32 text-blue-600" />;

	return <Chart chartType="PieChart" data={data} width="100%" height="400px" options={chartOptions} />;
}
