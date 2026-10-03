import { call, type Credentials } from "./http";
import { stateInstanceSchema } from "./schemas";

export const getStateInstance = (creds: Credentials) =>
    call(creds, "getStateInstance", stateInstanceSchema);
