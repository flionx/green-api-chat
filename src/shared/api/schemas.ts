import z from "zod";

export const stateInstanceSchema = z.object({
    stateInstance: z.string()
});

export const checkAccountSchema = z.object({
    exist: z.boolean(),
    chatId: z.string().nullish()
});

export const sendMessageSchema = z.object({
    idMessage: z.string()
});

export const notificationSchema = z.object({
    receiptId: z.number(),
    body: z.unknown()
});

export const webhookBodySchema = z.object({
    typeWebhook: z.string(),
    idMessage: z.string().optional(),
    timestamp: z.number().optional(),
    chatId: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
    senderData: z
        .object({
            chatId: z.string(),
            chatType: z.string().optional(),
            chatName: z.string().optional(),
            senderName: z.string().optional()
        })
        .optional(),
    messageData: z
        .object({
            typeMessage: z.string(),
            textMessageData: z.object({ textMessage: z.string() }).optional(),
            extendedTextMessageData: z.object({ text: z.string() }).optional()
        })
        .optional()
});
