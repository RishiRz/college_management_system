import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { RequireAuth } from "./components/RequireAuth";

function Shell() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600" />
          Loading…
        </div>
      </div>
    );
  }

  if (!user) return <Login />;

  if (user.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-lg font-bold text-slate-800">Access pending</h1>
          <p className="mt-2 text-sm text-slate-500">
            Signed in as {user.email} ({user.role.toLowerCase()}). The faculty
            portal is not wired up yet.
          </p>
          <button
            onClick={() => void logout()}
            className="mt-6 h-11 w-full rounded-xl bg-slate-800 text-sm font-bold text-white hover:bg-slate-900"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <AdminDashboard onLogout={() => void logout()} />
    </RequireAuth>
  );
}

function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

export default App;
