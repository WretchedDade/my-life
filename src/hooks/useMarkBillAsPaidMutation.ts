import { useMutation, useQueryClient } from "react-query";
import { IMsalContext, useMsal } from "@azure/msal-react";

import { MyLifeAPIScope } from "../utils/auth";
import { getAccessToken } from "./useAccessToken";
import { BillPayment, BillPaymentSchema } from "../types/bills";

export function useMarkBillAsPaidMutation() {
	const msal = useMsal();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => MarkBillAsPaid(id, msal),
		onSuccess: () => {
			queryClient.invalidateQueries("bills");
		},
	});
}

async function MarkBillAsPaid(id: string, msal: IMsalContext): Promise<BillPayment | undefined> {
	if (msal.accounts.length > 0) {
		const accessToken = await getAccessToken(msal, { scopes: [MyLifeAPIScope], account: msal.accounts[0] });

		if (accessToken) {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bills/${id}/pay`, {
				method: "POST",
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			const json = await response.json();

			const billPayment = BillPaymentSchema.parse(json);
			return billPayment;
		}
	}
}
