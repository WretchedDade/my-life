import { useQuery } from "react-query";
import { z } from "zod";

import { BillFilter, BillPayment, BillPaymentSchema } from "..";
import { useAccessToken } from "../../auth";

export function useBills(filter: BillFilter) {
	const accessToken = useAccessToken();

	return useQuery({
		queryKey: ["bills", filter] as const,
		queryFn: ({ queryKey: [, filter] }) => GetBills(filter, accessToken ?? ""),
		enabled: accessToken != null,
	});
}

async function GetBills(filter: BillFilter, accessToken: string): Promise<BillPayment[]> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Bills/${filter}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return z.array(BillPaymentSchema).parse(json);
}
