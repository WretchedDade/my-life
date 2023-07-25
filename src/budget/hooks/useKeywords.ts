import { useQuery } from "react-query";

import { useAccessToken } from "../../auth";

import { KeywordPageSchema } from "..";

export function useKeywords(pageNumber = 0, pageSize = 25) {
	const accessToken = useAccessToken();

	return useQuery({
		enabled: accessToken != null,
		keepPreviousData: true,

		queryKey: ["keywords", pageNumber, pageSize] as const,

		async queryFn({ queryKey: [, pageNumber, pageSize] }) {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/AccountActivity/Config/Keywords?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();

			return KeywordPageSchema.parse(json);
		},
	});
}
