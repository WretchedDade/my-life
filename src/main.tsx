import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

import "./main.css";

import { App } from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();

const configuration: Configuration = {
	auth: {
		clientId: import.meta.env.VITE_AAD_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AAD_TENANT_ID}/`,
	},
	system: {
		/**
		 * Below you can configure MSAL.js logs. For more information, visit:
		 * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
		 */
		loggerOptions: {
			// logLevel: LogLevel.Verbose,
			// piiLoggingEnabled: true,
			// loggerCallback: (level, message, containsPii) => {
			// 	if (containsPii) {
			// 		return;
			// 	}
			// 	switch (level) {
			// 		case LogLevel.Error:
			// 			console.error(message);
			// 			return;
			// 		case LogLevel.Info:
			// 			console.info(message);
			// 			return;
			// 		case LogLevel.Verbose:
			// 			console.debug(message);
			// 			return;
			// 		case LogLevel.Warning:
			// 			console.warn(message);
			// 			return;
			// 		default:
			// 			console.debug(message);
			// 			return;
			// 	}
			// },
		},
	},
};

const publicClientApplication = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter future={{ v7_startTransition: true }}>
				<MsalProvider instance={publicClientApplication}>
					<AuthContextProvider>
						<App />
						<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
					</AuthContextProvider>
				</MsalProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
);
