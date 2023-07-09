import { useMemo, useState } from "react";
import { useBloodPressureReadings } from "../hooks/useBloodPressureReadings";

import { Card } from "../components/Card";
import { CardTable, CardTableProps } from "../components/Card/CardTable";
import { BloodPressureReading } from "../types/BloodPressureReading";
import { asDateString } from "../utils/formatters";

const headings = ["Time of Reading", "Blood Pressure", "Heart Rate"];

const getRowKey = (reading: BloodPressureReading) => reading.id;

const getRowValues = (reading: BloodPressureReading): React.ReactNode[] => [
	<time dateTime={reading.timeAtReading.toDateString()}>
		{asDateString(reading.timeAtReading, "full", undefined)}
		<span className="ml-1 font-normal text-gray-700">at {asDateString(reading.timeAtReading, undefined, "long")}</span>
	</time>,
	`${reading.systolic}/${reading.diastolic}`,
	reading.heartRate,
];

export function BloodPressure() {
	const [pageSize, setPageSize] = useState(5);
	const [pageNumber, setPageNumber] = useState(0);

	const { data: page, isFetching } = useBloodPressureReadings(pageNumber, pageSize);

	const pagination = useMemo<CardTableProps<BloodPressureReading>["pagination"]>(
		() => ({
			onNext: () => setPageNumber(pageNumber + 1),
			onPrevious: () => setPageNumber(pageNumber - 1),
			pageSizeSelect: {
				onPageSizeChange: (newPageSize) => {
					console.log(newPageSize);
					return setPageSize(newPageSize);
				},
				defaultPageSize: pageSize,
			},
		}),
		[setPageNumber, pageNumber, setPageSize, pageSize],
	);

	if (page === undefined) return <Card isLoading={isFetching} color="red" title="Blood Pressure Log" />;

	return (
		<CardTable
			isLoading={isFetching}
			color="red"
			title="Blood Pressure Log"
			page={page}
			pagination={pagination}
			headings={headings}
			getRowKey={getRowKey}
			getRowValues={getRowValues}
			// action={{ act: () => undefined, text: "Log Reading" }}
		/>
	);
}
