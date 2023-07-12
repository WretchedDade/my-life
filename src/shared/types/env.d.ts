/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AAD_CLIENT_ID: string;
	readonly VITE_AAD_TENANT_ID: string;
	readonly VITE_API_BASE_URL: string;

	readonly VITE_DEMO_MODE: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
