import { useMemo } from "react";
import { Location, useLocation } from "react-router-dom";

import { faHeartPulse, faIgloo, faMoneyBillWave, faMoneyBills } from "@fortawesome/free-solid-svg-icons";

import { ColorWay, ColorWays } from "../../ColorWays";
import { BloodPressure, Home, UnpaidBills } from "../../pages";
import { Budget } from "../../pages/Budget";

export function useNavigationOptions() {
	const location = useLocation();
	return useMemo(() => BuildNavigationOptions(location), [location]);
}

interface NavigationOption {
	name: string;
	href: string;
	icon: typeof faIgloo;
	current: boolean;
	colorWay: ColorWay;

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

				colorWay: ColorWays.blue,
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

			colorWay: ColorWays.blue,
			element: <Home />,
		},
		{
			name: "Unpaid Bills",
			href: "/bills/unpaid",
			icon: faMoneyBillWave,
			current: location.pathname === "/bills/unpaid",

			colorWay: ColorWays.green,
			element: <UnpaidBills />,
		},
		{
			name: "Blood Pressure",
			href: "/bloodpressure",
			icon: faHeartPulse,
			current: location.pathname === "/bloodpressure",

			colorWay: ColorWays.red,
			element: <BloodPressure />,
		},
		{
			name: "Budget",
			href: "/budget",
			icon: faMoneyBills,
			current: location.pathname === "/budget",

			colorWay: ColorWays.purple,
			element: <Budget />,
		},
	];
}
