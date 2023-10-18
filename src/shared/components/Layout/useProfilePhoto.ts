import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../../auth";

export function useProfilePhoto() {
	const { acquireToken, isAuthenticated } = useAuth();

	return useQuery({
		enabled: isAuthenticated,
		queryKey: ["profile-photo"],

		queryFn: async () => {
			const accessToken = await acquireToken();

			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v2/Profile/Photo`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const blob = await response.blob();

			return URL.createObjectURL(blob);
		},
	});
}
