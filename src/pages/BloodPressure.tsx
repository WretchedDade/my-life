import { useState } from "react";
import { useBloodPressureReadings } from "../hooks/useBloodPressureReadings";

import { CardTable } from "../components/Card/CardTable";
import { BloodPressureReading } from "../types/BloodPressureReading";
import { asFullDate } from "../utils/formatters";

function getRowValues(reading: BloodPressureReading): React.ReactNode[] {
	return [
		<time dateTime={reading.timeAtReading.toDateString()}>{asFullDate(reading.timeAtReading)}</time>,
		`${reading.systolic}/${reading.diastolic}`,
		reading.heartRate,
	];
}

export function BloodPressure() {
	const [pageSize, setPageSize] = useState(10);
	const [pageNumber, setPageNumber] = useState(0);

	const { data: page } = useBloodPressureReadings(pageNumber, pageSize);

	if (page === undefined) return null; // TODO: Loading state

	return (
		<CardTable
			color="red"
			title="Blood Pressure Log"
			page={page}
			pagination={{ onNext: () => setPageNumber(pageNumber + 1), onPrevious: () => setPageNumber(pageNumber - 1) }}
			headings={["Time of Reading", "Blood Pressure", "Heart Rate"]}
			getRowKey={(reading) => reading.id}
			getRowValues={getRowValues}
			// action={{ act: () => undefined, text: "Log Reading" }}
		/>
	);
}
