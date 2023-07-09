import { z } from "zod";

export const NotionTagSchema = z.object({
	name: z.string(),
	color: z.string(),
});

export const NotionObjectSchema = z.object({
	id: z.string().uuid(),

	name: z.string(),

	emoji: z.string().optional(),
	iconUri: z.string().url().optional().nullable(),
	pageUri: z.string().url().optional(),
	coverUri: z.string().url().optional(),
	databaseUri: z.string().url().optional(),
});

export const PageBaseSchema = z.object({
	pageNumber: z.number().nonnegative(),
	pageSize: z.number().nonnegative(),
	totalCount: z.number().nonnegative(),
	totalPages: z.number().nonnegative(),
	hasPreviousPage: z.boolean(),
	hasNextPage: z.boolean(),
});

export type Page<TModel> = z.infer<typeof PageBaseSchema> & { items: TModel[] };
