import { useQuery } from "react-query";
import { z } from "zod";

import { BillPayment, BillPaymentSchema } from "../types/bills";
import { useAccessToken } from "./useAccessToken";

export function useUnpaidBillsQuery() {
	const accessToken = useAccessToken();

	return useQuery({ queryKey: ["bills", "unpaid"], queryFn: () => GetUnpaidBills(accessToken ?? ""), enabled: accessToken != null, keepPreviousData: true });
}

async function GetUnpaidBills(accessToken: string): Promise<BillPayment[]> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bills?unpaidOnly=true`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return z.array(BillPaymentSchema).parse(json);
}
