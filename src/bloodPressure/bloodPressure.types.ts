import { z } from "zod";
import { PageBaseSchema } from "../shared/types";

export const BloodPressureReadingSchema = z.object({
	id: z.string().uuid(),
	systolic: z.number(),
	diastolic: z.number(),
	heartRate: z.number().optional(),
	timeAtReading: z.coerce.date(),
});

export const BloodPressureReadingPageSchema = PageBaseSchema.extend({
	items: z.array(BloodPressureReadingSchema),
});

export type BloodPressureReading = z.infer<typeof BloodPressureReadingSchema>;
