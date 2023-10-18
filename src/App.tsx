import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./auth";
import { Layout, NotFound } from "./shared/components";

import { UnpaidBills } from "./Bills";
import { BloodPressure } from "./BloodPressure";
import { Dashboard } from "./Dashboard";

export function App() {
	const { redirect } = useAuth();
	return (
		<Routes>
			<Route path="/Redirect" element={<Navigate to={redirect ?? "/"} />} />
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="/unpaid-bills" element={<UnpaidBills />} />
				<Route path="/blood-pressure" element={<BloodPressure />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
