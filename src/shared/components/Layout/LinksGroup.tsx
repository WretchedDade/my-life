import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Box, Collapse, Group, MantineColor, Text, ThemeIcon, UnstyledButton, rem } from "@mantine/core";
import { Icon, IconChevronRight } from "@tabler/icons-react";

import classes from "./LinksGroup.module.css";

export type LinksGroupProps = LinksGroupWithoutChildrenProps | LinksGroupWithChildrenProps;

type LinksGroupBaseProps = {
	icon: Icon;
	label: string;

	color?: MantineColor;

	initiallyOpened?: boolean;
};

type LinksGroupWithoutChildrenProps = LinksGroupBaseProps & {
	link: string;
};

type LinksGroupWithChildrenProps = LinksGroupBaseProps & {
	links: Array<{ label: string; link: string }>;
};

export function LinksGroup(props: LinksGroupProps) {
	const [opened, setOpened] = useState(props.initiallyOpened ?? false);

	if (hasLinks(props)) {
		return (
			<>
				<UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
					<Group justify="space-between" gap={0}>
						<Box style={{ display: "flex", alignItems: "center" }}>
							<ThemeIcon variant="light" size={30}>
								<props.icon style={{ width: rem(18), height: rem(18) }} />
							</ThemeIcon>
							<Box ml="md">{props.label}</Box>
						</Box>
						<IconChevronRight
							className={classes.chevron}
							stroke={1.5}
							style={{
								width: rem(16),
								height: rem(16),
								transform: opened ? "rotate(-90deg)" : "none",
							}}
						/>
					</Group>
				</UnstyledButton>

				<Collapse in={opened}>
					{props.links.map((link) => (
						<Text<"a"> component="a" className={classes.link} href={link.link} key={link.label} onClick={(event) => event.preventDefault()}>
							{link.label}
						</Text>
					))}
				</Collapse>
			</>
		);
	}

	return (
		<>
			<NavLink to={props.link} className={classes.control}>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<props.icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Box ml="md">{props.label}</Box>
					</Box>
				</Group>
			</NavLink>
		</>
	);
}

function hasLinks(props: LinksGroupProps): props is LinksGroupWithChildrenProps {
	return (props as LinksGroupWithoutChildrenProps).link === undefined;
}
