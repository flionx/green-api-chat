import z from "zod";

export const stateInstanceSchema = z.object({
    stateInstance: z.string()
});
