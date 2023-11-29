import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../auth";
import { useBills } from "./useBills";

import { BillPaymentSchema, type BillPayment } from "../Bills.types";

export function usePayBillMutation() {
	const { acquireToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const accessToken = await acquireToken();
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bills/${id}/pay`, {
				method: "POST",
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			const json = await response.json();
			return BillPaymentSchema.parse(json);
		},

		onSuccess: (bill, id) => {
			queryClient.setQueryData<BillPayment[] | undefined>(["bills", "unpaid"], (oldData) => {
				if (oldData === undefined) return;

				return [...oldData].filter((bill) => bill.id !== id);
			});

			queryClient.invalidateQueries({ queryKey: useBills.generateQueryKey() });

			notifications.show({
				color: "green",
				withBorder: true,
				withCloseButton: false,
				icon: <IconCircleCheckFilled />,

				title: "Bill Paid!",
				message: `Marked ${bill.name.split(" - ")[0].trim()} as paid`,
			});
		},
	});
}
