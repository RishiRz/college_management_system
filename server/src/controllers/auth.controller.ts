import type { Request, Response } from "express";
import { SESSION_COOKIE_NAME } from "../config/auth.js";
import { loginSchema } from "../schemas/auth.schema.js";
import {
  AuthError,
  loginUser,
  logoutAllSessions,
  logoutSession,
} from "../services/auth.service.js";
import {
  clearSessionCookieOptions,
  sessionCookieOptions,
} from "../utils/session.js";

function clientIp(req: Request): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim();
  }
  return req.ip;
}

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const { email, password, rememberMe } = parsed.data;

    const result = await loginUser(email, password, rememberMe, {
      ipAddress: clientIp(req),
      userAgent: req.headers["user-agent"],
    });

    res.cookie(SESSION_COOKIE_NAME, result.sessionToken, sessionCookieOptions(rememberMe));

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user: result.user },
    });
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(err.statusCode).json({ success: false, message: err.message });
      return;
    }
    res.status(500).json({ success: false, message: "Login failed" });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    if (req.sessionTokenHash) {
      await logoutSession(req.sessionTokenHash);
    }
  } finally {
    res.clearCookie(SESSION_COOKIE_NAME, clearSessionCookieOptions());
    // Always return 200 so the client can deterministically clear state.
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }
}

export async function logoutAll(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Not authenticated" });
    return;
  }

  await logoutAllSessions(req.user.id);
  res.clearCookie(SESSION_COOKIE_NAME, clearSessionCookieOptions());
  res.status(200).json({ success: true, message: "Logged out of all sessions" });
}

export function me(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Not authenticated" });
    return;
  }
  res.status(200).json({ success: true, data: { user: req.user } });
}
