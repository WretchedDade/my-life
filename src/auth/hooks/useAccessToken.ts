import { useContext, useEffect } from "react";

import { InteractionRequiredAuthError, PopupRequest, SilentRequest } from "@azure/msal-browser";
import { IMsalContext, useMsal } from "@azure/msal-react";

import { AuthContext, Scopes } from "../";

export function useAccessToken() {
	const msal = useMsal();

	const { accessToken, setAccessToken } = useContext(AuthContext);

	useEffect(() => {
		if (msal.accounts.length > 0) {
			const request = {
				scopes: Scopes,
				account: msal.accounts[0],
			};

			getAccessToken(msal, request).then((token) => {
				if (token) setAccessToken(token);
			});
		}
	}, [msal, setAccessToken]);

	return accessToken;
}

export async function getAccessToken(msal: IMsalContext, request: SilentRequest & PopupRequest): Promise<string | undefined> {
	try {
		const response = await msal.instance.acquireTokenSilent(request);
		return response.accessToken;
	} catch (error) {
		// acquireTokenSilent can fail for a number of reasons, fallback to interaction
		if (error instanceof InteractionRequiredAuthError) {
			msal.instance.acquireTokenPopup(request).then((response) => {
				return response.accessToken;
			});
		} else {
			throw error;
		}
	}
}