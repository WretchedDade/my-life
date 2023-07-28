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

export const AccountActivityItemSchema = z.object({
	name: z.string(),
	fullName: z.string(),
	amount: z.number(),
	category: z.string(),
	date: z.coerce.date(),
	id: z.string(),
	lastModifiedOn: z.coerce.date(),
	hasShortName: z.boolean(),
});

export type AccountActivityItem = z.infer<typeof AccountActivityItemSchema>;

export const AccountActivityPageSchema = PageBaseSchema.extend({
	items: z.array(AccountActivityItemSchema),
});

export const AccountActivityHistorySchema = z.object({
	expenses: z.record(z.number()),
	income: z.record(z.number()),
});

export type AccountActivityHistory = z.infer<typeof AccountActivityHistorySchema>;
