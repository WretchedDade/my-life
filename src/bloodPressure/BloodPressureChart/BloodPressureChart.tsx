import { AxisOptions, Chart, UserSerie } from "react-charts";

import { useMantineColorScheme } from "@mantine/core";

import { useMemo } from "react";
import { format } from "../../shared/utils";
import { useBloodPressureReadings } from "../hooks/useBloodPressureReadings";

type Datum = { timeAtReading: Date; reading: number };

export function BloodPressureChart() {
	const { colorScheme } = useMantineColorScheme();
	const readings = useBloodPressureReadings(0, 100);

	const bloodPressures = readings.data?.items;

	const data = useMemo<UserSerie<Datum>[] | null>(() => {
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
		];
	}, [bloodPressures]);

	const primaryAxis = useMemo(
		(): AxisOptions<Datum> => ({
			getValue: (datum) => datum.timeAtReading,
			showGrid: true,

			invert: true,

			formatters: {
				scale: (date: Date) => format.asDateString(date, "short"),
				cursor: (date: Date) => format.asDateString(date, "long"),
				tooltip: (date: Date) => format.asDateString(date, "long"),
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

	return data == null ? null : <Chart options={{ dark: colorScheme === "dark", data, primaryAxis, secondaryAxes }} />;
}
