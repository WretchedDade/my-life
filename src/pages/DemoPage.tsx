import { useMsal } from "@azure/msal-react";
import { Route, Routes } from "react-router-dom";
import { Button, Layout } from "../shared/components";

export function DemoPage() {
	return (
		<Routes>
			<Route path="*" element={<Layout />}>
				<Route path="*" element={<Demo />} />
			</Route>
		</Routes>
	);
}

function Demo() {
	const msal = useMsal();

	const account = msal.accounts[0];

	return (
		<div className="">
			<div className="mb-8 flex justify-between gap-x-4">
				<h1 className=" text-2xl">Demo</h1>
				<Button size="lg" color="red" onClick={() => msal.instance.logout()}>
					Sign Out
				</Button>
			</div>

			<h2 className="mb-2 text-lg">Account Info</h2>
			<div className="max-w-[calc(100vw-287px)] bg-gray-50 p-4 dark:bg-zinc-900">
				<pre className="overflow-x-auto">{JSON.stringify(account, null, 4)}</pre>
			</div>
		</div>
	);
}
