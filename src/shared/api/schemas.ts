import z from "zod";

export const stateInstanceSchema = z.object({
    stateInstance: z.string()
});

export const checkAccountSchema = z.object({
    exist: z.boolean(),
    chatId: z.string().nullish()
});
