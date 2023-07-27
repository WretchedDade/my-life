import { useQuery } from "react-query";

import { AccountActivityPageSchema } from "..";
import { useAccessToken } from "../../auth";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/AccountActivity`;

interface useAccountActivityOptions {
	pageNumber?: number;
	pageSize?: number;

	year?: number;
	month?: number;
}

export function useAccountActivity({ pageNumber = 0, pageSize = 30, year, month }: useAccountActivityOptions = {}) {
	const accessToken = useAccessToken();

	const filterByTime = year != null && month != null;

	const queryKey = filterByTime ? ["account-activity", year, month, pageNumber, pageSize] : ["account-activity", undefined, undefined, pageNumber, pageSize];
	const url = filterByTime ? `${baseUrl}/${year}/${month}` : baseUrl;

	return useQuery({
		enabled: accessToken != null,
		keepPreviousData: true,

		queryKey,

		async queryFn({ queryKey: [, , , pageNumber, pageSize] }) {
			const response = await fetch(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();

			return AccountActivityPageSchema.parse(json);
		},
	});
}
