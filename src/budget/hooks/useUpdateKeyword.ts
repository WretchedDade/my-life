import { useMutation, useQueryClient } from "react-query";

import { useAccessToken } from "../../auth";

import { Keyword, KeywordSchema } from "..";
import { useNotifier } from "../../shared/hooks";

export function useUpdateKeyword(onSuccess?: () => void) {
	const notifier = useNotifier();
	const queryClient = useQueryClient();
	const accessToken = useAccessToken();

	return useMutation({
		async mutationFn(keyword: Omit<Keyword, "lastModifiedOn">) {
			if (accessToken) {
				const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/AccountActivity/Config/Keywords/${keyword.keyword}`, {
					method: "PUT",
					headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
					body: JSON.stringify(keyword, null, 4),
				});

				if (!response.ok) throw new Error(await response.text());

				const json = await response.json();

				return KeywordSchema.parse(json);
			}
		},

		onSuccess: (keyword) => {
			if (keyword === undefined) return;

			onSuccess?.();

			notifier.success(`The ${keyword.name} keyword was successfully updated`, {
				color: "green",
				title: "Keyword Updated",
			});

			queryClient.invalidateQueries("keywords");
		},

		onError(error, keyword) {
			console.log(error);

			notifier.error(`The ${keyword.name} keyword could not be created`, {
				color: "red",
				title: "Creation Failed",
			});
		},
	});
}
