import { call, type Credentials } from "./http";
import { checkAccountSchema, sendMessageSchema, stateInstanceSchema } from "./schemas";

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
