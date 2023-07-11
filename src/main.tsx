import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import "./main.css";

import { App } from "./App.tsx";

import { AuthContextProvider } from "./auth";
import { Error } from "./pages";
import { NotificationContextProvider } from "./shared/NotificationContext.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// refetchOnWindowFocus: false,
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
							<NotificationContextProvider>
								<App />
								<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
							</NotificationContextProvider>
						</AuthContextProvider>
					</MsalProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>,
);

dayjs.extend(utcPlugin);
