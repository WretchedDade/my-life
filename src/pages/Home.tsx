import { BillTimelineCard } from "../bills";
import { BloodPressureCard } from "../bloodPressure";
import { BudgetPieCard, ExpenditurePieCard } from "../budget";

export function Home() {
	return (
		<>
			<h1 className="mb-10 text-2xl">Home</h1>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<BloodPressureCard className="md:col-span-2" defaultPageSize={3} />

				<BillTimelineCard filter="ThisWeek" />

				<BillTimelineCard filter="NextWeek" />

				<ExpenditurePieCard />

				<BudgetPieCard />
			</div>
		</>
	);
}
