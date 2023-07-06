import { useQuery } from "react-query";

import { useAccessToken } from "./useAccessToken";
import { BillConfiguration, BillConfigurationSchema } from "../types/billConfigurations";

export function useBillConfigurationQuery(id: string, enabled = true) {
	const accessToken = useAccessToken();

	return useQuery(["bill-configurations", id], ({ queryKey }) => GetUnpaidBills(queryKey[1], accessToken ?? ""), { enabled: enabled && accessToken != null });
}

async function GetUnpaidBills(id: string, accessToken: string): Promise<BillConfiguration> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Configuration/Bills/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return BillConfigurationSchema.parse(json);
}
