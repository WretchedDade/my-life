import { Skeleton, Table } from "@mantine/core";

import { format } from "../../shared/utils";

import { BloodPressureReading } from "../BloodPressure.types";

export function BloodPressureTable(props: BloodPressureTableProps) {
	return (
		<Table.ScrollContainer minWidth={600} type="native">
			<Table striped highlightOnHover withTableBorder withColumnBorders horizontalSpacing="xl">
				<Table.Thead bg="blue">
					<Table.Tr>
						<Table.Th>#</Table.Th>
						<Table.Th>Reading (Sys/Dia)</Table.Th>
						<Table.Th>Heart Rate</Table.Th>
						<Table.Th>Time at Reading</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{isSkeleton(props)
						? Array.from({ length: 10 }).map((_, index) => (
								<Table.Tr key={index}>
									<Table.Td>
										<Skeleton>1</Skeleton>
									</Table.Td>
									<Table.Td>
										<Skeleton>120/80</Skeleton>
									</Table.Td>
									<Table.Td>
										<Skeleton>90</Skeleton>
									</Table.Td>
									<Table.Td>
										<Skeleton>Sep 22, 2023, 10:59 PM</Skeleton>
									</Table.Td>
								</Table.Tr>
						  ))
						: props.readings.map((reading, index) => (
								<Table.Tr key={reading.id}>
									<Table.Td>{index + 1}</Table.Td>
									<Table.Td>
										{reading.systolic} / {reading.diastolic}
									</Table.Td>
									<Table.Td>{reading.heartRate}</Table.Td>
									<Table.Td>{format.asDateString(reading.timeAtReading, "medium", "short")}</Table.Td>
								</Table.Tr>
						  ))}
				</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
}

type BloodPressureTableProps = { readings: Array<BloodPressureReading> } | SkeletonProps;
type SkeletonProps = { skeleton: true };

function isSkeleton(props: BloodPressureTableProps): props is SkeletonProps {
	return (props as SkeletonProps).skeleton === true;
}
