import { useState } from "react";

import { IconPencilPlus } from "@tabler/icons-react";

import { Box, Button, Divider, Flex, Loader, NumberInput, Pagination, Paper, Title, em } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { BloodPressureGrid } from "./BloodPressureGrid";

import { BloodPressureChart } from "./BloodPressureChart";
import { useBloodPressureReadingMutation } from "./hooks/useBloodPressureReadingMutation";
import { useBloodPressureReadings } from "./hooks/useBloodPressureReadings";

export function BloodPressure() {
	const [page, setPage] = useState(1);

	const isMobile = useMediaQuery(`(max-width: ${em(560)})`);

	const numPerPage = isMobile ? 3 : 9;

	const bloodPressureReadings = useBloodPressureReadings(page - 1, numPerPage);

	const form = useForm({
		initialValues: {
			systolic: "",
			diastolic: "",
			heartRate: "",
		},

		validate: {
			systolic: (value) => Number(value) <= 0 && "Systolic must be greater than 0",
			diastolic: (value) => Number(value) <= 0 && "Diastolic must be greater than 0",
			heartRate: (value) => Number(value) <= 0 && "Heart rate must be greater than 0",
		},
	});

	const mutation = useBloodPressureReadingMutation(form.reset);

	return (
		<div>
			<form onSubmit={form.onSubmit((values) => mutation.mutateAsync(values))}>
				<Title order={2} my="md" size="h3">
					Log a Reading
				</Title>
				<Flex direction={isMobile ? "column" : "row"} align={isMobile ? "stretch" : "end"} gap="md">
					<NumberInput
						label="Systolic"
						placeholder="120"
						disabled={mutation.isPending}
						hideControls
						withAsterisk
						{...form.getInputProps("systolic")}
					/>

					<NumberInput
						label="Diastolic"
						placeholder="80"
						disabled={mutation.isPending}
						hideControls
						withAsterisk
						{...form.getInputProps("diastolic")}
					/>

					<NumberInput
						label="Heart Rate"
						placeholder="90"
						disabled={mutation.isPending}
						hideControls
						withAsterisk
						{...form.getInputProps("heartRate")}
					/>

					<Button type="submit" variant="light" color="blue" rightSection={mutation.isPending ? <Loader size={14} /> : <IconPencilPlus size={14} />}>
						{mutation.isPending ? "Logging Reading" : "Log Reading"}
					</Button>
				</Flex>
			</form>
			<Divider my="xl" />
			<Paper p="lg">
				<Title order={2} mb="xs" size="h3" fw="500">
					Progress
				</Title>
				<Divider mb="lg" />
				<Box h="24rem">
					<BloodPressureChart />
				</Box>
			</Paper>
			<Divider my="xl" />

			<Flex align="center" direction={isMobile ? "column" : "row"} justify={isMobile ? "center" : "space-between"} my="md" gap="md">
				<Title order={2} mb="xs" size="h3" fw="500">
					Blood Pressure Log
				</Title>
				{bloodPressureReadings.isSuccess && <Pagination boundaries={0} value={page} onChange={setPage} total={bloodPressureReadings.data.totalPages} />}
			</Flex>
			{bloodPressureReadings.isLoading && <BloodPressureGrid skeleton numberOfSkeletons={numPerPage} />}
			{bloodPressureReadings.isSuccess && (
				<>
					<BloodPressureGrid readings={bloodPressureReadings.data.items} />
				</>
			)}
		</div>
	);
}
