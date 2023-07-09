import { useState } from "react";
import { z } from "zod";

import { useLogBloodPressureReading } from "./useLogBloodPressureReading";

export function useBloodPressureForm() {
	const [errors, setErrors] = useState<Errors>({ formErrors: [], fieldErrors: {} });
	const { mutate: LogBloodPressureReading } = useLogBloodPressureReading();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const validationResult = validate(e.currentTarget);

		if (validationResult.success) {
			LogBloodPressureReading(validationResult.data);
		} else {
			setErrors(validationResult.error.flatten());
		}
	}

	function onBlur(e: React.FormEvent<HTMLFormElement>) {
		const validationResult = validate(e.currentTarget);

		if (Object.keys(errors.fieldErrors).length !== 0)
			setErrors(validationResult.success ? { formErrors: [], fieldErrors: {} } : validationResult.error.flatten());
	}

	return { onSubmit, onBlur, errors };
}

type Errors = z.inferFlattenedErrors<typeof bloodPressureFormSchema>;

const bloodPressureFormSchema = z.object({
	systolic: z.coerce.number().positive(),
	diastolic: z.coerce.number().positive(),
	heartRate: z.coerce.number().positive(),
});

function validate(form: HTMLFormElement) {
	const formData = new FormData(form);
	const formJson = Object.fromEntries(formData.entries());

	return bloodPressureFormSchema.safeParse(formJson);
}
