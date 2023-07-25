import { useCallback, useMemo, useState } from "react";
import { Keyword, KeywordPanel, useKeywords } from "../budget";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, CardTable, CardTableProps } from "../shared/components";
import { useTailwindBreakpoint } from "../shared/hooks";
import { classNames } from "../shared/utils";

export function KeywordConfig() {
	const { isAboveSm } = useTailwindBreakpoint("sm");

	const defaultPageSize = isAboveSm ? 10 : 5;

	const [panelOpen, setPanelOpen] = useState(false);
	const [keywordToEdit, setKeywordToEdit] = useState<Keyword | undefined>(undefined);

	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(defaultPageSize);

	const { isLoading, data: page } = useKeywords(pageNumber, pageSize);

	const onClose = useCallback(() => {
		setPanelOpen(false);
		setKeywordToEdit(undefined);
	}, []);

	const editKeyword = useCallback((keyword: Keyword) => {
		setKeywordToEdit(keyword);
		setPanelOpen(true);
	}, []);

	const getRowValues: CardTableProps<Keyword>["getRowValues"] = useCallback(
		(keyword) => [
			(props) => (
				<td {...props} className={classNames(props.className, "font-mono")}>
					{keyword.keyword}
				</td>
			),
			(props) => (
				<td {...props} className={classNames(props.className, "text-left")}>
					{keyword.name}
				</td>
			),
			(props) => (
				<td {...props} className={classNames(props.className, "text-left")}>
					{keyword.category}
				</td>
			),

			(props) => {
				return (
					<td {...props}>
						<Button onClick={() => editKeyword(keyword)}>
							<FontAwesomeIcon icon={faPen} />
						</Button>
					</td>
				);
			},
		],
		[editKeyword],
	);

	const pagination = useMemo<CardTableProps<Keyword>["pagination"]>(() => {
		const pageSizes = Array.from(new Set([defaultPageSize, ...CardTable.DefaultPageSizes]));

		return {
			onNext: () => setPageNumber(pageNumber + 1),
			onPrevious: () => setPageNumber(pageNumber - 1),
			sizeSelectOptions: {
				pageSize,
				pageSizes,
				onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
			},
		};
	}, [defaultPageSize, pageNumber, pageSize]);

	return (
		<>
			<div className="flex flex-col items-end gap-y-4">
				<Button onClick={() => setPanelOpen(true)}>Add New</Button>

				<CardTable
					isLoading={isLoading}
					heading={{ title: "Keywords" }}
					headings={headings}
					getRowKey={getRowKey}
					getRowValues={getRowValues}
					pagination={pagination}
					page={page}
					className="w-full"
				/>
			</div>
			<KeywordPanel open={panelOpen} onClose={onClose} keyword={keywordToEdit} />
		</>
	);
}

const headings: CardTableProps<Keyword>["headings"] = [
	(props) => <th {...props}>Keyword</th>,
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
	(props) => <th {...props}></th>,
];

const getRowKey = (item: Keyword) => item.keyword;
