import classNames from "classnames";

import { Card, CardFooterProps, CardProps } from ".";
import { ColorWays } from "../../ColorWays";
import { Button } from "../Button";

import { Page } from "../../types/shared";

export interface CardTableProps<TModel> extends Omit<CardProps, "children" | "contentPaddingDisabled" | "footer"> {
	page: Page<TModel>;

	headings: React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];
	getRowValues: (item: TModel) => React.ComponentType<React.HTMLAttributes<HTMLTableCellElement>>[];

	getRowKey?: (item: TModel, index: number) => string;

	pagination?: {
		onNext: () => void;
		onPrevious: () => void;

		pageSizeSelect?: {
			defaultPageSize?: number;
			onPageSizeChange: (pageSize: number) => void;
		};
	};
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

	return (
		<Card
			{...cardProps}
			contentPaddingDisabled
			footer={({ colorWay }) =>
				pagination && (
					<CardTableFooter
						colorWay={colorWay}
						page={page}
						onNext={pagination.onNext}
						onPrevious={pagination.onPrevious}
						pageSizeSelect={
							pagination.pageSizeSelect && {
								defaultPageSize: pagination.pageSizeSelect.defaultPageSize ?? 10,
								onPageSizeChange: pagination.pageSizeSelect.onPageSizeChange,
							}
						}
					/>
				)
			}>
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
				<tbody className="divide-y divide-gray-200 bg-white">
					{page &&
						page.items?.map((item, itemIndex) => {
							const rowKey = getRowKey(item, itemIndex);
							return (
								<tr key={rowKey} className={classNames(colorWay.table.row, { [colorWay.table.evenRow]: itemIndex % 2 == 0 })}>
									{getRowValues(item).map((TableCell, index) => (
										<TableCell
											key={`${rowKey}-cell${index}`}
											className={classNames("whitespace-nowrap text-xs sm:text-sm", {
												"p-1 pl-4 text-left font-medium text-gray-900 sm:py-4 sm:pl-6 sm:pr-3": index === 0,
												"p-1 text-center text-gray-500 sm:px-3 sm:py-4": index !== 0,
											})}
										/>
									))}
								</tr>
							);
						})}
				</tbody>
			</table>
		</Card>
	);
}

interface CardTableFooterProps<TModel> extends CardFooterProps {
	page: Page<TModel>;

	onPrevious: (pageNumber: number) => void;
	onNext: (pageNumber: number) => void;

	pageSizeSelect?: {
		defaultPageSize: number;
		onPageSizeChange: (pageSize: number) => void;
	};
}

function CardTableFooter<TModel>({ page, onPrevious, onNext, pageSizeSelect, colorWay }: CardTableFooterProps<TModel>) {
	return (
		<nav className={classNames("flex items-center justify-between", colorWay.card.footer)} aria-label="Pagination">
			{pageSizeSelect && (
				<div className="hidden gap-x-4 sm:flex">
					<select
						id="pageSize"
						name="pageSize"
						className={classNames(
							"block rounded border-0 p-1 pr-2 text-xs text-gray-900 ring-1 ring-gray-300 ring-offset-1 focus:ring-2  sm:leading-6",
							colorWay.form.control,
						)}
						defaultValue={pageSizeSelect.defaultPageSize}
						onChange={(event) => {
							const target = event.target;
							const newPageSize = target.value || target.options[target.selectedIndex].value;

							console.log({ target, newPageSize });

							return pageSizeSelect.onPageSizeChange(Number(newPageSize));
						}}>
						{[5, 10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
					<label htmlFor="pageSize" className="block text-sm font-medium leading-6 text-gray-900">
						Items Per Page
					</label>
				</div>
			)}

			<div className="hidden sm:block">
				<p className="text-sm text-gray-700">
					Showing <span className="font-medium">{page.pageNumber * page.pageSize + 1}</span> to{" "}
					<span className="font-medium">{Math.min(page.pageNumber * page.pageSize + page.pageSize, page.totalCount)}</span> of{" "}
					<span className="font-medium">{page.totalCount}</span> results
				</p>
			</div>

			<div className="flex flex-1 justify-between gap-x-4 sm:flex-none sm:justify-end">
				<Button color={colorWay.color} variant="secondary" onClick={() => onPrevious(page.pageNumber)} disabled={!page.hasPreviousPage}>
					Previous
				</Button>
				<Button color={colorWay.color} variant="secondary" onClick={() => onNext(page.pageNumber)} disabled={!page.hasNextPage}>
					Next
				</Button>
			</div>
		</nav>
	);
}
