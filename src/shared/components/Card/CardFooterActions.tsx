import classNames from "classnames";

import { CardFooterProps } from ".";

import { Button, ButtonProps } from "..";
import { ColorWay } from "../../../ColorWays";

export interface CardFooterAction extends Omit<ButtonProps, "children" | "size" | "color"> {
	text: string;
}

interface CardFooterActionsProps extends CardFooterProps {
	actions: CardFooterAction[];
	colorWay: ColorWay;
}

export function CardFooterActions({ actions, colorWay, isRefreshing, isLoading }: CardFooterActionsProps) {
	return (
		<div className={classNames(colorWay.card.footer)}>
			<div className="flex justify-end gap-x-4">
				{actions.map(({ text, ...buttonProps }, i) => (
					<Button key={text + i} color={colorWay.color} size="sm" {...buttonProps} disabled={isRefreshing || isLoading || buttonProps.disabled}>
						{text}
					</Button>
				))}
			</div>
		</div>
	);
}
