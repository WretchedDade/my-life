import classNames from "classnames";

interface CircularButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size: "Small" | "Medium" | "Large";
}

export function CircularButton({ className, size, children, ...buttonProps }: React.PropsWithChildren<CircularButtonProps>) {
  return (
    <button
      type="button"
      {...buttonProps}
      className={classNames(
        "rounded-full p-2 text-blue-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300",
        {
          "p-1": size === "Small",
          "p-1.5": size === "Medium",
          "p-2": size === "Large",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
