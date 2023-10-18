import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useAuth } from "../../auth";
import { BloodPressureReadingPageSchema } from "../BloodPressure.types";

export function useBloodPressureReadings(pageNumber = 0, pageSize = 25) {
	const { acquireToken } = useAuth();

	return useQuery({
		queryKey: ["blood-pressure-readings", pageNumber, pageSize] as const,

		placeholderData: keepPreviousData,

		queryFn: async ({ queryKey: [, pageNumber, pageSize] }) => {
			const accessToken = await acquireToken();

			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v2/BloodPressure?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();

			return BloodPressureReadingPageSchema.parse(json);
		},
	});
}
