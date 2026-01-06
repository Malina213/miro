import { setupWorker } from "msw/browser";
import { boardsHandlers } from "./handlers";
import { authHandlers } from "./handlers/auth";

export const worker = setupWorker(...boardsHandlers, ...authHandlers);
