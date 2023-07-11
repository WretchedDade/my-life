import { BloodPressureCard } from "../bloodPressure";
import { useTailwindBreakpoint } from "../shared/hooks";

export function BloodPressure() {
	const { isAboveSm } = useTailwindBreakpoint("sm");

	return <BloodPressureCard defaultPageSize={isAboveSm ? 10 : 5} />;
}
