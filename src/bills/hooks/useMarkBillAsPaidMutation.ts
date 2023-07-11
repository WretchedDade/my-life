import { IMsalContext, useMsal } from "@azure/msal-react";
import { useMutation, useQueryClient } from "react-query";

import { ColorWaysKey } from "../../ColorWays";
import { Scopes, getAccessToken } from "../../auth";
import { useNotifier } from "../../shared/hooks";

import { BillPayment, BillPaymentSchema } from "..";

export function useMarkBillAsPaidMutation(color: ColorWaysKey) {
	const msal = useMsal();
	const queryClient = useQueryClient();

	const notifier = useNotifier();

	return useMutation({
		mutationFn: (id: string) => MarkBillAsPaid(id, msal),
		onSuccess: (_, id) => {
			notifier.success("Bill marked as paid", { title: "Success!", color });

			queryClient.setQueryData<BillPayment[] | undefined>(["bills", "unpaid"], (oldData) => {
				if (oldData === undefined) return;

				return [...oldData].filter((bill) => bill.id !== id);
			});

			queryClient.invalidateQueries("bills");
		},
	});
}

async function MarkBillAsPaid(id: string, msal: IMsalContext): Promise<BillPayment | undefined> {
	if (msal.accounts.length > 0) {
		const accessToken = await getAccessToken(msal, { scopes: Scopes, account: msal.accounts[0] });

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
