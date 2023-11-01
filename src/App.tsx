import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./auth";
import { NotFound } from "./shared/components";

const Layout = lazy(() => import("./shared/components/Layout"));
const UnpaidBills = lazy(() => import("./Bills"));
const BloodPressure = lazy(() => import("./BloodPressure"));
const Dashboard = lazy(() => import("./Dashboard"));

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
