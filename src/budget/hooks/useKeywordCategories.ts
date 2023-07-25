import { useQuery } from "react-query";

import { useAccessToken } from "../../auth";

import { z } from "zod";

export function useKeywordCategories() {
	const accessToken = useAccessToken();

	return useQuery({
		enabled: accessToken != null,
		keepPreviousData: true,

		queryKey: ["keyword-categories"],

		async queryFn() {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/AccountActivity/Config/Keywords/Categories`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();

			return z.array(z.string().nonempty()).parse(json);
		},
	});
}
