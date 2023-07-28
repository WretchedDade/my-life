import { classNames } from "../../shared/utils";

import { LoadingSpinner } from ".";
import { ColorWay, ColorWaysKey } from "../../ColorWays";
import { useColorWay } from "../hooks";
import { PageItems, PageMetadata } from "../types";

export interface TableProps<TModel> {
	color?: ColorWaysKey;
	isLoading?: boolean;

	page: (Partial<PageMetadata> & PageItems<TModel>) | undefined;

	headings: React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];
	getRowValues: (item: TModel, colorWay: ColorWay) => React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];

	getRowKey?: (item: TModel, index: number) => string;

	getSummaryRowValues?: (colorWay: ColorWay) => React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];

	className?: string;
}

export function Table<TModel>({
	color,

	page,

	headings,
	getRowValues,

	getRowKey = (_, index) => index.toString(),

	getSummaryRowValues,

	isLoading = false,

	className,
}: TableProps<TModel>) {
	const colorWay = useColorWay(color);

	if (!page) return null; // TODO: Empty State

	if (isLoading) return <LoadingSpinner centered className="h-24 w-24" />;

	return (
		<>
			<table className={classNames("min-w-full", className)}>
				<thead className={colorWay.table.header}>
					<tr>
						{headings.map((TableHeaderCell, index) => (
							<TableHeaderCell
								key={index}
								className={classNames("text-xs font-medium capitalize tracking-wide text-inherit sm:text-sm", {
									"py-3.5 pl-4 pr-3 text-left sm:pl-6": index === 0,
									"px-3 py-3.5 text-center": index !== 0,
								})}
							/>
						))}
					</tr>
				</thead>
				<tbody className={classNames("divide-y divide-gray-200 dark:divide-zinc-950")}>
					{page.items.map((item, itemIndex) => {
						const rowKey = getRowKey(item, itemIndex);
						return (
							<tr
								key={rowKey}
								className={classNames({
									[colorWay.table.evenRow]: itemIndex % 2 == 0,
								})}>
								{getRowValues(item, colorWay).map((TableCell, index) => (
									<TableCell
										key={`${rowKey}-cell${index}`}
										className={classNames("text-xs sm:text-sm", {
											"p-1 pl-4 text-left font-medium text-gray-900 dark:text-gray-50 sm:py-4 sm:pl-6 sm:pr-3": index === 0,
											"p-1 text-center text-gray-500 dark:text-gray-300 sm:px-3 sm:py-4": index !== 0,
										})}
									/>
								))}
							</tr>
						);
					})}
					{getSummaryRowValues && (
						<tr className={classNames({ [colorWay.table.evenRow]: page.items.length % 2 == 0 })}>
							{getSummaryRowValues(colorWay).map((TableCell, index) => (
								<TableCell
									key={`summary-cell-${index}`}
									className={classNames(
										"whitespace-nowrap p-1 text-center text-xs text-gray-500 dark:text-gray-300 sm:px-3 sm:py-4 sm:text-sm",
										colorWay.table.summaryRow,
									)}
								/>
							))}
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
}
