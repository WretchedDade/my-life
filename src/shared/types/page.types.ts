import { z } from "zod";

export const PageBaseSchema = z.object({
	pageNumber: z.number().nonnegative(),
	pageSize: z.number().nonnegative(),
	totalCount: z.number().nonnegative(),
	totalPages: z.number().nonnegative(),
	hasPreviousPage: z.boolean(),
	hasNextPage: z.boolean(),
});

export type PageMetadata = z.infer<typeof PageBaseSchema>;
export type PageItems<TModel> = { items: TModel[] };
export type Page<TModel> = PageMetadata & PageItems<TModel>;
