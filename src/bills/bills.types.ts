import { z } from "zod";
import { NotionObjectSchema, NotionTagSchema } from "../shared/types/notion.types";

export const BillPaymentSchema = NotionObjectSchema.extend({
	isPaid: z.boolean(),
	isAutoPay: z.boolean(),
	linkToPay: z.string().url().optional(),

	amount: z.number().safe().optional(),

	dateDue: z.coerce.date(),
	datePaid: z.coerce.date().optional(),

	tags: z.array(NotionTagSchema).optional(),

	billConfigurationId: z.string().uuid(),
});

export type BillPayment = z.infer<typeof BillPaymentSchema>;

export const BillConfigurationSchema = NotionObjectSchema.extend({
	dayDue: z.number().int().min(1).max(31).optional(),
	amount: z.number().safe(),
	isAutoPay: z.boolean(),
	dayDueType: z.enum(["Fixed", "EndOfMonth"]),
	tags: z.array(NotionTagSchema).optional(),
	linkToPay: z.string().url().optional(),
});

export type BillConfiguration = z.infer<typeof BillConfigurationSchema>;

export type BillFilter = "Unpaid" | "ThisWeek" | "NextWeek";
