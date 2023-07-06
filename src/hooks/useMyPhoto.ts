import { useQuery } from "react-query";

import { useAccessToken } from "./useAccessToken";

export function useMyPhoto() {
	const accessToken = useAccessToken();

	return useQuery(["my-photo"], () => GetMyPhoto(accessToken ?? ""), { enabled: accessToken != null });
}

async function GetMyPhoto(accessToken: string) {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Profile/Me/Photo`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const blob = await response.blob();

	return URL.createObjectURL(blob);
}
