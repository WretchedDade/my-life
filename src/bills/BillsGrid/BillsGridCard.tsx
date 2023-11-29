import { IconExternalLink } from "@tabler/icons-react";

import { ActionIcon, Badge, Button, Card, Group, Text } from "@mantine/core";

import { format } from "../../shared/utils";
import { BillPayment } from "../Bills.types";
import { BillGridCardIcon } from "./BillGridCardIcon";

import { usePayBillMutation } from "../hooks/usePayBillMutation";
import classes from "./BillsGridCard.module.css";

export function BillsGridCard(props: BillsGridCardProps) {
	const payBillMutation = usePayBillMutation();

	if (isSkeleton(props)) return <></>;

	const { bill } = props;

	return (
		<Card shadow="xl" radius="md" p="md" className={classes.card}>
			{/* <Card.Section>
				<Image src={bill.coverUri} h={180} />
			</Card.Section> */}

			<Card.Section className={classes.section}>
				<Group>
					<BillGridCardIcon billPayment={bill} />
					<Text fz="lg" fw={500}>
						{bill.name.split(" - ")[0]}
					</Text>
				</Group>
				<Group gap={7} mt="md">
					{bill.tags?.map((tag) => (
						<Badge variant="dot" key={tag.name} color="green" tt="none" fw="500">
							{tag.name}
						</Badge>
					))}
				</Group>
			</Card.Section>

			<Card.Section className={classes.stats}>
				<div>
					<Text size="xs" c="dimmed">
						Amount
					</Text>
					<Text fw={500} size="sm">
						{format.asCurrency(bill.amount)}
					</Text>
				</div>
				<div>
					<Text size="xs" c="dimmed">
						Date Due
					</Text>
					<Text fw={500} size="sm">
						{format.asDateString(bill.dateDue, "medium")}
					</Text>
				</div>
			</Card.Section>

			<Group mt="xs">
				<Button
					loading={payBillMutation.isPending}
					loaderProps={{ type: "dots" }}
					variant="light"
					radius="md"
					style={{ flex: 1 }}
					onClick={() => payBillMutation.mutate(bill.id)}>
					Mark as Paid
				</Button>
				{bill.linkToPay != null && (
					<ActionIcon
						variant="gradient"
						gradient={{ from: "gray", to: "indigo", deg: 45 }}
						color="green"
						radius="md"
						size={36}
						onClick={() => window.open(bill.linkToPay, "_blank")}>
						<IconExternalLink />
					</ActionIcon>
				)}
			</Group>
		</Card>
	);
}

type BillsGridCardProps = { bill: BillPayment } | SkeletonProps;
type SkeletonProps = { skeleton: true };

function isSkeleton(props: BillsGridCardProps): props is SkeletonProps {
	return (props as SkeletonProps).skeleton === true;
}
