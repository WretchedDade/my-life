import { z } from "zod";

export const RolesSchema = z.array(z.string());

export interface IdTokenClaims {
	roles: string[];
}

export const MeSchema = z.object({
	businessPhones: z.array(z.string()),
	displayName: z.string(),
	givenName: z.string(),
	surname: z.string(),
	userPrincipalName: z.string(),
	id: z.string().uuid(),
});

export type Me = z.infer<typeof MeSchema>;

export const Scopes = [`api://${import.meta.env.VITE_AAD_CLIENT_ID}/access_as_user`];
