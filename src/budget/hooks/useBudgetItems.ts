import { useQuery } from "react-query";
import { z } from "zod";

import { useAccessToken } from "../../auth";

import { BudgetItem, BudgetItemSchema } from "..";

export function useBudgetItems() {
	const accessToken = useAccessToken();

	return useQuery({
		queryKey: ["budget-items"],
		enabled: accessToken != null,

		queryFn() {
			return GetBudgetItems(accessToken ?? "");
		},

		select(data: BudgetItem[]) {
			let runningTotal = 0;

			const items = data
				.map((item) => (item.isIncome && item.day == null ? { ...item, day: 1 } : item))
				.sort((item) => (item.isIncome ? -1 : 1))
				.sort((itemA, itemB) => (itemA.day ?? 100) - (itemB.day ?? 100))
				.map((item) => {
					runningTotal += item.isIncome ? item.amount : -item.amount;
					return { ...item, runningTotal };
				});

			return {
				items,
				remainingBalance: items?.[items.length - 1]?.runningTotal ?? 0,
				totalIncome: items?.filter((item) => item.isIncome).reduce((total, item) => total + item.amount, 0) ?? 0,
				totalExpenses: items?.filter((item) => !item.isIncome).reduce((total, item) => total + item.amount, 0) ?? 0,
			};
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
