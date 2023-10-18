import { IconHeartRateMonitor, IconLayoutDashboard, IconReceipt2 } from "@tabler/icons-react";

import { LinksGroupProps } from "./LinksGroup";

export const Links: Array<LinksGroupProps> = [
	{ icon: IconLayoutDashboard, label: "Dashboard", link: "/" },
	{ icon: IconReceipt2, label: "Unpaid Bills", link: "/unpaid-bills" },
	{ icon: IconHeartRateMonitor, label: "Blood Pressure", link: "/blood-pressure" },
];
