import { useState } from "react";

export default function AdminHeader({ onLogout }: { onLogout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">

      {/* Mobile menu */}
      <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
        ☰
      </button>

      {/* Search */}
      <div className="hidden max-w-md flex-1 lg:block">

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search students, faculty..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
          />

        </div>

      </div>

      <div className="ml-auto flex items-center gap-3">

        {/* Notification */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100">
          ♢

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="h-7 w-px bg-slate-200" />

        {/* Admin */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-50"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
              AD
            </div>

            <div className="hidden text-left sm:block">

              <p className="text-xs font-bold text-slate-700">
                Administrator
              </p>

              <p className="text-[10px] text-slate-400">
                System Admin
              </p>

            </div>

            <span className="hidden text-xs text-slate-400 sm:block">
              ▼
            </span>

          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}