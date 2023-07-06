import { z } from "zod";
import { NotionObjectSchema, NotionTagSchema } from "./shared";

export const BillConfigurationSchema = NotionObjectSchema.extend({
	dayDue: z.number().int().min(1).max(31).optional(),
	amount: z.number().safe(),
	isAutoPay: z.boolean(),
	dayDueType: z.enum(["Fixed", "EndOfMonth"]),
	tags: z.array(NotionTagSchema).optional(),
	linkToPay: z.string().url().optional(),
});

export type BillConfiguration = z.infer<typeof BillConfigurationSchema>;
