import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState } from "react";

import { AddBloodPressureSlideOver, BloodPressureReading, useBloodPressureReadings } from "..";

import { Button, CardTable, CardTableProps } from "../../shared/components";
import { useTailwindBreakpoint } from "../../shared/hooks";
import { Format, classNames } from "../../shared/utils";

interface BloodPressureTableCardProps {
	className?: string;
	defaultPageSize?: number;
}

export function BloodPressureTableCard({ defaultPageSize = 10, className }: BloodPressureTableCardProps) {
	const [addModalOpen, setAddModalOpen] = useState(false);

	const [pageSize, setPageSize] = useState(defaultPageSize);
	const [pageNumber, setPageNumber] = useState(0);

	const { data: page, isLoading, isFetching } = useBloodPressureReadings(pageNumber, pageSize);

	const pagination = useMemo<CardTableProps<BloodPressureReading>["pagination"]>(() => {
		const pageSizes = Array.from(new Set([defaultPageSize, ...CardTable.DefaultPageSizes]));

		return {
			onNext: () => setPageNumber(pageNumber + 1),
			onPrevious: () => setPageNumber(pageNumber - 1),
			sizeSelectOptions: {
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
			(props) => (
				<td {...props} className={classNames(props.className, { "flex items-center justify-end": isAboveSm })}>
					<Button color="red" size={isAboveSm ? "sm" : "xs"}>
						<FontAwesomeIcon icon={faTrashCan} /> Delete
					</Button>
				</td>
			),
		],
		[isAboveSm],
	);

	return (
		<>
			<CardTable
				color="red"
				isRefreshing={isFetching && !isLoading}
				isLoading={isLoading}
				heading={{ title: "Blood Pressure Log", action: { onClick: () => setAddModalOpen(true), text: "Add New" } }}
				page={page}
				pagination={pagination}
				headings={headings}
				getRowKey={getRowKey}
				getRowValues={getRowValues}
				className={className}
			/>
			<AddBloodPressureSlideOver open={addModalOpen} onClose={() => setAddModalOpen(false)} />
		</>
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
	(props) => <th {...props}></th>,
];

const getRowKey = (reading: BloodPressureReading) => reading.id;
