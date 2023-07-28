import { useCallback, useEffect, useMemo, useState } from "react";
import { AccountActivityItem, useAccountActivity } from "..";
import { Table, TableFooter, TableProps, getPageSizes } from "../../shared/components";
import { useTailwindBreakpoint } from "../../shared/hooks";
import { Format, classNames } from "../../shared/utils";

export function AccountActivityTableByCategory({ year, month }: { year: number; month: number }) {
	const { isAboveSm } = useTailwindBreakpoint("sm");

	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	useEffect(() => {
		setPageNumber(0);
	}, [year, month]);

	const { isLoading, data: page } = useAccountActivity({ pageNumber, pageSize, year, month: month + 1 });

	const onNextPage = useCallback(() => setPageNumber(pageNumber + 1), [pageNumber]);
	const onPrevPage = useCallback(() => setPageNumber(pageNumber - 1), [pageNumber]);

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
		],
		[isAboveSm],
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
				onPageSizeChange={setPageSize}
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
];

const getRowKey = (item: AccountActivityItem) => item.id;
