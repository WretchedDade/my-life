import classNames from "classnames";

interface FormErrorProps {
	className?: string;
}

export function FormError({ className, children }: React.PropsWithChildren<FormErrorProps>) {
	return <p className={classNames("mt-2 text-sm text-red-600", className)}>{children}</p>;
}
