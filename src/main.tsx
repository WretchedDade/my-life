import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import dayjs from "dayjs";
import * as utcPlugin from "dayjs/plugin/utc";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import "./main.css";

import { ErrorBoundary } from "react-error-boundary";
import { App } from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { Error } from "./pages/Error.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={Error}>
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
		</ErrorBoundary>
	</React.StrictMode>,
);

dayjs.extend(utcPlugin);
