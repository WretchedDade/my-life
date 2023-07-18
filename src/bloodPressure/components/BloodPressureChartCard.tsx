import { useContext, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

import { useBloodPressureReadings } from "..";
import { DarkModeContext } from "../../shared/DarkModeContext";
import { Card } from "../../shared/components";
import { Format } from "../../shared/utils";

interface BloodPressureChartCardProps {
	className?: string;
}

type Datum = { timeAtReading: Date; reading: number };
type Series = { label: string; data: Datum[] };

export function BloodPressureChartCard({ className }: BloodPressureChartCardProps) {
	const { isDarkMode } = useContext(DarkModeContext);
	const { data: page, isLoading, isFetching } = useBloodPressureReadings(0, 100);

	const bloodPressures = page?.items;

	const data = useMemo<Series[] | null>(() => {
		if (bloodPressures === undefined) return null;

		return [
			{
				label: "Systolic",
				data: bloodPressures.map((bloodPressure) => ({ timeAtReading: bloodPressure.timeAtReading, reading: bloodPressure.systolic })),
			},
			{
				label: "Diastolic",
				data: bloodPressures.map((bloodPressure) => ({ timeAtReading: bloodPressure.timeAtReading, reading: bloodPressure.diastolic })),
			},
			// {
			// 	label: "Heart Rate",
			// 	data: bloodPressures
			// 		.filter((bloodPressure) => bloodPressure.heartRate)
			// 		.map((bloodPressure) => ({ timeAtReading: bloodPressure.timeAtReading, reading: bloodPressure.heartRate })),
			// },
		];
	}, [bloodPressures]);

	const primaryAxis = useMemo(
		(): AxisOptions<Datum> => ({
			getValue: (datum) => datum.timeAtReading,
			showGrid: true,

			invert: true,

			formatters: {
				scale: (date: Date) => Format.asDateString(date, "short"),
				cursor: (date: Date) => Format.asDateString(date, "long"),
				tooltip: (date: Date) => Format.asDateString(date, "long"),
			},
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<Datum>[] => [
			{
				getValue: (datum) => datum.reading ?? "",
				max: 180,
				min: 60,

				showDatumElements: true,

				hardMin: 60,
			},
		],
		[],
	);

	return (
		<>
			<Card isLoading={!data} color="red" isRefreshing={isFetching && !isLoading} heading={{ title: "Blood Pressure History" }} className={className}>
				{data && (
					<div className="h-96">
						<Chart options={{ dark: isDarkMode, data, primaryAxis, secondaryAxes }} />
					</div>
				)}
			</Card>
		</>
	);
}
