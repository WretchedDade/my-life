export * from './format';

export const getFormData = (form: HTMLFormElement, additionalData: Record<string, unknown> = {}) => {
	const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

	return {...formJson, ...additionalData};
}