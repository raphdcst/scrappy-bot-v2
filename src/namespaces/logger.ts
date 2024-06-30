import { Logger } from "@ghom/logger";

export const fetchLogger = new Logger({section: "fetch"})
export const createLogger = new Logger({section: "create"})
export const deleteLogger = new Logger({section: "delete"})
export const sendLogger = new Logger({section: "send"})
export const userAgentLogger = new Logger({section: "user-agent"})
export const HTTPLogger = new Logger({section: "HTTP"})
export const commandLogger = new Logger({section: "command"})


