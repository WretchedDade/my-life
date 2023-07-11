import { z } from "zod";

export const PageBaseSchema = z.object({
	pageNumber: z.number().nonnegative(),
	pageSize: z.number().nonnegative(),
	totalCount: z.number().nonnegative(),
	totalPages: z.number().nonnegative(),
	hasPreviousPage: z.boolean(),
	hasNextPage: z.boolean(),
});

export type Page<TModel> = z.infer<typeof PageBaseSchema> & { items: TModel[] };
