import classNames from "classnames";
import { useBloodPressureForm } from "../../hooks/useBloodPressureForm";
import { Card, CardFooterAction, CardFooterActions } from "../Card";

export function BloodPressureDashboardForm() {
	const { formRef, onSubmit, onBlur, errors } = useBloodPressureForm();

	const actions: CardFooterAction[] = [
		{ text: "Reset", type: "reset", variant: "secondary" },
		{ text: "Submit", type: "submit" },
	];

	return (
		<form ref={formRef} autoComplete="off" onSubmit={onSubmit} onBlur={onBlur}>
			<Card title="Track your Blood Pressure" footer={({ colorWay }) => <CardFooterActions colorWay={colorWay} actions={actions} />} color="red">
				<div className="grid grid-cols-3 items-end gap-4">
					<FormControl label="Systolic" name="systolic" error={errors.fieldErrors.systolic?.[0]} />
					<FormControl label="Diastolic" name="diastolic" error={errors.fieldErrors.diastolic?.[0]} />
					<FormControl label="Heart Rate" name="heartRate" error={errors.fieldErrors.heartRate?.[0]} />
				</div>
			</Card>
		</form>
	);
}

interface FormControlProps {
	name: string;
	label: string;
	error?: string;
	color?: string;
}

function FormControl({ name, label, error }: FormControlProps) {
	return (
		<div>
			<label htmlFor={name} className={classNames("block text-xs font-medium leading-6 text-gray-600", { "text-red-600": error })}>
				{label}
			</label>
			<input
				type="number"
				name={name}
				id={name}
				className={classNames(
					"block w-3/4 rounded-md border-0 p-1.5 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:leading-6",
					{
						"ring-red-900 focus:ring-red-900": error,
					},
				)}
			/>
		</div>
	);
}
