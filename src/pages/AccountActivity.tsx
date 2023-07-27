import { useCallback, useState } from "react";
import { AccountActivityTable } from "../budget";

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextButton } from "../shared/components";
import { Format } from "../shared/utils";

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

export function AccountActivity() {
	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);

	const [view, setView] = useState<"Charts" | "Table">("Charts");

	const onNextMonth = useCallback(() => {
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
		} else {
			setMonth(month + 1);
		}
	}, [month, year]);

	const onPrevMonth = useCallback(() => {
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
		} else {
			setMonth(month - 1);
		}
	}, [month, year]);

	return (
		<>
			<h1 className="mb-8 text-xl font-semibold leading-6">Account Activity</h1>

			<div className="mb-8 flex w-full border-y border-gray-200 py-4">
				<Button variant="secondary" onClick={onPrevMonth} disabled={month === 6 && year === 2022}>
					<FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
				</Button>
				<p className="flex-grow text-center">
					{Format.asMonthName(month)} {year}
				</p>
				<Button variant="secondary" onClick={onNextMonth} disabled={month === currentMonth && year === currentYear}>
					<FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
				</Button>
			</div>

			<div className="mb-2 flex items-end justify-between border-b border-gray-200 text-gray-900">
				<div></div>
				<div className="flex items-center gap-x-2 px-4 text-xs text-gray-500">
					<p>View: </p>
					<TextButton active={view === "Charts"} onClick={() => setView("Charts")}>
						Charts
					</TextButton>
					<TextButton active={view === "Table"} onClick={() => setView("Table")}>
						Table
					</TextButton>
				</div>
			</div>

			{view === "Table" && <AccountActivityTable year={year} month={month} />}
		</>
	);
}
