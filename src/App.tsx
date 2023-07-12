import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";

import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./shared/components";

import { AuthContext, IdTokenClaims, RolesSchema, Scopes } from "./auth";
import { Authenticating, BloodPressure, Home, NotFound, UnpaidBills } from "./pages";
import { DemoPage } from "./pages/DemoPage";

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
					<Route path="/" element={<Home />} />
					<Route path="/bills/unpaid" element={<UnpaidBills />} />
					<Route path="/bloodpressure" element={<BloodPressure />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthenticatedTemplate>
	);
}
