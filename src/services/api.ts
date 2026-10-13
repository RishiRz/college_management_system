export type UserRole = "ADMIN" | "FACULTY" | "STUDENT";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  const body = (await res.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    data?: T;
  } | null;

  if (!res.ok || !body?.success) {
    const fieldError = body?.errors
      ? Object.values(body.errors).flat()[0]
      : undefined;
    throw new Error(fieldError || body?.message || "Request failed");
  }

  return (body.data ?? (body as unknown as T)) as T;
}

export const authApi = {
  login(data: { email: string; password: string; rememberMe: boolean }) {
    return request<{ user: AuthUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  me() {
    return request<{ user: AuthUser }>("/api/auth/me");
  },
  logout() {
    return request("/api/auth/logout", { method: "POST" });
  },
  logoutAll() {
    return request("/api/auth/logout-all", { method: "POST" });
  },
};

