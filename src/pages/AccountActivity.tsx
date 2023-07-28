import { useCallback, useMemo, useState } from "react";

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	AccountActivityExpensesPie,
	AccountActivityIncomePie,
	AccountActivityItem,
	AccountActivityItemPanel,
	AccountActivityItemsPanel,
	AccountActivityTable,
	AccountActivityTrendChart,
	useAccountActivity,
	useKeywordCategories,
} from "../budget";

import { Button, TextButton } from "../shared/components";
import { AutoComplete } from "../shared/components/Form/AutoComplete";
import { useColorWay } from "../shared/hooks";
import { Format, classNames } from "../shared/utils";

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

export function AccountActivity() {
	const colorWay = useColorWay();

	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);

	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const [category, setCategory] = useState("All");

	const [selectedItem, setSelectedItem] = useState<AccountActivityItem>();
	const [selectedItems, setSelectedItems] = useState<AccountActivityItem[]>();

	const {
		isLoading,
		isFetching,
		data: page,
	} = useAccountActivity({ pageNumber, pageSize, year, month: month + 1, category: category === "All" ? undefined : category });
	const { data: keywordCategories = [] } = useKeywordCategories();

	const categories = useMemo(() => ["All", ...keywordCategories], [keywordCategories]);

	const onNextPage = useCallback(() => setPageNumber(pageNumber + 1), [pageNumber]);
	const onPrevPage = useCallback(() => setPageNumber(pageNumber - 1), [pageNumber]);

	const [view, setView] = useState<"Expenses" | "Income" | "Table" | "Trend">("Trend");

	const onNextMonth = useCallback(() => {
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
		} else {
			setMonth(month + 1);
		}

		setPageNumber(0);
	}, [month, year]);

	const onPrevMonth = useCallback(() => {
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
		} else {
			setMonth(month - 1);
		}

		setPageNumber(0);
	}, [month, year]);

	return (
		<>
			<h1 className={classNames("mb-8 text-xl font-semibold leading-6", colorWay.text.accent)}>{category} Expenses</h1>

			<div className="flex items-end justify-end border-b border-gray-200 text-gray-900">
				<div className="flex items-center gap-x-2 text-xs text-gray-500">
					<p>View: </p>
					<TextButton active={view === "Trend"} onClick={() => setView("Trend")}>
						Trend
					</TextButton>
					<TextButton active={view === "Expenses"} onClick={() => setView("Expenses")}>
						Expenses
					</TextButton>
					<TextButton active={view === "Income"} onClick={() => setView("Income")}>
						Income
					</TextButton>
					<TextButton active={view === "Table"} onClick={() => setView("Table")}>
						Table
					</TextButton>
				</div>
			</div>

			{view !== "Trend" && (
				<div className="flex items-center justify-between gap-x-2 border-b border-gray-200 py-4">
					<Button size="xs" variant="secondary" onClick={onPrevMonth} disabled={month === 6 && year === 2022}>
						<FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
					</Button>
					<p className="flex-grow text-center">
						{Format.asMonthName(month)} {year}
					</p>
					<Button size="xs" variant="secondary" onClick={onNextMonth} disabled={month === currentMonth && year === currentYear}>
						<FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
					</Button>
				</div>
			)}

			{view !== "Trend" && (
				<div className="flex justify-start gap-x-2 border-b border-gray-200 py-4 sm:justify-end">
					<div>
						<AutoComplete inline name="category" value={category} onChange={setCategory} options={categories} getPrimary={(category) => category} />
					</div>
					{category !== "All" && (
						<Button size="xs" onClick={() => setCategory("All")}>
							Clear
						</Button>
					)}
				</div>
			)}

			{view === "Table" && (
				<div className="mt-4">
					<AccountActivityTable
						isLoading={isLoading || isFetching}
						page={page}
						onNextPage={onNextPage}
						onPrevPage={onPrevPage}
						pageSize={pageSize}
						onPageSizeChange={setPageSize}
						onItemSelect={setSelectedItem}
					/>
				</div>
			)}

			{view === "Expenses" && (
				<AccountActivityExpensesPie
					year={year}
					month={month}
					category={category}
					onCategoryChange={setCategory}
					onItemSelected={setSelectedItem}
					onItemsSelected={setSelectedItems}
				/>
			)}

			{view === "Income" && <AccountActivityIncomePie year={year} month={month} onItemSelected={setSelectedItem} onItemsSelected={setSelectedItems} />}
			{view === "Trend" && <AccountActivityTrendChart />}

			<AccountActivityItemPanel open={selectedItem !== undefined} onClose={() => setSelectedItem(undefined)} item={selectedItem} />
			<AccountActivityItemsPanel
				open={selectedItems !== undefined}
				onClose={() => setSelectedItems(undefined)}
				items={selectedItems}
				onItemSelect={(item) => {
					setSelectedItem(item);
					setSelectedItems(undefined);
				}}
			/>
		</>
	);
}
