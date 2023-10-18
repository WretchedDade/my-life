import { useQuery } from "@tanstack/react-query";
import z from "zod";

import { useAuth } from "../../../auth";

export function useProfile() {
	const { acquireToken, isAuthenticated } = useAuth();

	return useQuery({
		enabled: isAuthenticated,
		queryKey: ["profile"],

		queryFn: async () => {
			const accessToken = await acquireToken();

			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v2/Profile`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const json = await response.json();

			return ProfileSchema.parse(json);
		},
	});
}

const ProfileSchema = z.object({
	businessPhones: z.array(z.string()),
	displayName: z.string(),
	givenName: z.string(),
	surname: z.string(),
	userPrincipalName: z.string(),
	id: z.string().uuid(),
});
