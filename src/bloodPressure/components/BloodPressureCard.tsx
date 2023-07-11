import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { BloodPressureReading, useBloodPressureReadings } from "..";
import { CardTable, CardTableProps } from "../../shared/components";
import { useTailwindBreakpoint } from "../../shared/hooks";
import { Format } from "../../shared/utils";

interface BloodPressureCardProps {
	className?: string;
	defaultPageSize?: number;
}

export function BloodPressureCard({ defaultPageSize = 10, className }: BloodPressureCardProps) {
	const [pageSize, setPageSize] = useState(defaultPageSize);
	const [pageNumber, setPageNumber] = useState(0);

	const { data: page, isLoading, isFetching } = useBloodPressureReadings(pageNumber, pageSize);

	const pagination = useMemo<CardTableProps<BloodPressureReading>["pagination"]>(() => {
		const pageSizes = Array.from(new Set([defaultPageSize, ...CardTable.DefaultPageSizes]));

		return {
			onNext: () => setPageNumber(pageNumber + 1),
			onPrevious: () => setPageNumber(pageNumber - 1),
			pageSizeSelect: {
				pageSize,
				pageSizes,
				onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
			},
		};
	}, [defaultPageSize, pageNumber, pageSize]);

	const { isAboveSm } = useTailwindBreakpoint("sm");

	const getRowValues = useCallback<CardTableProps<BloodPressureReading>["getRowValues"]>(
		(reading) => [
			(props) => (
				<td {...props}>
					<time dateTime={reading.timeAtReading.toDateString()} className="gap-x-2 sm:flex">
						{Format.asDateString(reading.timeAtReading, "long", undefined)}
						<span className="block font-normal text-gray-500">
							{isAboveSm ? "as " : ""}
							{Format.asDateString(reading.timeAtReading, undefined, "medium")}
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

	// if (page === undefined) return <Card isLoading={isFetching} color="red" heading={{ title: "Blood Pressure Log" }} />;

	return (
		<CardTable
			color="red"
			isRefreshing={isFetching && !isLoading}
			isLoading={isLoading}
			heading={{ title: "Blood Pressure Log" }}
			page={page}
			pagination={pagination}
			headings={headings}
			getRowKey={getRowKey}
			getRowValues={getRowValues}
			className={className}
			// action={{ act: () => undefined, text: "Log Reading" }}
		/>
	);
}

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
