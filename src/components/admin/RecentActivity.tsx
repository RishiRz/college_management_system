const activities = [
  {
    title: "New student added",
    description: "Rahul Sharma was added to CSE Section A",
    time: "10 min ago",
    icon: "+",
  },
  {
    title: "Faculty profile updated",
    description: "Dr. Anil Sharma's profile was updated",
    time: "32 min ago",
    icon: "✓",
  },
  {
    title: "Resource uploaded",
    description: "Computer Networks notes were uploaded",
    time: "1 hour ago",
    icon: "▣",
  },
  {
    title: "Timetable updated",
    description: "CSE Semester 5 timetable was modified",
    time: "2 hours ago",
    icon: "▦",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Recent Activity
          </h3>

          <p className="mt-1 text-[10px] text-slate-400">
            Latest system activities
          </p>
        </div>

        <button className="text-[11px] font-semibold text-sky-600 hover:underline">
          View all
        </button>

      </div>

      <div className="divide-y divide-slate-100">

        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center gap-4 px-5 py-4"
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
              {activity.icon}
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-semibold text-slate-700">
                {activity.title}
              </p>

              <p className="mt-1 truncate text-[10px] text-slate-400">
                {activity.description}
              </p>

            </div>

            <span className="shrink-0 text-[10px] text-slate-400">
              {activity.time}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}