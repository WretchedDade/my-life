import { Card } from "../components/Card";
import { BloodPressureDashboardForm } from "../components/Dashboard/BloodPressureDashboardForm";
import { BudgetPie } from "../components/Dashboard/BudgetPie";
import { CurrentBills } from "../components/Dashboard/CurrentBills";
import { ExpenditurePie } from "../components/Dashboard/ExpenditurePie";

export function Home() {
	return (
		<>
			<h1 className="mb-10 text-2xl">Home</h1>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<BloodPressureDashboardForm />

				<Card title="Bills from this and next week" color="green" className="col-start-1">
					<CurrentBills />
				</Card>

				<Card title="Expenses">
					<ExpenditurePie />
				</Card>

				<Card title="Budget">
					<BudgetPie />
				</Card>

				{/* <HomeCard title="Expenditure Breakdown" className="">
					<BudgetArea />
				</HomeCard> */}
			</div>
		</>
	);
}
