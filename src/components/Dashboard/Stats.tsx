import { useMemo } from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

import { StatCard, StatCardProps } from "./StatCard";
import { useUnpaidBillsQuery } from "../../hooks/useUnpaidBills";
import { useBillConfigurationsQuery } from "../../hooks/useBillConfigurations";

export function Stats() {
	const stats = useStats();

	return (
		<div>
			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{stats.map((stat) => (
					<StatCard key={stat.name} {...stat} />
				))}
			</dl>
		</div>
	);
}

function useStats() {
	const { data: unpaidBills } = useUnpaidBillsQuery();
	const { data: billConfigurations } = useBillConfigurationsQuery();

	return useMemo(() => {
		const stats: StatCardProps[] = [];

		stats.push({
			name: "Unpaid Bills",
			stat: unpaidBills?.length.toString() ?? "0",
			icon: BanknotesIcon,
			viewAllPath: "/bills",
			totalValue: billConfigurations?.length.toString() ?? "0",

			loading: unpaidBills === undefined || billConfigurations === undefined,
		});

		return stats;
	}, [unpaidBills, billConfigurations]);
}
