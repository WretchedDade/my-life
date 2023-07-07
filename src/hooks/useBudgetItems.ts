import { z } from "zod";
import { useQuery } from "react-query";

import { useAccessToken } from "./useAccessToken";
import { BudgetItem, BudgetItemSchema } from "../types/budget";

export function useBudgetItems() {
	const accessToken = useAccessToken();

	return useQuery(["budget-items"], () => GetBudgetItems(accessToken ?? ""), { enabled: accessToken != null });
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
