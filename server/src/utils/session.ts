import { createHash, randomBytes } from "node:crypto";
import type { CookieOptions } from "express";
import {
  REMEMBER_ME_TTL_MS,
  SESSION_COOKIE_NAME,
  SESSION_TTL_MS,
  isProduction,
} from "../config/auth.js";

export { SESSION_COOKIE_NAME };

/** 256-bit opaque token, hex-encoded (64 chars). */
export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/** SHA-256 hash of the token — what we persist in the DB. */
export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function sessionExpiry(rememberMe: boolean): Date {
  const ttl = rememberMe ? REMEMBER_ME_TTL_MS : SESSION_TTL_MS;
  return new Date(Date.now() + ttl);
}

export function sessionCookieOptions(rememberMe: boolean): CookieOptions {
  const ttl = rememberMe ? REMEMBER_ME_TTL_MS : SESSION_TTL_MS;
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: ttl,
  };
}

export function clearSessionCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  };
}
