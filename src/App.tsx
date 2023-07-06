import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { InteractionType, InteractionStatus } from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";

import { Home } from "./pages/Home";
import { Bills } from "./pages/Bills";
import { SidebarLayout } from "./components/SidebarLayout";

import { AuthContext } from "./contexts/AuthContext";
import { IdTokenClaims, RolesSchema, Scopes } from "./utils/auth";
import { NotFound } from "./pages/NotFound";

export function App() {
	const { roles, setRoles } = useContext(AuthContext);

	const context = useMsal();
	const { result, error } = useMsalAuthentication(InteractionType.Redirect, {
		scopes: Scopes,
		redirectUri: `${window.location.origin}/Redirect`,
		state: window.location.pathname,
	});

	useEffect(() => {
		if (roles.length == 0) {
			if (result) {
				setRoles(RolesSchema.parse((result.idTokenClaims as IdTokenClaims)["roles"] ?? []));
			} else if (context.accounts.length > 0 && context.accounts[0].idTokenClaims) {
				setRoles(RolesSchema.parse((context.accounts[0].idTokenClaims as IdTokenClaims)["roles"] ?? []));
			}
		}
	}, [roles, result, setRoles, context.accounts]);

	if (context.inProgress !== InteractionStatus.None) {
		return <p>Authentication in progress: {context.inProgress}</p>;
	}

	if (error) {
		return (
			<div>
				<p>Authentication Error:</p>
				<pre>
					<code>{JSON.stringify({ error, result }, null, 4)}</code>
				</pre>
			</div>
		);
	}

	if (!roles.includes("Access")) return <div>Access Denied</div>;

	return (
		<AuthenticatedTemplate>
			<Routes>
				<Route path="/Redirect" element={<Navigate to={result?.state ?? "/"} />} />
				<Route path="/" element={<SidebarLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/bills" element={<Bills />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthenticatedTemplate>
	);
}
