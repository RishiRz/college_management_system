import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

type Role = "ADMIN" | "FACULTY";

export default function Login() {
  const { login } = useAuth();
  const [role, setRole] = useState<Role>("ADMIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const user = await login(email.trim(), password, rememberMe);

      // The role toggle is a UI hint — the server is authoritative.
      // Warn if the account's actual role differs from the selected tab.
      if (user.role !== role) {
        setError(
          `This account is registered as ${user.role.toLowerCase()}. You selected ${role.toLowerCase()}.`,
        );
      }
      // On success, AuthProvider holds the user and App routes away
      // from /login automatically. No alert, no password logging.
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-0 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-screen max-w-6xl overflow-hidden bg-white shadow-2xl sm:min-h-[680px] sm:rounded-3xl lg:grid-cols-[44%_56%]">

        {/* ================= LEFT BRANDING ================= */}

        <section className="relative hidden overflow-hidden bg-[#102a43] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative circles */}
          <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full border border-white/10" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-extrabold tracking-tight text-[#102a43] shadow-lg">
                CM
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              College Management
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              Management Portal
            </p>

            {/* Main message */}
            <div className="mt-24 max-w-md">

              <div className="mb-6 h-1 w-10 rounded-full bg-sky-400" />

              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                Manage your college{" "}
                <span className="text-sky-400">smarter.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                A centralized platform for managing students, faculty,
                attendance, academic resources and college information.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-4">

              <Feature text="Student & Faculty Management" />

              <Feature text="Smart Attendance Management" />

              <Feature text="Academic Resources" />

              <Feature text="Centralized College Data" />

            </div>
          </div>

          <p className="relative z-10 text-xs text-slate-500">
            © 2026 College Management System
          </p>
        </section>

        {/* ================= RIGHT LOGIN ================= */}

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#102a43] text-sm font-bold text-white">
                CM
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  College Management
                </p>

                <p className="text-xs text-slate-500">
                  Management Portal
                </p>
              </div>

            </div>

            {/* Header */}
            <div className="mb-8">

              <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-sky-600">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access the college management
                portal.
              </p>

            </div>

            {/* Role */}
            <div className="mb-6">

              <label className="mb-2 block text-xs font-bold text-slate-700">
                Login as
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Admin */}
                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    role === "ADMIN"
                      ? "border-sky-600 bg-sky-50 ring-1 ring-sky-600"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${
                        role === "ADMIN"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      ♙
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Administrator
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Manage college
                      </p>
                    </div>

                  </div>
                </button>

                {/* Faculty */}
                <button
                  type="button"
                  onClick={() => setRole("FACULTY")}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    role === "FACULTY"
                      ? "border-sky-600 bg-sky-50 ring-1 ring-sky-600"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${
                        role === "FACULTY"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      ♙
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Faculty
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Manage classes
                      </p>
                    </div>

                  </div>
                </button>

              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  !
                </span>

                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-5">

                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10"
                  />

                </div>
              </div>

              {/* Password */}
              <div className="mb-5">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password recovery will be added later.")
                    }
                    className="text-[11px] font-semibold text-sky-600 hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                    ●
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-16 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold text-sky-600 hover:text-sky-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* Remember me */}
              <label className="mb-6 flex cursor-pointer items-center gap-2 text-xs text-slate-500">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-sky-600"
                />

                Remember me

              </label>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-sky-600 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="text-lg font-normal">→</span>
                  </>
                )}
              </button>

            </form>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-center text-[10px] text-slate-400">
              <span>🔒</span>
              <span>
                Your connection is secure. Authorized users only.
              </span>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================
   FEATURE COMPONENT
========================= */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-400/15 text-[11px] font-bold text-sky-400">
        ✓
      </span>

      {text}
    </div>
  );
}