import { PropsWithChildren, createContext, useState } from "react";

interface AuthContext {
	accessToken: string | null;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;

	roles: string[];
	setRoles: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AuthContext = createContext<AuthContext>({
	accessToken: null,
	setAccessToken: () => undefined,

	roles: [],
	setRoles: () => undefined,
});

export function AuthContextProvider({ children }: PropsWithChildren<object>) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [roles, setRoles] = useState<string[]>([]);

	return <AuthContext.Provider value={{ accessToken, setAccessToken, roles, setRoles }}>{children}</AuthContext.Provider>;
}
