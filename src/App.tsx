import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";

import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./shared/components";

import { AuthContext, IdTokenClaims, RolesSchema, Scopes } from "./auth";
import { Authenticating, NotFound } from "./pages";
import { DemoPage } from "./pages/DemoPage";
import { useNavigationOptions } from "./shared/hooks";

export function App() {
	const { roles, setRoles } = useContext(AuthContext);
	const navigationOptions = useNavigationOptions();

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
		return <Authenticating />;
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

	if (import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE) {
		return <DemoPage />;
	}

	return (
		<AuthenticatedTemplate>
			<Routes>
				<Route path="/Redirect" element={<Navigate to={result?.state ?? "/"} />} />
				<Route path="/" element={<Layout />}>
					{navigationOptions.map((option) => (
						<Route path={option.href} element={option.element} />
					))}
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthenticatedTemplate>
	);
}
