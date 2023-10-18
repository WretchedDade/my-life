import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../auth";
import { BloodPressureReading } from "../BloodPressure.types";

interface NewBloodPressureReading {
	systolic: string;
	diastolic: string;
	heartRate: string;
}

export function useBloodPressureReadingMutation(onSuccess?: () => void) {
	const { acquireToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ systolic, diastolic, heartRate }: NewBloodPressureReading) => {
			const token = await acquireToken();

			return fetch(`${import.meta.env.VITE_API_BASE_URL}/v2/BloodPressure`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					systolic: Number(systolic),
					diastolic: Number(diastolic),
					heartRate: Number(heartRate),
					timeAtReading: new Date().toISOString(),
				}),
			});
		},

		onMutate: ({ systolic, diastolic, heartRate }: NewBloodPressureReading) => {
			queryClient.setQueryData(["blood-pressure-readings"], (readings: Array<BloodPressureReading> | undefined) => {
				return [{ systolic, diastolic, heartRate }, ...(readings ?? [])];
			});
		},

		onSuccess: () => {
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: ["blood-pressure-readings"] });
		},
	});
}
