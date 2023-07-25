import { z } from "zod";

import { NotionObjectSchema, NotionTagSchema, PageBaseSchema } from "../shared/types";

export const BudgetItemSchema = NotionObjectSchema.extend({
	day: z.number().int().min(1).max(31).optional(),
	amount: z.number().safe(),
	dateType: z.enum(["Fixed", "End of Month"]),
	category: z.enum(["Bill", "Income", "Expense"]),
	tags: z.array(NotionTagSchema),
	isIncome: z.boolean(),
});

export type BudgetItem = z.infer<typeof BudgetItemSchema>;
export type BudgetItemWithRunningTotal = BudgetItem & { runningTotal: number };

export const KeywordSchema = z.object({
	name: z.string(),
	keyword: z.string(),
	category: z.string(),
	lastModifiedOn: z.coerce.date(),
});

export const KeywordPageSchema = PageBaseSchema.extend({
	items: z.array(KeywordSchema),
});

export type Keyword = z.infer<typeof KeywordSchema>;
