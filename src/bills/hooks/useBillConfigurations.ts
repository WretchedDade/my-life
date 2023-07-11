import { useQuery } from "react-query";
import { z } from "zod";

import { BillConfiguration, BillConfigurationSchema } from "..";
import { useAccessToken } from "../../auth";

export function useBillConfigurationsQuery() {
	const accessToken = useAccessToken();

	return useQuery(["bill-configurations"], () => GetUnpaidBills(accessToken ?? ""), { enabled: accessToken != null });
}

async function GetUnpaidBills(accessToken: string): Promise<BillConfiguration[]> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Configuration/Bills`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return z.array(BillConfigurationSchema).parse(json);
}