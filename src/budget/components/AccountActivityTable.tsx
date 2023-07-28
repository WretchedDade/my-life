import { useCallback, useMemo } from "react";

import { AccountActivityItem } from "..";

import { Button, Table, TableFooter, TableProps, getPageSizes } from "../../shared/components";
import { useTailwindBreakpoint } from "../../shared/hooks";
import { Page } from "../../shared/types";
import { Format, classNames } from "../../shared/utils";

interface AccountActivityTableProps {
	isLoading?: boolean;

	page: Page<AccountActivityItem> | undefined;

	onNextPage: () => void;
	onPrevPage: () => void;

	pageSize: number;
	onPageSizeChange: (number: number) => void;

	onItemSelect: (item: AccountActivityItem) => void;
}

export function AccountActivityTable({ isLoading = false, page, onNextPage, onPrevPage, pageSize, onPageSizeChange, onItemSelect }: AccountActivityTableProps) {
	const { isAboveSm } = useTailwindBreakpoint("sm");

	const pageSizes = useMemo(() => getPageSizes(page?.totalCount), [page?.totalCount]);

	const getRowValues: TableProps<AccountActivityItem>["getRowValues"] = useCallback(
		(item) => [
			(props) => (
				<td {...props} className={classNames(props.className, "text-left")}>
					{Format.asDateString(item.date, isAboveSm ? "medium" : "short", undefined)}
				</td>
			),
			(props) => (
				<td {...props} className={classNames(props.className, "text-left")}>
					{item.hasShortName ? item.name : Format.asTruncated(item.fullName, isAboveSm ? 50 : 10)}
				</td>
			),
			(props) => (
				<td {...props} className={classNames(props.className, "whitespace-break-spaces text-left")}>
					{item.category}
				</td>
			),
			(props) => (
				<td {...props} className={classNames(props.className, "text-right")}>
					{item.amount}
				</td>
			),
			(props) => (
				<td {...props}>
					<div className="flex justify-end">
						<Button size="sm" variant="secondary" onClick={() => onItemSelect(item)}>
							View Details
						</Button>
					</div>
				</td>
			),
		],
		[isAboveSm, onItemSelect],
	);
	return (
		<>
			<Table isLoading={isLoading} headings={headings} getRowKey={getRowKey} getRowValues={getRowValues} page={page} />

			<TableFooter
				isLoading={isLoading}
				page={page}
				onNext={onNextPage}
				onPrevious={onPrevPage}
				pageSize={pageSize}
				pageSizes={pageSizes}
				onPageSizeChange={onPageSizeChange}
			/>
		</>
	);
}

const headings: TableProps<AccountActivityItem>["headings"] = [
	(props) => <th {...props}>Date</th>,
	(props) => (
		<th {...props} className={classNames(props.className, "text-left")}>
			Name
		</th>
	),
	(props) => (
		<th {...props} className={classNames(props.className, "text-left")}>
			Category
		</th>
	),
	(props) => (
		<th {...props} className={classNames(props.className, "text-right")}>
			Amount
		</th>
	),
	(props) => <th {...props}></th>,
];

const getRowKey = (item: AccountActivityItem) => item.id;
