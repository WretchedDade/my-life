/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo } from "react";
import Chart, { ReactGoogleChartEvent } from "react-google-charts";

import { useAccountActivity } from "..";

const chartOptions: Chart["props"]["options"] = {
	is3D: true,

	backgroundColor: "transparent",
	legend: {
		alignment: "center",
		position: "right",
	},

	tooltip: {
		showColorCode: true,
	},
};

interface AccountActivityPieProps {
	year: number;
	month: number;

	category: string;
	onCategoryChange: (category: string) => void;
}

export function AccountActivityPie({ year, month, category, onCategoryChange }: AccountActivityPieProps) {
	const { data } = useAccountActivity({ year, month: month + 1 });
	const { items } = data ?? {};

	const dataPoints = useMemo(() => {
		if (items === undefined) return null;

		const expenses = items.filter((item) => item.amount < 0);

		const filteredItems =
			category === "All"
				? Object.entries(
						expenses.reduce<Record<string, number>>((groups, item) => {
							groups[item.category] = groups[item.category] ?? 0 + Math.abs(item.amount);
							return groups;
						}, {}),
				  )
				: expenses.filter((item) => item.category === category).map((item) => [item.name, Math.abs(item.amount)]);

		return [["Category", "Amount"], ...filteredItems];
	}, [category, items]);

	const chartEvents = useMemo(() => {
		const events: ReactGoogleChartEvent[] = [];

		if (category === "All") {
			events.push({
				eventName: "select",
				callback: ({ chartWrapper }) => {
					const chart = chartWrapper.getChart();
					const selection = chart.getSelection();

					if (selection.length === 1) {
						const { row } = selection[0];

						const category = chartWrapper.getDataTable()?.getValue(row, 0);
						onCategoryChange(category as string);
					}
				},
			});
		}

		return events;
	}, [category, onCategoryChange]);

	if (!dataPoints) return null;

	return <Chart chartType="PieChart" data={dataPoints} width="100%" height="400px" options={chartOptions} chartEvents={chartEvents} />;
}
