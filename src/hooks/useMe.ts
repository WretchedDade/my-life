import { useQuery } from "react-query";

import { Me, MeSchema } from "../utils/auth";
import { useAccessToken } from "./useAccessToken";

export function useMe() {
	const accessToken = useAccessToken();

	return useQuery(["me"], () => GetMe(accessToken ?? ""), { enabled: accessToken != null });
}

async function GetMe(accessToken: string): Promise<Me> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Profile/Me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const json = await response.json();

	return MeSchema.parse(json);
}
