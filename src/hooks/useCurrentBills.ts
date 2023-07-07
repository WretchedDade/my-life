import { z } from "zod";
import { useQuery } from "react-query";

import { useAccessToken } from "./useAccessToken";
import { BillPayment, BillPaymentSchema } from "../types/bills";

export function useCurrentBills() {
	const accessToken = useAccessToken();

	return useQuery(["bills", "current"], () => GetCurrentBills(accessToken ?? ""), { enabled: accessToken != null });
}

async function GetCurrentBills(accessToken: string): Promise<BillPayment[]> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Bills/Current`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return z.array(BillPaymentSchema).parse(json);
}
