import { Logger } from "@ghom/logger";

export const fetchLogger = new Logger({section: "fetch"})
export const createLogger = new Logger({section: "create"})
export const deleteLogger = new Logger({section: "delete"})

