import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";

import { App } from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";

const queryClient = new QueryClient();

const configuration: Configuration = {
	auth: {
		clientId: import.meta.env.VITE_AAD_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AAD_TENANT_ID}/`,
	},
	system: {
		loggerOptions: {},
	},
};

const publicClientApplication = new PublicClientApplication(configuration);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider defaultColorScheme="light">
				<MsalProvider instance={publicClientApplication}>
					<AuthProvider>
						<BrowserRouter future={{ v7_startTransition: true }}>
							<App />
							<ReactQueryDevtools initialIsOpen={false} />
						</BrowserRouter>
					</AuthProvider>
				</MsalProvider>
			</MantineProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
