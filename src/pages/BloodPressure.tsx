import { BloodPressureTableCard } from "../bloodPressure";
import { useTailwindBreakpoint } from "../shared/hooks";

export function BloodPressure() {
	const { isAboveSm } = useTailwindBreakpoint("sm");

	return <BloodPressureTableCard defaultPageSize={isAboveSm ? 10 : 5} />;
}
