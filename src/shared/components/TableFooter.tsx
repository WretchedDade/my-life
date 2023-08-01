import { Button } from ".";
import { ColorWaysKey } from "../../ColorWays";
import { useColorWay } from "../hooks";
import { Page } from "../types";
import { classNames } from "../utils";

interface TableFooterProps {
	isLoading?: boolean;
	isRefreshing?: boolean;

	color?: ColorWaysKey;

	page?: Page<unknown>;

	onPrevious: (pageNumber: number) => void;
	onNext: (pageNumber: number) => void;

	pageSize: number;
	pageSizes: number[];
	onPageSizeChange: (pageSize: number) => void;
}

export function TableFooter({ page, onPrevious, onNext, pageSizes, onPageSizeChange, color, isLoading, isRefreshing }: TableFooterProps) {
	const colorWay = useColorWay(color);

	if (page === undefined) return null;

	const { hasNextPage = false, hasPreviousPage = false, pageNumber = 0, pageSize = 10, totalCount = 0 } = page;

	if (totalCount <= pageSize) return null;

	return (
		<nav className={classNames("flex items-center justify-between", colorWay.card.footer)} aria-label="Pagination">
			{pageSizes.length > 1 && (
				<div className="hidden gap-x-4 sm:flex">
					<select
						id="pageSize"
						name="pageSize"
						className={classNames(
							"block rounded border-0 py-1 pl-3 pr-10 text-xs text-gray-900 ring-1 ring-gray-300 ring-offset-1 focus:ring-2 dark:bg-zinc-900 dark:text-gray-50 sm:leading-6",
							colorWay.form.control,
						)}
						defaultValue={pageSize}
						onChange={(event) => {
							const target = event.target;
							const newPageSize = target.value || target.options[target.selectedIndex].value;

							return onPageSizeChange(Number(newPageSize));
						}}
						disabled={isRefreshing || isLoading}>
						{pageSizes.map((pageSize) => (
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
					Showing <span className="font-medium">{pageNumber * pageSize + 1}</span> to{" "}
					<span className="font-medium">{Math.min(pageNumber * pageSize + pageSize, totalCount)}</span> of{" "}
					<span className="font-medium">{totalCount}</span> results
				</p>
			</div>

			<div className="flex flex-1 justify-between gap-x-4 sm:flex-none sm:justify-end">
				<Button
					color={colorWay.color}
					variant="secondary"
					onClick={() => onPrevious(pageNumber)}
					disabled={!hasPreviousPage || isRefreshing || isLoading}>
					Previous
				</Button>
				<Button color={colorWay.color} variant="secondary" onClick={() => onNext(pageNumber)} disabled={!hasNextPage || isRefreshing || isLoading}>
					Next
				</Button>
			</div>
		</nav>
	);
}

TableFooter.DefaultPageSizes = [10, 20, 30, 40, 50];

export function getPageSizes(totalCount?: number, pageSizes?: number[]) {
	return (pageSizes ?? TableFooter.DefaultPageSizes).filter((pageSize) => pageSize <= (totalCount ?? 0) + 10);
}
