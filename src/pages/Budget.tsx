import { useCallback, useMemo } from "react";
import { BudgetItemWithRunningTotal, useBudgetItems } from "../budget";

import { CardTable, CardTableProps, Tag } from "../shared/components";
import { useTailwindBreakpoint } from "../shared/hooks";
import { Format, classNames } from "../shared/utils";

interface Budget {
	className?: string;
	defaultPageSize?: number;
}

export function Budget() {
	const { isAboveSm } = useTailwindBreakpoint("sm");

	const { isLoading, data: budgetItems } = useBudgetItems();

	const { remainingBalance, totalExpenses, totalIncome } = useMemo(
		() => ({
			remainingBalance: budgetItems?.[budgetItems.length - 1]?.runningTotal ?? 0,
			totalIncome: budgetItems?.filter((item) => item.isIncome).reduce((total, item) => total + item.amount, 0) ?? 0,
			totalExpenses: budgetItems?.filter((item) => !item.isIncome).reduce((total, item) => total + item.amount, 0) ?? 0,
		}),
		[budgetItems],
	);

	const getSummaryRowValues = useCallback<NonNullable<CardTableProps<BudgetItemWithRunningTotal>["getSummaryRowValues"]>>(() => {
		return [
			(props) => (
				<td colSpan={isAboveSm ? 6 : 4} {...props}>
					<div className="flex justify-end">
						<div className="flex flex-grow flex-col items-end gap-y-2 md:w-56 md:flex-grow-0">
							<div className="flex w-full justify-between">
								<p className="font-medium">Income</p>
								<p>{Format.asCurrency(totalIncome)}</p>
							</div>
							<div className="flex w-full justify-between">
								<p className="font-medium">Expenses</p>
								<p> - {Format.asCurrency(totalExpenses)}</p>
							</div>
							<div className="w-full border-t border-gray-600" />
							<div className="flex w-full justify-between">
								<p className="whitespace-normal font-medium">Remaining Balance</p>
								<p> = {Format.asCurrency(remainingBalance)}</p>
							</div>
						</div>
					</div>

					{/* <div className="flex items-end justify-between">
						<p className="font-bold">Remaining Balance:</p>
						<div className="flex flex-col items-end gap-y-2 font-medium">
							<p>{Format.asCurrency(totalIncome)}</p>
							<p>- {Format.asCurrency(totalExpenses)}</p>

							<div className="w-full border-t border-gray-600" />

							<p>= {Format.asCurrency(budgetItems[budgetItems.length - 1].runningTotal)}</p>
						</div>
					</div> */}
				</td>
			),
		];
	}, [remainingBalance, totalExpenses, totalIncome]);

	return (
		<div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
			<CardTable
				bordered
				color="purple"
				isLoading={isLoading}
				heading={{ title: "Budget" }}
				headings={headings}
				getRowKey={getRowKey}
				getRowValues={getRowValues}
				getSummaryRowValues={getSummaryRowValues}
				page={budgetItems ? { items: budgetItems } : undefined}
				className="md:col-span-2"
			/>
		</div>
	);
}

const headings: CardTableProps<BudgetItemWithRunningTotal>["headings"] = [
	(props) => <th {...props}></th>,
	(props) => (
		<th {...props} className={classNames(props.className, "text-left sm:text-center")}>
			Name
		</th>
	),
	(props) => (
		<th {...props} className={classNames(props.className, "hidden sm:table-cell")}>
			Category
		</th>
	),
	(props) => (
		<th {...props} className={classNames(props.className, "hidden sm:table-cell")}>
			Tags
		</th>
	),
	(props) => <th {...props}>Amount</th>,
	(props) => <th {...props}></th>,
];

const getRowKey = (item: BudgetItemWithRunningTotal) => item.id;

const getRowValues: CardTableProps<BudgetItemWithRunningTotal>["getRowValues"] = (item, colorWay) => [
	(props) => <td {...props}>{item.day ? `${Format.asOrdinal(item.day)}` : "End"}</td>,
	(props) => (
		<td {...props} className={classNames(props.className, "text-left")}>
			<div className="flex items-center gap-x-4 whitespace-normal">
				{item.iconUri ? <img src={item.iconUri} className="hidden h-6 sm:inline" /> : <span className="hidden text-lg sm:inline">{item.emoji}</span>}
				{item.name}
			</div>
		</td>
	),
	(props) => (
		<td {...props} className={classNames(props.className, "hidden text-left sm:table-cell")}>
			{item.category}
		</td>
	),

	(props) => (
		<td {...props} className={classNames(props.className, "hidden sm:table-cell")}>
			<div className="flex justify-end gap-x-2">
				{item.tags.map((tag) => (
					<Tag key={tag.name} variant="Solid" color={tag.color} className="inline">
						{tag.name}
					</Tag>
				))}
			</div>
		</td>
	),

	(props) => (
		<td {...props} className={classNames(props.className, "font-semibold text-red-500 sm:text-right", { ["text-green-500"]: item.isIncome })}>
			{Format.asCurrency(item.isIncome ? item.amount : -item.amount)}
		</td>
	),

	(props) => {
		return (
			<td {...props} className={classNames(props.className, "text-right", colorWay.table.special)}>
				{Format.asCurrency(item.runningTotal)}
			</td>
		);
	},
];
