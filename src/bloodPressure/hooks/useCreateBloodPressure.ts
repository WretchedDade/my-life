import { IMsalContext, useMsal } from "@azure/msal-react";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";

import { Scopes, getAccessToken } from "../../auth";
import { useNotifier } from "../../shared/hooks";

import { BloodPressureReading, BloodPressureReadingSchema } from "..";

type Variables = Required<Omit<BloodPressureReading, "timeAtReading" | "id">>;

export function useCreateBloodPressure() {
	const msal = useMsal();
	const queryClient = useQueryClient();

	const notifier = useNotifier();

	return useMutation({
		mutationFn: ({ systolic, diastolic, heartRate }: Variables) => {
			return CreateBloodPressureReading(systolic, diastolic, heartRate, msal);
		},

		onSuccess: (newBloodPressureReading) => {
			if (newBloodPressureReading === undefined) return;

			notifier.success(`The reading of ${newBloodPressureReading.systolic}/${newBloodPressureReading.diastolic} was successfully logged`, {
				color: "red",
				title: "Reading Logged",
			});

			queryClient.setQueryData<BloodPressureReading[] | undefined>("blood-pressure-readings", (oldData) =>
				oldData !== undefined ? [newBloodPressureReading, ...oldData] : undefined,
			);

			queryClient.invalidateQueries("blood-pressure-readings");
		},
	});
}

async function CreateBloodPressureReading(
	systolic: number,
	diastolic: number,
	heartRate: number,
	msal: IMsalContext,
): Promise<BloodPressureReading | undefined> {
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
