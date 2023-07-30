/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo } from "react";
import Chart, { ReactGoogleChartEvent } from "react-google-charts";

import { AccountActivityItem, useAccountActivity } from "..";

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

interface AccountActivityExpensesPieProps {
	year: number;
	month: number;

	category: string;
	onCategoryChange: (category: string) => void;

	onItemSelected: (item: AccountActivityItem) => void;
	onItemsSelected: (items: AccountActivityItem[]) => void;
}

export function AccountActivityExpensesPie({ year, month, category, onCategoryChange, onItemSelected, onItemsSelected }: AccountActivityExpensesPieProps) {
	const { data } = useAccountActivity({ year, month: month + 1 });
	const { items } = data ?? {};

	const dataPoints = useMemo(() => {
		if (items === undefined) return null;

		const expenses = items.filter((item) => item.amount < 0);

		const filteredItems =
			category === "All"
				? Object.entries(
						expenses.reduce<Record<string, number>>((groups, item) => {
							groups[item.category] = (groups[item.category] ?? 0) + Math.abs(item.amount);
							return groups;
						}, {}),
				  )
				: Object.entries(
						expenses
							.filter((item) => item.category === category)
							.reduce<Record<string, number>>((groups, item) => {
								groups[item.name] = (groups[item.name] ?? 0) + Math.abs(item.amount);
								return groups;
							}, {}),
				  );

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
		} else {
			events.push({
				eventName: "select",
				callback: ({ chartWrapper }) => {
					const chart = chartWrapper.getChart();
					const selection = chart.getSelection();

					if (selection.length === 1) {
						const { row } = selection[0];

						const value = chartWrapper.getDataTable()?.getValue(row, 0);
						const selectedItems = items?.filter((item) => item.name === value) ?? [];

						if (selectedItems.length > 1) onItemsSelected(selectedItems);
						else if (selectedItems.length === 1) onItemSelected(selectedItems[0]);
					}
				},
			});
		}

		return events;
	}, [category, items, onCategoryChange, onItemSelected, onItemsSelected]);

	if (!dataPoints) return null;

	return <Chart chartType="PieChart" data={dataPoints} width="100%" height="400px" options={chartOptions} chartEvents={chartEvents} />;
}
