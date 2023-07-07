import classNames from "classnames";

import { BudgetPie } from "../components/Dashboard/BudgetPie";
import { CurrentBills } from "../components/Dashboard/CurrentBills";
import { ExpenditurePie } from "../components/Dashboard/ExpenditurePie";

export function Home() {
	return (
		<>
			<h1 className="mb-10 text-2xl">Home</h1>

			<ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<HomeCard title="Bills from this and next Week">
					<CurrentBills />
				</HomeCard>

				<HomeCard title="Expenses" className="">
					<ExpenditurePie />
				</HomeCard>

				<HomeCard title="Budget" className="">
					<BudgetPie />
				</HomeCard>

				{/* <HomeCard title="Expenditure Breakdown" className="">
					<BudgetArea />
				</HomeCard> */}
			</ul>
		</>
	);
}

interface HomeCardProps {
	title: string;
	className?: string;
}
function HomeCard({ title, className, children }: React.PropsWithChildren<HomeCardProps>) {
	return (
		<li className={classNames("flex flex-col divide-y-2 divide-blue-400 overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow", className)}>
			<div className="px-4 py-4 sm:p-6">
				<h2 className="text-xl leading-6 text-gray-900">{title}</h2>
			</div>
			<div className="flex-grow bg-gray-50 px-4 py-5 sm:p-6">{children}</div>
		</li>
	);
}
