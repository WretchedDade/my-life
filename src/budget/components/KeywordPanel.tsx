import { z } from "zod";

import React, { useEffect, useRef, useState } from "react";

import { Keyword, useCreateKeyword, useKeywordCategories, useUpdateKeyword } from "..";

import { FormError, Input, SlideOver } from "../../shared/components";
import { AutoComplete } from "../../shared/components/Form/AutoComplete";
import { getFormData } from "../../shared/utils";

interface KeywordPanelProps {
	open: boolean;
	onClose: () => void;

	keyword?: Keyword;
}

export function KeywordPanel({ open, onClose, keyword }: KeywordPanelProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const keywordRef = useRef<HTMLInputElement>(null);

	const [category, setCategory] = useState(keyword?.category ?? "");

	useEffect(() => setCategory(keyword?.category ?? ""), [keyword?.category]);

	const [errors, setErrors] = useState<Errors>({ formErrors: [], fieldErrors: {} });

	const { data: categories } = useKeywordCategories();

	const { mutate: createKeyword, isLoading: isCreating } = useCreateKeyword(close);
	const { mutate: updateKeyword, isLoading: isUpdating } = useUpdateKeyword(close);

	const isLoading = isCreating || isUpdating;
	const mutate = keyword ? updateKeyword : createKeyword;

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = getFormData(e.currentTarget);
		const validationResult = FormSchema.safeParse(formData);

		if (validationResult.success) {
			mutate(validationResult.data);
		} else {
			setErrors(validationResult.error.flatten());
		}
	}

	function onBlur(e: React.FormEvent<HTMLFormElement>) {
		console.log("blur");
		const formData = getFormData(e.currentTarget);
		const validationResult = FormSchema.safeParse(formData);

		if (Object.keys(errors.fieldErrors).length !== 0)
			setErrors(validationResult.success ? { formErrors: [], fieldErrors: {} } : validationResult.error.flatten());
	}

	function close() {
		onClose();

		setErrors({ formErrors: [], fieldErrors: {} });
	}

	const title = "Add New Keyword";

	return (
		<SlideOver
			as="form"
			ref={formRef}
			initialFocus={keywordRef}
			open={open}
			onClose={close}
			onBlur={onBlur}
			onReset={close}
			onSubmit={onSubmit}
			header={{ title }}
			footer={{
				actions: [
					{ text: "Cancel", variant: "secondary", type: "reset", disabled: isLoading },
					{ text: "Save", type: "submit", isLoading },
				],
			}}>
			<div className="space-y-6 p-6">
				<div>
					<label htmlFor="keyword" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
						Keyword
					</label>
					<div className="mt-2">
						<Input ref={keywordRef} color="slate" name="keyword" id="keyword" type="text" placeholder="D&B" defaultValue={keyword?.keyword} />
						{errors.fieldErrors.keyword?.[0] && <FormError>{errors.fieldErrors.keyword?.[0]}</FormError>}
					</div>
				</div>
				<div>
					<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
						Name
					</label>
					<div className="mt-2">
						<Input color="slate" name="name" id="name" type="text" placeholder="Dave & Buster's" defaultValue={keyword?.name} />
						{errors.fieldErrors.name?.[0] && <FormError>{errors.fieldErrors.name?.[0]}</FormError>}
					</div>
				</div>
				<div>
					<AutoComplete
						name="category"
						color="slate"
						placeholder="Entertainment"
						label="Category"
						options={categories}
						value={category}
						onChange={setCategory}
						getPrimary={(category) => category}
					/>
					{errors.fieldErrors.category?.[0] && <FormError>{errors.fieldErrors.category?.[0]}</FormError>}
				</div>
			</div>
		</SlideOver>
	);
}

type Errors = z.inferFlattenedErrors<typeof FormSchema>;

const FormSchema = z.object({
	keyword: z.string().nonempty("Keyword is required"),
	name: z.string().nonempty("Name is required"),
	category: z.string({ required_error: "Category is required" }).nonempty("Category is required"),
});
