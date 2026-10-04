import { call, type Credentials } from "./http";
import { checkAccountSchema, stateInstanceSchema } from "./schemas";

export const getStateInstance = (creds: Credentials) =>
    call(creds, "getStateInstance", stateInstanceSchema);

export const checkAccount = (creds: Credentials, phone: string) =>
    call(creds, "checkAccount", checkAccountSchema, {
        method: "POST",
        body: { phoneNumber: Number(phone) }
    });
