import { z } from "zod";

import { useRef, useState } from "react";
import { useCreateBloodPressure } from "..";
import { FormError, Input, SlideOver } from "../../shared/components";

interface AddBloodPressureSlideOverProps {
	open: boolean;
	onClose: () => void;
}

export function AddBloodPressureSlideOver({ open, onClose }: AddBloodPressureSlideOverProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [errors, setErrors] = useState<Errors>({ formErrors: [], fieldErrors: {} });
	const { mutate, isLoading } = useCreateBloodPressure({ onSuccess: onClose });

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		console.log("onSubmit");
		e.preventDefault();

		const validationResult = validate(e.currentTarget);

		if (validationResult.success) {
			mutate(validationResult.data);
		} else {
			setErrors(validationResult.error.flatten());
		}
	}

	function onBlur(e: React.FormEvent<HTMLFormElement>) {
		const validationResult = validate(e.currentTarget);

		if (Object.keys(errors.fieldErrors).length !== 0)
			setErrors(validationResult.success ? { formErrors: [], fieldErrors: {} } : validationResult.error.flatten());
	}

	function onReset() {
		onClose();
	}

	return (
		<SlideOver
			ref={formRef}
			open={open}
			onClose={onClose}
			color="red"
			as="form"
			onBlur={onBlur}
			onReset={onReset}
			onSubmit={onSubmit}
			header={{ title: "Add Blood Pressure" }}
			footer={{
				actions: [
					{ text: "Cancel", variant: "secondary", type: "reset", disabled: isLoading },
					{ text: "Save Reading", type: "submit", isLoading },
				],
			}}>
			<div className="space-y-6 p-6">
				<div>
					<label htmlFor="systolic" className="block text-sm font-medium leading-6 text-gray-900">
						Systolic
					</label>
					<div className="mt-2">
						<Input color="red" name="systolic" id="systolic" type="number" />
						{errors.fieldErrors.systolic?.[0] && <FormError>{errors.fieldErrors.systolic?.[0]}</FormError>}
					</div>
				</div>
				<div>
					<label htmlFor="diastolic" className="block text-sm font-medium leading-6 text-gray-900">
						Diastolic
					</label>
					<div className="mt-2">
						<Input color="red" name="diastolic" id="diastolic" type="number" />
						{errors.fieldErrors.diastolic?.[0] && <FormError>{errors.fieldErrors.diastolic?.[0]}</FormError>}
					</div>
				</div>
				<div>
					<label htmlFor="heartRate" className="block text-sm font-medium leading-6 text-gray-900">
						Heart Rate
					</label>
					<div className="mt-2">
						<Input color="red" name="heartRate" id="heartRate" type="number" />
						{errors.fieldErrors.heartRate?.[0] && <FormError>{errors.fieldErrors.heartRate?.[0]}</FormError>}
					</div>
				</div>
			</div>
		</SlideOver>
	);
}

type Errors = z.inferFlattenedErrors<typeof bloodPressureFormSchema>;

const bloodPressureFormSchema = z.object({
	systolic: z.coerce.number().positive("Systolic must be a positive number."),
	diastolic: z.coerce.number().positive("Diastolic must be a positive number."),
	heartRate: z.coerce.number().positive("Heart Rate must be a positive number."),
});

function validate(form: HTMLFormElement) {
	const formData = new FormData(form);
	const formJson = Object.fromEntries(formData.entries());

	return bloodPressureFormSchema.safeParse(formJson);
}
