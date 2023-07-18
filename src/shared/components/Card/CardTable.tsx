import classNames from "classnames";

import { Card, CardFooterProps, CardProps } from ".";

import { Button } from "..";
import { ColorWays } from "../../../ColorWays";
import { Page } from "../../types";

export interface CardTableProps<TModel> extends Omit<CardProps, "children" | "contentPaddingDisabled" | "footer"> {
	page: Page<TModel> | undefined;

	headings: React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];
	getRowValues: (item: TModel) => React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];

	getRowKey?: (item: TModel, index: number) => string;

	pagination?: {
		onNext: () => void;
		onPrevious: () => void;

		sizeSelectOptions?: {
			pageSize: number;
			pageSizes?: number[];
			onPageSizeChange: (pageSize: number) => void;
		};
	};
}

function getPageSizes(pageSizes: number[] | undefined, totalCount: number | undefined) {
	return (pageSizes ?? CardTable.DefaultPageSizes).filter((pageSize) => pageSize <= (totalCount ?? 0) + 10);
}

export function CardTable<TModel>({
	page,
	pagination,

	headings,
	getRowValues,

	getRowKey = (_, index) => index.toString(),

	...cardProps
}: CardTableProps<TModel>) {
	const colorWay = ColorWays[cardProps.color ?? "blue"];

	const sizeSelectOptions =
		pagination?.sizeSelectOptions != null
			? { ...pagination.sizeSelectOptions, pageSizes: getPageSizes(pagination.sizeSelectOptions.pageSizes, page?.totalCount) }
			: undefined;

	return (
		<Card
			{...cardProps}
			contentPaddingDisabled
			footer={(props) =>
				page &&
				pagination && (
					<CardTableFooter
						page={page}
						onNext={pagination.onNext}
						onPrevious={pagination.onPrevious}
						sizeSelectOptions={sizeSelectOptions}
						{...props}
					/>
				)
			}>
			{page && (
				<table className="min-w-full">
					<thead className={classNames(colorWay.table.header)}>
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
					<tbody className="divide-y divide-gray-200 dark:divide-slate-950">
						{page.items.map((item, itemIndex) => {
							const rowKey = getRowKey(item, itemIndex);
							return (
								<tr
									key={rowKey}
									className={classNames(colorWay.table.row, { [`${colorWay.table.evenRow} dark:bg-slate-800`]: itemIndex % 2 == 0 })}>
									{getRowValues(item).map((TableCell, index) => (
										<TableCell
											key={`${rowKey}-cell${index}`}
											className={classNames("whitespace-nowrap text-xs sm:text-sm", {
												"p-1 pl-4 text-left font-medium text-gray-900 dark:text-gray-50 sm:py-4 sm:pl-6 sm:pr-3": index === 0,
												"p-1 text-center text-gray-500 dark:text-gray-300 sm:px-3 sm:py-4": index !== 0,
											})}
										/>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</Card>
	);
}

interface CardTableFooterProps<TModel> extends CardFooterProps {
	page: Page<TModel>;

	onPrevious: (pageNumber: number) => void;
	onNext: (pageNumber: number) => void;

	sizeSelectOptions?: {
		pageSize: number;
		pageSizes: number[];
		onPageSizeChange: (pageSize: number) => void;
	};
}

CardTable.DefaultPageSizes = [10, 20, 30, 40, 50];

function CardTableFooter<TModel>({ page, onPrevious, onNext, sizeSelectOptions, colorWay, isLoading, isRefreshing }: CardTableFooterProps<TModel>) {
	return (
		<nav className={classNames("flex items-center justify-between", colorWay.card.footer)} aria-label="Pagination">
			{sizeSelectOptions && sizeSelectOptions.pageSizes.length > 1 && (
				<div className="hidden gap-x-4 sm:flex">
					<select
						id="pageSize"
						name="pageSize"
						className={classNames(
							"block rounded border-0 p-1 pr-2 text-xs text-gray-900 ring-1 ring-gray-300 ring-offset-1 focus:ring-2 dark:bg-slate-900 dark:text-gray-50 sm:leading-6",
							colorWay.form.control,
						)}
						defaultValue={sizeSelectOptions.pageSize}
						onChange={(event) => {
							const target = event.target;
							const newPageSize = target.value || target.options[target.selectedIndex].value;

							return sizeSelectOptions.onPageSizeChange(Number(newPageSize));
						}}
						disabled={isRefreshing || isLoading}>
						{sizeSelectOptions.pageSizes.map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
					<label htmlFor="pageSize" className="block text-sm font-medium leading-6 text-inherit">
						Items Per Page
					</label>
				</div>
			)}

			<div className="hidden sm:block">
				<p className="text-sm text-gray-700 dark:text-gray-300">
					Showing <span className="font-medium">{page.pageNumber * page.pageSize + 1}</span> to{" "}
					<span className="font-medium">{Math.min(page.pageNumber * page.pageSize + page.pageSize, page.totalCount)}</span> of{" "}
					<span className="font-medium">{page.totalCount}</span> results
				</p>
			</div>

			<div className="flex flex-1 justify-between gap-x-4 sm:flex-none sm:justify-end">
				<Button
					color={colorWay.color}
					variant="secondary"
					onClick={() => onPrevious(page.pageNumber)}
					disabled={!page.hasPreviousPage || isRefreshing || isLoading}>
					Previous
				</Button>
				<Button
					color={colorWay.color}
					variant="secondary"
					onClick={() => onNext(page.pageNumber)}
					disabled={!page.hasNextPage || isRefreshing || isLoading}>
					Next
				</Button>
			</div>
		</nav>
	);
}
