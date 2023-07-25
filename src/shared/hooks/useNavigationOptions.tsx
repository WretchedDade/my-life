import { useMemo } from "react";
import { Location, useLocation } from "react-router-dom";

import { faHeartPulse, faIgloo, faKey, faMoneyBillWave, faMoneyBills } from "@fortawesome/free-solid-svg-icons";

import { BloodPressure, Home, UnpaidBills } from "../../pages";
import { Budget } from "../../pages/Budget";
import { KeywordConfig } from "../../pages/KeywordConfig";

export function useNavigationOptions() {
	const location = useLocation();
	return useMemo(() => BuildNavigationOptions(location), [location]);
}

interface NavigationOption {
	name: string;
	href: string;
	icon: typeof faIgloo;
	current: boolean;

	element: React.ReactElement;
}

// eslint-disable-next-line react-refresh/only-export-components
function BuildNavigationOptions(location: Location): NavigationOption[] {
	if (import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE) {
		return [
			{
				name: "Home",
				href: "/",
				icon: faIgloo,
				current: location.pathname === "/",

				element: <Home />,
			},
		];
	}

	return [
		{
			name: "Home",
			href: "/",
			icon: faIgloo,
			current: location.pathname === "/",

			element: <Home />,
		},
		{
			name: "Unpaid Bills",
			href: "/bills/unpaid",
			icon: faMoneyBillWave,
			current: location.pathname === "/bills/unpaid",

			element: <UnpaidBills />,
		},
		{
			name: "Blood Pressure",
			href: "/bloodpressure",
			icon: faHeartPulse,
			current: location.pathname === "/bloodpressure",

			element: <BloodPressure />,
		},
		{
			name: "Budget",
			href: "/budget",
			icon: faMoneyBills,
			current: location.pathname === "/budget",

			element: <Budget />,
		},
		{
			name: "Keyword Config",
			href: "/keywordconfig",
			icon: faKey,
			current: location.pathname === "/keywordconfig",

			element: <KeywordConfig />,
		},
	];
}
