export const SESSION_COOKIE_NAME = "premier.sid";

export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
export const REMEMBER_ME_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export const LOGIN_RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const LOGIN_RATE_MAX = 20; // attempts per IP per window

export const isProduction = process.env.NODE_ENV === "production";
