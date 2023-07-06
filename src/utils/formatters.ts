export function asCurrency(value: number | undefined) {
	if (value === undefined) {
		return "";
	}

	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function asFullDate(value: string | undefined | Date) {
	if (value === undefined) {
		return "";
	}

	const date = value instanceof Date ? value : new Date(value);

	return new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);
}
