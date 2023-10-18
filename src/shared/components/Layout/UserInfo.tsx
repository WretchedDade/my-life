import { IconBulbFilled, IconBulbOff } from "@tabler/icons-react";

import { ActionIcon, Avatar, Group, Skeleton, Text, useMantineColorScheme } from "@mantine/core";

import classes from "./UserInfo.module.css";

import { useProfile } from "./useProfile";
import { useProfilePhoto } from "./useProfilePhoto";

export function UserInfo() {
	const profile = useProfile();
	const profilePhoto = useProfilePhoto();

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Group justify="space-between">
			<Group wrap="nowrap">
				<Avatar color="blue" src={profilePhoto.data} size="md" radius="md" />
				{profile.isLoading ? (
					<Skeleton>Obi-Wan Kenobi</Skeleton>
				) : (
					<Text fz="lg" fw={500} className={classes.name}>
						{profile.data?.displayName}
					</Text>
				)}
			</Group>
			{colorScheme !== "auto" && (
				<ActionIcon
					size="lg"
					variant={colorScheme === "light" ? "filled" : "subtle"}
					mr="lg"
					color={colorScheme === "light" ? "yellow" : "gray"}
					onClick={toggleColorScheme}>
					{colorScheme === "dark" && <IconBulbOff />}
					{colorScheme === "light" && <IconBulbFilled />}
				</ActionIcon>
			)}
		</Group>
	);
}
