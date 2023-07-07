import { BanknotesIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { Location, useLocation } from "react-router-dom";

export function useNavigationOptions() {
	const location = useLocation();
	return useMemo(() => BuildNavigationOptions(location), [location]);
}

function BuildNavigationOptions(location: Location) {
	return [
		{ name: "Home", href: "/", icon: HomeIcon, current: location.pathname === "/" },
		{ name: "Unpaid Bills", href: "/bills/unpaid", icon: BanknotesIcon, current: location.pathname === "/bills/unpaid" },
	];
}
