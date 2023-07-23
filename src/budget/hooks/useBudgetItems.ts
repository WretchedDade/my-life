import { useQuery } from "react-query";
import { z } from "zod";

import { useAccessToken } from "../../auth";

import { BudgetItem, BudgetItemSchema, BudgetItemWithRunningTotal } from "..";

export function useBudgetItems() {
	const accessToken = useAccessToken();

	return useQuery({
		queryKey: ["budget-items"],
		enabled: accessToken != null,

		queryFn() {
			return GetBudgetItems(accessToken ?? "");
		},

		select(data: BudgetItem[]): BudgetItemWithRunningTotal[] {
			let runningTotal = 0;

			return data
				.map((item) => (item.isIncome && item.day == null ? { ...item, day: 1 } : item))
				.sort((item) => (item.isIncome ? -1 : 1))
				.sort((itemA, itemB) => (itemA.day ?? 100) - (itemB.day ?? 100))
				.map((item) => {
					runningTotal += item.isIncome ? item.amount : -item.amount;
					return { ...item, runningTotal };
				});
		},
	});
}

async function GetBudgetItems(accessToken: string): Promise<BudgetItem[]> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Budget`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return z.array(BudgetItemSchema).parse(json);
}
