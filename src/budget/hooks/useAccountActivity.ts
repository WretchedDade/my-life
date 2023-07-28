import { useQuery } from "react-query";

import { AccountActivityPageSchema } from "..";
import { useAccessToken } from "../../auth";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/AccountActivity`;

interface useAccountActivityOptions {
	pageNumber?: number;
	pageSize?: number;

	year?: number;
	month?: number;

	category?: string;
}

export function useAccountActivity({ pageNumber, pageSize, year, month, category }: useAccountActivityOptions = {}) {
	const accessToken = useAccessToken();

	const filterByTime = year != null && month != null;

	const queryKey = ["account-activity", year, month, pageNumber, pageSize, category];

	const queryParameters = [];

	if (pageNumber != null) queryParameters.push(["pageNumber", `${pageNumber}`]);
	if (pageSize != null) queryParameters.push(["pageSize", `${pageSize}`]);
	if (category != null) queryParameters.push(["category", `${category}`]);

	const urlSearchParams = new URLSearchParams(queryParameters);

	const url = filterByTime ? `${baseUrl}/${year}/${month}?${urlSearchParams}` : `${baseUrl}?${urlSearchParams}`;

	return useQuery({
		enabled: accessToken != null,
		keepPreviousData: true,

		queryKey,

		async queryFn() {
			const response = await fetch(url, {
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
