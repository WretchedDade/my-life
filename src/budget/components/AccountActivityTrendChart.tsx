/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo } from "react";

import { AxisOptions, Chart } from "react-charts";
import { useAccountActivityHistory } from "..";

type Datum = { date: string; amount: number };
type Series = { label: string; data: Datum[] };

export function AccountActivityTrendChart() {
	const { data: history } = useAccountActivityHistory();

	const { expenses, income } = history ?? {};

	// const dataPoints = useMemo(() => {
	// 	if (items === undefined) return null;

	// 	const income = items.filter((item) => item.amount > 0);

	// 	const filteredItems = Object.entries(
	// 		income.reduce<Record<string, number>>((groups, item) => {
	// 			groups[item.name] = (groups[item.name] ?? 0) + Math.abs(item.amount);
	// 			return groups;
	// 		}, {}),
	// 	);

	// 	return [["Category", "Amount"], ...filteredItems];
	// }, [items]);

	// if (!dataPoints) return null;

	const data = useMemo<Series[] | null>(() => {
		if (income === undefined && expenses === undefined) return null;

		const data: Series[] = [];

		if (income !== undefined)
			data.push({
				label: "Income",
				data: Object.keys(income).map((key) => ({ date: key, amount: income[key] })),
			});

		if (expenses !== undefined)
			data.push({
				label: "Expenses",
				data: Object.keys(expenses).map((key) => ({ date: key, amount: expenses[key] })),
			});

		return data;
	}, [expenses, income]);

	const primaryAxis = useMemo(
		(): AxisOptions<Datum> => ({
			getValue: (datum) => datum.date,
			showGrid: true,

			invert: true,

			elementType: "area",
			stacked: false,

			// formatters: {
			// 	scale: (date: Date) => Format.asDateString(date, "short"),
			// 	cursor: (date: Date) => Format.asDateString(date, "long"),
			// 	tooltip: (date: Date) => Format.asDateString(date, "long"),
			// },
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<Datum>[] => [
			{
				getValue: (datum) => datum.amount ?? 0,
				showDatumElements: true,

				elementType: "area",
				stacked: false,
			},
		],
		[],
	);

	if (data == null) return null;

	return (
		<div className="h-96">
			<Chart options={{ data, primaryAxis, secondaryAxes }} />
		</div>
	);
}
