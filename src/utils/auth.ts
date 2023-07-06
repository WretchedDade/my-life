import { z } from "zod";

export const MyLifeAPIScope = `api://${import.meta.env.VITE_AAD_CLIENT_ID}/access_as_user`;

export const RolesSchema = z.array(z.string());

export interface IdTokenClaims {
	roles: string[];
}
