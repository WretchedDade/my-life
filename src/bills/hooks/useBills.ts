import { z } from "zod";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../auth";
import { BillFilter, BillPaymentSchema } from "../Bills.types";

export function useBills(filter: BillFilter) {
	const { acquireToken } = useAuth();

	return useQuery({
		queryKey: ["bills", filter] as const,

		queryFn: async ({ queryKey: [, filter] }) => {
			const accessToken = await acquireToken();

			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Bills/${filter}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const json = await response.json();

			return z.array(BillPaymentSchema).parse(json);
		},
	});
}
