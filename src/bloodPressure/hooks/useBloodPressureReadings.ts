import { useQuery } from "react-query";

import { useAccessToken } from "../../auth";
import { Page } from "../../shared/types";

import { BloodPressureReading, BloodPressureReadingPageSchema } from "..";

export function useBloodPressureReadings(pageNumber = 0, pageSize = 25) {
	const accessToken = useAccessToken();

	return useQuery({
		enabled: accessToken != null,
		keepPreviousData: true,

		queryKey: ["blood-pressure-readings", pageNumber, pageSize] as const,
		queryFn: ({ queryKey: [, pageNumber, pageSize] }) => GetBloodPressureReadings(pageNumber, pageSize, accessToken ?? ""),
	});
}

async function GetBloodPressureReadings(pageNumber: number, pageSize: number, accessToken: string): Promise<Page<BloodPressureReading>> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/BloodPressure?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const json = await response.json();

	return BloodPressureReadingPageSchema.parse(json);
}
