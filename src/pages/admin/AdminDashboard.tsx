import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import RecentActivity from "../../components/admin/RecentActivity";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <div className="lg:pl-64">

        <AdminHeader />

        <main className="p-5 sm:p-8">

          {/* Page Header */}
          <div className="mb-8">

            <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              Overview
            </p>

            <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                  Dashboard
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                  Here's what's happening in your college today.
                </p>
              </div>

              <div className="text-xs text-slate-400">
                Academic Year 2026–27
              </div>

            </div>

          </div>

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Students"
              value="1,248"
              description="from last month"
              trend="+8.2%"
              icon="♙"
            />

            <StatCard
              title="Total Faculty"
              value="86"
              description="from last month"
              trend="+3.1%"
              icon="♙"
            />

            <StatCard
              title="Today's Attendance"
              value="92.4%"
              description="across all classes"
              trend="+2.4%"
              icon="✓"
            />

            <StatCard
              title="Resources"
              value="324"
              description="total uploaded"
              trend="+12"
              icon="▣"
            />

          </div>

          {/* Main Grid */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

            {/* Attendance Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Attendance Overview
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Today's attendance by department
                  </p>
                </div>

                <select className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-500 outline-none">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>

              </div>

              <div className="mt-7 space-y-5">

                <AttendanceBar
                  department="Computer Science"
                  percentage={94}
                />

                <AttendanceBar
                  department="Information Technology"
                  percentage={91}
                />

                <AttendanceBar
                  department="Electronics"
                  percentage={88}
                />

                <AttendanceBar
                  department="Mechanical"
                  percentage={86}
                />

              </div>

            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Quick Actions
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Frequently used management tools
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <QuickAction
                  icon="+"
                  title="Add Student"
                />

                <QuickAction
                  icon="+"
                  title="Add Faculty"
                />

                <QuickAction
                  icon="▦"
                  title="Timetable"
                />

                <QuickAction
                  icon="▣"
                  title="Resources"
                />

              </div>

            </div>

          </div>

          {/* Bottom Section */}
          <div className="mt-6 grid gap-6 xl:grid-cols-2">

            <RecentActivity />

            {/* System Status */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-5 py-4">

                <h3 className="text-sm font-bold text-slate-800">
                  System Status
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Current platform status
                </p>

              </div>

              <div className="grid grid-cols-2 gap-px bg-slate-100">

                <StatusItem
                  title="Database"
                  status="Operational"
                />

                <StatusItem
                  title="API Server"
                  status="Operational"
                />

                <StatusItem
                  title="Authentication"
                  status="Operational"
                />

                <StatusItem
                  title="File Storage"
                  status="Operational"
                />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

/* =========================
   ATTENDANCE BAR
========================= */

function AttendanceBar({
  department,
  percentage,
}: {
  department: string;
  percentage: number;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs font-medium text-slate-600">
          {department}
        </span>

        <span className="text-xs font-bold text-slate-700">
          {percentage}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-sky-500 transition-all"
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  );
}

/* =========================
   QUICK ACTION
========================= */

function QuickAction({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <button className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 p-4 transition hover:border-sky-200 hover:bg-sky-50">

      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500 transition group-hover:bg-sky-100 group-hover:text-sky-600">
        {icon}
      </span>

      <span className="mt-2 text-[10px] font-semibold text-slate-600">
        {title}
      </span>

    </button>
  );
}

/* =========================
   STATUS
========================= */

function StatusItem({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="bg-white p-5">

      <div className="flex items-center gap-2">

        <span className="h-2 w-2 rounded-full bg-emerald-500" />

        <span className="text-xs font-semibold text-slate-700">
          {title}
        </span>

      </div>

      <p className="mt-2 text-[10px] text-emerald-600">
        {status}
      </p>

    </div>
  );
}