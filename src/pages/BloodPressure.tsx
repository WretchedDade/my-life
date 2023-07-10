import { useCallback, useMemo, useState } from "react";
import { useBloodPressureReadings } from "../hooks/useBloodPressureReadings";

import classNames from "classnames";
import { Card } from "../components/Card";
import { CardTable, CardTableProps } from "../components/Card/CardTable";
import { useTailwindBreakpoint } from "../hooks/useTailwindBreakpoint";
import { BloodPressureReading } from "../types/BloodPressureReading";
import { asDateString } from "../utils/formatters";

const headings: CardTableProps<BloodPressureReading>["headings"] = [
	(props) => <th {...props}>Time of Reading</th>,
	(props) => <th {...props}>Blood Pressure</th>,
	(props) => (
		<th {...props} className={classNames(props.className, "hidden sm:table-cell")}>
			Heart Rate
		</th>
	),
	// (props) => <th {...props}></th>,
];

const getRowKey = (reading: BloodPressureReading) => reading.id;

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

	const { isAboveSm } = useTailwindBreakpoint("sm");

	const getRowValues = useCallback<CardTableProps<BloodPressureReading>["getRowValues"]>(
		(reading) => [
			(props) => (
				<td {...props}>
					<time dateTime={reading.timeAtReading.toDateString()} className="gap-x-2 sm:flex">
						{asDateString(reading.timeAtReading, "long", undefined)}
						<span className="block font-normal text-gray-500">
							{isAboveSm ? "as " : ""}
							{asDateString(reading.timeAtReading, undefined, "medium")}
						</span>
					</time>
				</td>
			),
			(props) => (
				<td {...props}>
					{reading.systolic}/{reading.diastolic}
				</td>
			),
			(props) => (
				<td {...props} className={classNames(props.className, "hidden sm:table-cell")}>
					{reading.heartRate}
				</td>
			),
			// (props) => (
			// 	<td {...props}>
			// 		<Button color="red" size={isAboveSm ? "md" : "xs"}>
			// 			Delete
			// 		</Button>
			// 	</td>
			// ),
		],
		[isAboveSm],
	);

	if (page === undefined) return <Card isLoading={isFetching} color="red" heading={{ title: "Blood Pressure Log" }} />;

	return (
		<CardTable
			color="red"
			isLoading={isFetching}
			heading={{ title: "Blood Pressure Log" }}
			page={page}
			pagination={pagination}
			headings={headings}
			getRowKey={getRowKey}
			getRowValues={getRowValues}
			// action={{ act: () => undefined, text: "Log Reading" }}
		/>
	);
}
