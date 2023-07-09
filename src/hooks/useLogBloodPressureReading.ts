import { IMsalContext, useMsal } from "@azure/msal-react";
import { useMutation, useQueryClient } from "react-query";

import dayjs from "dayjs";
import { BloodPressureReading, BloodPressureReadingSchema } from "../types/BloodPressureReading";
import { Scopes } from "../utils/auth";
import { getAccessToken } from "./useAccessToken";

type Variables = Required<Omit<BloodPressureReading, "timeAtReading" | "id">>;

export function useLogBloodPressureReading() {
	const msal = useMsal();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ systolic, diastolic, heartRate }: Variables) => {
			return LogBloodPressureReading(systolic, diastolic, heartRate, msal);
		},

		onSuccess: (newBloodPressureReading) => {
			queryClient.setQueryData<BloodPressureReading[] | undefined>("blood-pressure-readings", (oldData) => {
				if (oldData === undefined || newBloodPressureReading === undefined) return;

				return [newBloodPressureReading, ...oldData];
			});

			queryClient.invalidateQueries("blood-pressure-readings");
		},
	});
}

async function LogBloodPressureReading(systolic: number, diastolic: number, heartRate: number, msal: IMsalContext): Promise<BloodPressureReading | undefined> {
	if (msal.accounts.length > 0) {
		const accessToken = await getAccessToken(msal, { scopes: Scopes, account: msal.accounts[0] });

		if (accessToken) {
			const bloodPressureReading: Omit<BloodPressureReading, "id"> = {
				systolic,
				diastolic,
				heartRate,
				timeAtReading: dayjs().utc().toDate(),
			};

			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/BloodPressure`, {
				method: "POST",
				headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
				body: JSON.stringify(bloodPressureReading, null, 4),
			});

			const json = await response.json();

			return BloodPressureReadingSchema.parse(json);
		}
	}
}
