type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
  trend?: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-800">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          {icon}
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2">

        {trend && (
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
            {trend}
          </span>
        )}

        <span className="text-[10px] text-slate-400">
          {description}
        </span>

      </div>

    </div>
  );
}