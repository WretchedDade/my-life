import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useState } from "react";

import { ColorWaysKey } from "../../../ColorWays";
import { useColorWay } from "../../hooks";
import { classNames } from "../../utils";

interface AutoCompleteProps<TOption> {
	color?: ColorWaysKey;

	name: string;
	label: string;

	placeholder?: string;

	initialOption?: TOption;

	options: TOption[] | undefined;

	getPrimary: (option: TOption) => string;
	getSecondary?: (option: TOption) => string;
}

export function AutoComplete<TOption>({ color, name, label, placeholder, options = [], initialOption, getPrimary, getSecondary }: AutoCompleteProps<TOption>) {
	const colorWay = useColorWay(color);

	const [query, setQuery] = useState("");
	const [selectedOption, setSelectedOption] = useState(initialOption ? getPrimary(initialOption) : undefined);

	const matchesQuery = useCallback(
		(option: TOption) => {
			const matchesPrimary = getPrimary(option).toLowerCase().includes(query.toLowerCase());
			const matchesSecondary = getSecondary ? getSecondary(option).toLowerCase().includes(query.toLowerCase()) : false;

			return matchesPrimary || matchesSecondary;
		},
		[getPrimary, getSecondary, query],
	);

	const filteredOptions = query === "" ? options : options.filter(matchesQuery);

	return (
		<Combobox name={name} as="div" value={selectedOption} onChange={setSelectedOption}>
			<Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>
			<div className="relative mt-2">
				<Combobox.Input
					placeholder={placeholder}
					className={classNames(
						"w-full rounded-md border-0 py-1.5 pl-3 pr-12 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
						colorWay.form.input,
					)}
					onChange={(event) => setQuery(event.target.value)}
					displayValue={getPrimary}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{filteredOptions.length > 0 && (
					<Combobox.Options
						className={classNames(
							"absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm",
							colorWay.form.autoComplete.options,
						)}>
						{filteredOptions.map((option, index) => (
							<Combobox.Option
								key={`${getPrimary(option)}-${index}`}
								value={option}
								className={({ active }) =>
									classNames("relative cursor-default select-none py-2 pl-3 pr-9", colorWay.form.autoComplete.option, {
										[colorWay.form.autoComplete.activeOption]: active,
									})
								}>
								{({ active, selected }) => (
									<>
										<div className="flex">
											<span className={classNames("truncate", selected && "font-semibold")}>{getPrimary(option)}</span>
											{getSecondary && (
												<span
													className={classNames("ml-2 truncate", colorWay.form.autoComplete.secondaryText, {
														[colorWay.form.autoComplete.activeSecondaryText]: active,
													})}>
													{getSecondary(option)}
												</span>
											)}
										</div>

										{selected && (
											<span
												className={classNames(
													"absolute inset-y-0 right-0 flex items-center pr-4",
													colorWay.form.autoComplete.optionIcon,
													{ [colorWay.form.autoComplete.activeOptionIcon]: active },
												)}>
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
}
