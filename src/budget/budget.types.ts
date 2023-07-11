import { z } from "zod";

import { NotionObjectSchema, NotionTagSchema } from "../shared/types";

export const BudgetItemSchema = NotionObjectSchema.extend({
	day: z.number().int().min(1).max(31).optional(),
	amount: z.number().safe(),
	dateType: z.enum(["Fixed", "End of Month"]),
	category: z.enum(["Bill", "Income", "Expense"]),
	tags: z.array(NotionTagSchema),
});

export type BudgetItem = z.infer<typeof BudgetItemSchema>;
