import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { SESSION_COOKIE_NAME, hashSessionToken } from "../utils/session.js";
import type { UserRole } from "../generated/prisma/enums.js";

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
      sessionTokenHash?: string;
    }
  }
}

function readToken(req: Request): string | undefined {
  const raw = req.cookies?.[SESSION_COOKIE_NAME];
  if (typeof raw !== "string" || raw.length === 0) return undefined;
  return raw;
}

/**
 * Loads the session user when a valid, unexpired cookie is present.
 * Does NOT reject anonymous requests — use `requireAuth` for that.
 * Attaches `req.user` and rotates nothing (rotation happens at login).
 */
export async function loadSession(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = readToken(req);
    if (!token) return next();

    const tokenHash = hashSessionToken(token);

    const session = await prisma.session.findUnique({
      where: { tokenHash },
      include: {
        user: { select: { id: true, email: true, role: true } },
      },
    });

    if (!session) return next();

    if (session.expiresAt.getTime() <= Date.now()) {
      await prisma.session.delete({ where: { tokenHash } }).catch(() => undefined);
      return next();
    }

    req.user = session.user;
    req.sessionTokenHash = tokenHash;
    return next();
  } catch {
    return next();
  }
}

/** Rejects requests without a loaded session. Must run after `loadSession`. */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Not authenticated" });
    return;
  }
  next();
}

/** Role gate — must run after `requireAuth`. */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
  };
}
