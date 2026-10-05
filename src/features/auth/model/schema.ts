import z from "zod";

export const loginSchema = z.object({
    idInstance: z
        .string()
        .trim()
        .regex(/^\d{4,}$/, "idInstance состоит только из цифр"),
    apiTokenInstance: z.string().trim().min(1, "Введите apiTokenInstance"),
    apiUrl: z.union([z.literal(""), z.url("Некорректный адрес API")])
});
