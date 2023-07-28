import { useQuery } from "react-query";

import { AccountActivityHistorySchema } from "..";
import { useAccessToken } from "../../auth";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/AccountActivity`;

interface useAccountActivityHistoryOptions {
	type?: "ByMonth";
}

export function useAccountActivityHistory({ type = "ByMonth" }: useAccountActivityHistoryOptions = {}) {
	const accessToken = useAccessToken();

	const queryKey = ["account-activity", "history", type];

	return useQuery({
		enabled: accessToken != null,
		keepPreviousData: true,

		queryKey,

		async queryFn() {
			const response = await fetch(`${baseUrl}/History/${type}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();

			return AccountActivityHistorySchema.parse(json);
		},
	});
}
