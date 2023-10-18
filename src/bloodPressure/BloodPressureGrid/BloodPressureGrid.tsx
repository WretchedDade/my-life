import { Group, Paper, SimpleGrid, SimpleGridProps, Skeleton, Text, ThemeIcon } from "@mantine/core";
import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons-react";

import { format } from "../../shared/utils";
import { BloodPressureReading } from "../BloodPressure.types";

import classes from "./BloodPressureGird.module.css";

export function BloodPressureGrid(props: BloodPressureGridProps) {
	const readings = isSkeleton(props) ? [] : addDiffToReadings(props.readings);

	const cols: SimpleGridProps["cols"] = { base: 1, xs: 2, lg: 4 };

	if (isSkeleton(props))
		return (
			<SimpleGrid cols={cols}>
				{Array.from({ length: props.numberOfSkeletons }).map((_, index) => (
					<Paper key={index} withBorder p="md" radius="sm">
						<Group justify="space-between" mb={25}>
							<Skeleton>OCTOBER 17, 2023 AT 8:24 PM</Skeleton>
						</Group>

						<Group align="stretch" gap="xs">
							<Skeleton w="auto">120/80</Skeleton>
							<Skeleton w="30px">
								<ThemeIcon variant="light">
									<IconArrowDownLeft />
								</ThemeIcon>
							</Skeleton>
						</Group>

						<Skeleton mt="lg">Decrease 7/1 from 142/86</Skeleton>
					</Paper>
				))}
			</SimpleGrid>
		);

	return (
		<SimpleGrid cols={cols}>
			{readings.slice(0, readings.length - 1).map((reading) => {
				const isPositiveChange = reading.hasPreviousReading && reading.systolicDiff > 0 && reading.diastolicDiff > 0;

				const DiffIcon = isPositiveChange ? IconArrowDownLeft : IconArrowUpRight;

				return (
					<Paper shadow="xl" p="md" radius="sm" key={reading.id}>
						<Group justify="space-between" mb={25}>
							<Text size="xs" c="blue.4" className={classes.title}>
								{format.asDateString(reading.timeAtReading, "medium", "short")}
							</Text>
						</Group>

						<Group align="flex-start" gap="xs" mb="lg">
							<Text className={classes.value}>
								{reading.systolic}/{reading.diastolic}
							</Text>
							{reading.hasPreviousReading && (
								<ThemeIcon variant="light" color={isPositiveChange ? "teal.9" : "red.9"}>
									<DiffIcon />
								</ThemeIcon>
							)}
						</Group>

						{reading.hasPreviousReading && (
							<Text fz="xs" c="dimmed">
								{isPositiveChange ? "Decrease" : "Increase"} of {Math.abs(reading.systolicDiff)}/{Math.abs(reading.diastolicDiff)} from{" "}
								{reading.previousSystolic}/{reading.previousDiastolic}
							</Text>
						)}
					</Paper>
				);
			})}
		</SimpleGrid>
	);
}

type BloodPressureGridProps = { readings: Array<BloodPressureReading> } | SkeletonProps;
type SkeletonProps = { skeleton: true; numberOfSkeletons: number };

function isSkeleton(props: BloodPressureGridProps): props is SkeletonProps {
	return (props as SkeletonProps).skeleton === true;
}

function addDiffToReadings(readings: Array<BloodPressureReading>) {
	return readings.map((reading, index) => {
		const hasPreviousReading = readings.length > 1 && index !== readings.length - 1;

		if (!hasPreviousReading) return { ...reading, hasPreviousReading };

		const previousReading = readings[index + 1];

		const previousSystolic = previousReading.systolic;
		const previousDiastolic = previousReading.diastolic;

		const systolicDiff = previousSystolic - reading.systolic;
		const diastolicDiff = previousDiastolic - reading.diastolic;

		return { ...reading, hasPreviousReading, systolicDiff, diastolicDiff, previousSystolic, previousDiastolic };
	});
}
