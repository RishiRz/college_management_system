import { prisma } from "../lib/prisma.js";
import type { UserRole } from "../generated/prisma/enums.js";
import {
  generateSessionToken,
  hashSessionToken,
  sessionExpiry,
} from "../utils/session.js";
import { verifyPassword } from "../utils/password.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface LoginResult {
  user: AuthenticatedUser;
  sessionToken: string;
  expiresAt: Date;
}

const GENERIC_AUTH_ERROR = "Invalid email or password";

/**
 * Dummy Argon2 hash used for timing-safe failure when the user does not
 * exist — keeps existent vs non-existent account timing indistinguishable.
 * This is a valid Argon2id hash of a random secret.
 */
const DUMMY_HASH =
  "$argon2id$v=19$m=19456,t=2,p=1$RGVmYXVsdER1bW15U2FsdA$hpg7Jo9gar3kM5o5HqG5Q3nT6p2v8Qd0ZkY9w0u0u0w";

export async function loginUser(
  email: string,
  password: string,
  rememberMe: boolean,
  context: { ipAddress?: string; userAgent?: string },
): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, email: true, passwordHash: true, role: true },
  });

  // Always run an Argon2 verification to avoid user-enumeration via timing.
  const ok = await verifyPassword(
    user?.passwordHash ?? DUMMY_HASH,
    password,
  );

  if (!user || !ok) {
    throw new AuthError(GENERIC_AUTH_ERROR, 401);
  }

  const sessionToken = generateSessionToken();
  const expiresAt = sessionExpiry(rememberMe);

  await prisma.session.create({
    data: {
      tokenHash: hashSessionToken(sessionToken),
      userId: user.id,
      expiresAt,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    },
  });

  // Opportunistically prune expired sessions for this user.
  void prisma.session
    .deleteMany({ where: { userId: user.id, expiresAt: { lt: new Date() } } })
    .catch(() => undefined);

  return {
    user: { id: user.id, email: user.email, role: user.role },
    sessionToken,
    expiresAt,
  };
}

export async function logoutSession(tokenHash: string): Promise<void> {
  await prisma.session.delete({ where: { tokenHash } }).catch(() => undefined);
}

export async function logoutAllSessions(userId: string): Promise<number> {
  const result = await prisma.session.deleteMany({ where: { userId } });
  return result.count;
}

export class AuthError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}
