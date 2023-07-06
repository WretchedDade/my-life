import { z } from "zod";
import { useQuery } from "react-query";

import { BillPayment, BillPaymentSchema } from "../types/bills";
import { useAccessToken } from "./useAccessToken";
import { MyLifeAPIScope } from "../utils/auth";

export function useUnpaidBillsQuery() {
	const accessToken = useAccessToken([MyLifeAPIScope]);

	return useQuery(["bills", "unpaid"], () => GetUnpaidBills(accessToken ?? ""), { enabled: accessToken != null });
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
