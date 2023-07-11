import { Button, ButtonProps } from "..";
import { ColorWaysKey } from "../../../ColorWays";

interface SlideOverFooterAction extends Omit<ButtonProps, "children" | "size" | "color"> {
	text: string;
}

export interface SlideOverFooterProps {
	color: ColorWaysKey;
	actions: SlideOverFooterAction[];
}

export function SlideOverFooter({ actions, color }: SlideOverFooterProps) {
	return (
		<div className="flex flex-shrink-0 justify-end gap-x-4 px-4 py-4">
			{actions.map(({ text, ...buttonProps }, i) => (
				<Button key={text + i} color={color} size="sm" {...buttonProps}>
					{text}
				</Button>
			))}
		</div>
	);
}
