import classNames from "classnames";

import { Card, CardFooterProps, CardProps } from ".";
import { Button } from "../Button";
import { ColorWays } from "../ColorWays";

import { Page } from "../../types/shared";

export interface CardTableProps<TModel> extends Omit<CardProps, "children" | "contentPaddingDisabled" | "footer"> {
	page: Page<TModel>;
	headings: string[];

	getRowKey?: (item: TModel, index: number) => string;
	getRowValues: (item: TModel) => React.ReactNode[];

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
	headings,
	getRowKey = (_, index) => index.toString(),
	getRowValues,
	pagination,
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
			<table className="min-w-full divide-y divide-gray-300">
				<thead className={classNames("", colorWay.table.header)}>
					<tr>
						{headings.map((heading, headingIndex) => (
							<th
								key={headingIndex}
								scope="col"
								className={classNames("text-left text-sm font-semibold text-inherit", {
									"py-3.5 pl-4 pr-3 sm:pl-6": headingIndex === 0,
									"px-3 py-3.5": headingIndex !== 0,
								})}>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{page &&
						page.items?.map((item, itemIndex) => {
							const rowKey = getRowKey(item, itemIndex);
							return (
								<tr key={rowKey} className={classNames(colorWay.table.row, { [colorWay.table.oddRow]: itemIndex % 2 != 0 })}>
									{getRowValues(item).map((content, contentIndex) => (
										<td
											key={`${rowKey}-cell${contentIndex}`}
											scope="col"
											className={classNames("whitespace-nowrap text-sm", {
												"py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6": contentIndex === 0,
												"px-3 py-4 text-gray-500": contentIndex !== 0,
											})}>
											{content}
										</td>
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
