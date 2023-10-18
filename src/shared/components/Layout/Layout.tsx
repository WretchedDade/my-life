import { Outlet } from "react-router-dom";

import { AppShell, Burger, Group, ScrollArea, Text, ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import { IconHome } from "@tabler/icons-react";

import { Links } from "./Links";
import { LinksGroup } from "./LinksGroup";
import { UserInfo } from "./UserInfo";

import classes from "./Layout.module.css";

export function Layout() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

	const { colorScheme } = useMantineColorScheme();

	return (
		<>
			<Notifications position="top-right" />
			<AppShell
				header={{ height: 60 }}
				navbar={{
					width: 300,
					breakpoint: "sm",
					collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
				}}
				padding="md">
				<AppShell.Header>
					<Group h="100%" px="md">
						<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
						<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
						<ThemeIcon size="lg" variant="gradient" gradient={{ from: "gray", to: "blue", deg: 135 }}>
							<IconHome />
						</ThemeIcon>
						<Text size="xl" fw="bold">
							My Life
						</Text>
					</Group>
				</AppShell.Header>
				<AppShell.Navbar px="md" className={classes.navbar}>
					<ScrollArea className={classes.links}>
						<div className={classes.linksInner}>
							{Links.map((item) => (
								<LinksGroup {...item} key={item.label} />
							))}
						</div>
					</ScrollArea>
					<div className={classes.footer}>
						<UserInfo />
					</div>
				</AppShell.Navbar>
				<AppShell.Main bg={colorScheme === "light" ? "gray.1" : "dark.8"}>
					<Outlet />
				</AppShell.Main>
			</AppShell>
		</>
	);
}
