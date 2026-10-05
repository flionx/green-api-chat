import z from "zod";
import { call, type Credentials } from "./http";
import {
    checkAccountSchema,
    notificationSchema,
    sendMessageSchema,
    stateInstanceSchema
} from "./schemas";

export const getStateInstance = (creds: Credentials) =>
    call(creds, "getStateInstance", stateInstanceSchema);

export const checkAccount = (creds: Credentials, phone: string) =>
    call(creds, "checkAccount", checkAccountSchema, {
        method: "POST",
        body: { phoneNumber: Number(phone) }
    });

export const sendMessage = (creds: Credentials, chatId: string, message: string) =>
    call(creds, "sendMessage", sendMessageSchema, {
        method: "POST",
        body: { chatId, message }
    });

export const receiveNotification = (creds: Credentials, signal: AbortSignal) =>
    call(creds, "receiveNotification", notificationSchema.nullable(), {
        query: { receiveTimeout: 20 },
        signal
    });

export const deleteNotification = (creds: Credentials, receiptId: number, signal: AbortSignal) =>
    call(creds, "deleteNotification", z.unknown(), {
        method: "DELETE",
        tail: `/${receiptId}`,
        signal
    });
