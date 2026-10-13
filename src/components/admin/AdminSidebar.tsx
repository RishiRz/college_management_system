import { useState } from "react";

type MenuItem = {
  label: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "⌂",
  },
  {
    label: "Students",
    icon: "♙",
  },
  {
    label: "Faculty",
    icon: "♙",
  },
  {
    label: "Attendance",
    icon: "✓",
  },
  {
    label: "Resources",
    icon: "▣",
  },
  {
    label: "Timetable",
    icon: "▦",
  },
];

export default function AdminSidebar({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white shadow-sm">
          CM
        </div>

        <div>
          <h1 className="text-sm font-bold text-slate-800">
            College Management
          </h1>

          <p className="text-[10px] text-slate-400">
            Admin Portal
          </p>
        </div>

      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-1">

          {menuItems.map((item) => {

            const active = activeItem === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                    active
                      ? "bg-sky-100 text-sky-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {item.icon}
                </span>

                {item.label}

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-600" />
                )}

              </button>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-4">

        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            ↪
          </span>

          Logout

        </button>

      </div>

    </aside>
  );
}