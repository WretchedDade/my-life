import { z } from "zod";
import { NotionObjectSchema, NotionTagSchema } from "./shared";

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
