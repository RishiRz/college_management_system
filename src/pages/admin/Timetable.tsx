import { useMemo, useState } from "react";

type TimetableStatus = "Active" | "Cancelled";

type TimetableEntry = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;

  className: string;
  section: string;
  stream: string;

  subject: string;
  faculty: string;
  room: string;

  status: TimetableStatus;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const classes = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const sections = ["A", "B", "C"];

const streams = [
  "Science",
  "Commerce",
  "Arts",
];

const subjects = [
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Computer",
  "Hindi",
  "Environmental Studies",
  "Physics",
  "Chemistry",
  "Biology",
  "Accountancy",
  "Business Studies",
  "Economics",
  "History",
  "Political Science",
];

const facultyMembers = [
  "Mr. Sharma",
  "Mrs. Gupta",
  "Mr. Das",
  "Mrs. Neha",
  "Mr. Rahul",
  "Dr. Priya Das",
  "Dr. Anil Sharma",
];

const initialEntries: TimetableEntry[] = [
  {
    id: "1",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    className: "10",
    section: "A",
    stream: "",
    subject: "Mathematics",
    faculty: "Mr. Sharma",
    room: "Room 10-A",
    status: "Active",
  },
  {
    id: "2",
    day: "Monday",
    startTime: "10:00",
    endTime: "11:00",
    className: "10",
    section: "A",
    stream: "",
    subject: "Science",
    faculty: "Mrs. Gupta",
    room: "Lab 1",
    status: "Active",
  },
  {
    id: "3",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:00",
    className: "10",
    section: "A",
    stream: "",
    subject: "English",
    faculty: "Mr. Das",
    room: "Room 10-A",
    status: "Active",
  },
  {
    id: "4",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "10:00",
    className: "10",
    section: "A",
    stream: "",
    subject: "Social Science",
    faculty: "Mrs. Neha",
    room: "Room 10-A",
    status: "Active",
  },
  {
    id: "5",
    day: "Wednesday",
    startTime: "10:00",
    endTime: "11:00",
    className: "10",
    section: "A",
    stream: "",
    subject: "Computer",
    faculty: "Mr. Rahul",
    room: "Computer Lab",
    status: "Active",
  },
  {
    id: "6",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    className: "11",
    section: "A",
    stream: "Science",
    subject: "Physics",
    faculty: "Dr. Priya Das",
    room: "Physics Lab",
    status: "Active",
  },
  {
    id: "7",
    day: "Monday",
    startTime: "10:00",
    endTime: "11:00",
    className: "11",
    section: "A",
    stream: "Science",
    subject: "Chemistry",
    faculty: "Dr. Anil Sharma",
    room: "Chemistry Lab",
    status: "Active",
  },
  {
    id: "8",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    className: "5",
    section: "B",
    stream: "",
    subject: "Mathematics",
    faculty: "Mrs. Neha",
    room: "Room 5-B",
    status: "Active",
  },
];

const emptyEntry: Omit<TimetableEntry, "id"> = {
  day: "Monday",
  startTime: "09:00",
  endTime: "10:00",
  className: "1",
  section: "A",
  stream: "",
  subject: "",
  faculty: "",
  room: "",
  status: "Active",
};

export default function Timetable() {
  const [entries, setEntries] =
    useState<TimetableEntry[]>(initialEntries);

  const [selectedClass, setSelectedClass] =
    useState("10");

  const [selectedSection, setSelectedSection] =
    useState("A");

  const [selectedStream, setSelectedStream] =
    useState("");

  const [selectedDay, setSelectedDay] =
    useState("Monday");

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingEntry, setEditingEntry] =
    useState<TimetableEntry | null>(null);

  const [deleteEntry, setDeleteEntry] =
    useState<TimetableEntry | null>(null);

  const [formData, setFormData] =
    useState<Omit<TimetableEntry, "id">>(
      emptyEntry,
    );

  const isSeniorClass =
    selectedClass === "11" ||
    selectedClass === "12";

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => {
        const matchesClass =
          entry.className === selectedClass;

        const matchesSection =
          entry.section === selectedSection;

        const matchesStream =
          !isSeniorClass ||
          entry.stream === selectedStream;

        const matchesDay =
          entry.day === selectedDay;

        const searchValue =
          search.toLowerCase().trim();

        const matchesSearch =
          !searchValue ||
          entry.subject
            .toLowerCase()
            .includes(searchValue) ||
          entry.faculty
            .toLowerCase()
            .includes(searchValue) ||
          entry.room
            .toLowerCase()
            .includes(searchValue);

        return (
          matchesClass &&
          matchesSection &&
          matchesStream &&
          matchesDay &&
          matchesSearch
        );
      })
      .sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      );
  }, [
    entries,
    selectedClass,
    selectedSection,
    selectedStream,
    selectedDay,
    search,
    isSeniorClass,
  ]);

  const activeClasses = entries.filter(
    (entry) => entry.status === "Active",
  ).length;

  const cancelledClasses = entries.filter(
    (entry) => entry.status === "Cancelled",
  ).length;

  const totalFaculty = new Set(
    entries.map((entry) => entry.faculty),
  ).size;

  const totalSubjects = new Set(
    entries.map((entry) => entry.subject),
  ).size;

  const handleClassChange = (
    value: string,
  ) => {
    setSelectedClass(value);

    if (
      value === "11" ||
      value === "12"
    ) {
      setSelectedStream("Science");
    } else {
      setSelectedStream("");
    }
  };

  const openAddModal = () => {
    setEditingEntry(null);

    setFormData({
      ...emptyEntry,
      className: selectedClass,
      section: selectedSection,
      stream:
        selectedClass === "11" ||
        selectedClass === "12"
          ? selectedStream || "Science"
          : "",
      day: selectedDay,
    });

    setShowModal(true);
  };

  const openEditModal = (
    entry: TimetableEntry,
  ) => {
    setEditingEntry(entry);

    setFormData({
      day: entry.day,
      startTime: entry.startTime,
      endTime: entry.endTime,
      className: entry.className,
      section: entry.section,
      stream: entry.stream,
      subject: entry.subject,
      faculty: entry.faculty,
      room: entry.room,
      status: entry.status,
    });

    setShowModal(true);
  };

  const handleSave = () => {
    if (
      !formData.subject.trim() ||
      !formData.faculty.trim() ||
      !formData.room.trim()
    ) {
      alert(
        "Please fill in Subject, Faculty and Room.",
      );
      return;
    }

    if (
      formData.startTime >=
      formData.endTime
    ) {
      alert(
        "End time must be later than start time.",
      );
      return;
    }

    const sectionConflict = entries.some(
      (entry) => {
        if (
          editingEntry &&
          entry.id === editingEntry.id
        ) {
          return false;
        }

        if (
          entry.day !== formData.day ||
          entry.className !==
            formData.className ||
          entry.section !==
            formData.section
        ) {
          return false;
        }

        if (
          (formData.className === "11" ||
            formData.className === "12") &&
          entry.stream !== formData.stream
        ) {
          return false;
        }

        return (
          formData.startTime <
            entry.endTime &&
          formData.endTime >
            entry.startTime
        );
      },
    );

    if (sectionConflict) {
      alert(
        "This class section already has a timetable entry during this time.",
      );
      return;
    }

    const facultyConflict = entries.some(
      (entry) => {
        if (
          editingEntry &&
          entry.id === editingEntry.id
        ) {
          return false;
        }

        if (
          entry.day !== formData.day ||
          entry.faculty !==
            formData.faculty
        ) {
          return false;
        }

        return (
          formData.startTime <
            entry.endTime &&
          formData.endTime >
            entry.startTime
        );
      },
    );

    if (facultyConflict) {
      alert(
        "This faculty member is already assigned to another class during this time.",
      );
      return;
    }

    const roomConflict = entries.some(
      (entry) => {
        if (
          editingEntry &&
          entry.id === editingEntry.id
        ) {
          return false;
        }

        if (
          entry.day !== formData.day ||
          entry.room !== formData.room
        ) {
          return false;
        }

        return (
          formData.startTime <
            entry.endTime &&
          formData.endTime >
            entry.startTime
        );
      },
    );

    if (roomConflict) {
      alert(
        "This room is already occupied during this time.",
      );
      return;
    }

    if (editingEntry) {
      setEntries((current) =>
        current.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                ...formData,
              }
            : entry,
        ),
      );
    } else {
      const newEntry: TimetableEntry = {
        id: Date.now().toString(),
        ...formData,
      };

      setEntries((current) => [
        ...current,
        newEntry,
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteEntry) return;

    setEntries((current) =>
      current.filter(
        (entry) =>
          entry.id !== deleteEntry.id,
      ),
    );

    setDeleteEntry(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b-2 border-slate-200 bg-white shadow-sm">

        <div className="flex min-h-20 items-center justify-between px-5 sm:px-8">

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
              Timetable
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700 hover:shadow-xl"
          >
            <span className="text-lg">
              +
            </span>

            Add Class
          </button>

        </div>

      </header>

      <main className="p-5 sm:p-8">

        {/* BREADCRUMB */}

        <div className="mb-7 flex items-center gap-2 text-xs font-medium text-slate-500">

          <span>Dashboard</span>

          <span className="text-slate-300">
            /
          </span>

          <span className="font-bold text-slate-800">
            Timetable
          </span>

        </div>

        {/* SUMMARY CARDS */}

        <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            title="Total Classes"
            value={entries.length.toString()}
            description="Scheduled timetable entries"
            icon="▦"
          />

          <SummaryCard
            title="Active Classes"
            value={activeClasses.toString()}
            description="Currently scheduled"
            icon="✓"
            positive
          />

          <SummaryCard
            title="Faculty Assigned"
            value={totalFaculty.toString()}
            description="Faculty in timetable"
            icon="♙"
          />

          <SummaryCard
            title="Subjects"
            value={totalSubjects.toString()}
            description="Scheduled subjects"
            icon="◈"
          />

        </div>

        {/* MAIN CARD */}

        <section className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">

          {/* FILTER HEADER */}

          <div className="border-b-2 border-slate-100 p-6 sm:p-7">

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div>

                <h2 className="text-lg font-extrabold text-slate-900">
                  Section-wise Timetable
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Manage timetable for Classes 1–12
                </p>

              </div>

              <div className="rounded-xl bg-sky-50 px-4 py-2 text-xs font-bold text-sky-700">
                {filteredEntries.length}{" "}
                {filteredEntries.length === 1
                  ? "class"
                  : "classes"}{" "}
                shown
              </div>

            </div>

            {/* FILTERS */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

              {/* CLASS */}

              <div>

                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  Class
                </label>

                <select
                  value={selectedClass}
                  onChange={(e) =>
                    handleClassChange(
                      e.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                >
                  {classes.map(
                    (className) => (
                      <option
                        key={className}
                        value={className}
                      >
                        Class {className}
                      </option>
                    ),
                  )}
                </select>

              </div>

              {/* STREAM */}

              {isSeniorClass ? (
                <div>

                  <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    Stream
                  </label>

                  <select
                    value={selectedStream}
                    onChange={(e) =>
                      setSelectedStream(
                        e.target.value,
                      )
                    }
                    className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  >
                    {streams.map(
                      (stream) => (
                        <option
                          key={stream}
                          value={stream}
                        >
                          {stream}
                        </option>
                      ),
                    )}
                  </select>

                </div>
              ) : (
                <div />
              )}

              {/* SECTION */}

              <FilterSelect
                label="Section"
                value={selectedSection}
                onChange={setSelectedSection}
                options={sections.map(
                  (section) =>
                    `Section ${section}`,
                )}
                values={sections}
              />

              {/* SEARCH */}

              <div className="lg:col-span-2">

                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  Search
                </label>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value,
                    )
                  }
                  placeholder="Search subject, faculty or room..."
                  className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                />

              </div>

            </div>

            {/* DAYS */}

            <div className="mt-6 flex gap-3 overflow-x-auto pb-1">

              {days.map((day) => (

                <button
                  key={day}
                  onClick={() =>
                    setSelectedDay(day)
                  }
                  className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    selectedDay === day
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-600/25"
                      : "border-2 border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  }`}
                >
                  {day}
                </button>

              ))}

            </div>

          </div>

          {/* SELECTED CLASS */}

          <div className="border-b-2 border-slate-100 bg-slate-50 px-6 py-5 sm:px-7">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span className="rounded-lg bg-sky-100 px-3 py-1.5 text-sm font-extrabold text-sky-700">
                    Class {selectedClass}
                  </span>

                  {isSeniorClass && (
                    <span className="rounded-lg bg-purple-100 px-3 py-1.5 text-sm font-bold text-purple-700">
                      {selectedStream}
                    </span>
                  )}

                  <span className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700">
                    Section{" "}
                    {selectedSection}
                  </span>

                </div>

                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {selectedDay} schedule
                </p>

              </div>

              <span className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
                {filteredEntries.length}{" "}
                {filteredEntries.length === 1
                  ? "class"
                  : "classes"}
              </span>

            </div>

          </div>

          {/* TIMETABLE */}

          <div className="divide-y-2 divide-slate-100">

            {filteredEntries.length === 0 ? (

              <div className="px-5 py-24 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-50 text-2xl text-slate-400">
                  ▦
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-slate-800">
                  No classes scheduled
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
                  No timetable entry exists for
                  this class, section and day.
                </p>

                <button
                  onClick={openAddModal}
                  className="mt-6 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700"
                >
                  + Add Class
                </button>

              </div>

            ) : (

              filteredEntries.map(
                (entry) => (
                  <TimetableRow
                    key={entry.id}
                    entry={entry}
                    onEdit={() =>
                      openEditModal(entry)
                    }
                    onDelete={() =>
                      setDeleteEntry(
                        entry,
                      )
                    }
                  />
                ),
              )

            )}

          </div>

        </section>

      </main>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <TimetableModal
          editing={!!editingEntry}
          formData={formData}
          setFormData={setFormData}
          onClose={() =>
            setShowModal(false)
          }
          onSave={handleSave}
        />
      )}

      {/* DELETE MODAL */}

      {deleteEntry && (
        <DeleteModal
          entry={deleteEntry}
          onCancel={() =>
            setDeleteEntry(null)
          }
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
  values,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  values?: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      >

        {options.map(
          (option, index) => (
            <option
              key={option}
              value={
                values?.[index] ??
                option
              }
            >
              {option}
            </option>
          ),
        )}

      </select>

    </div>
  );
}

/* =========================================================
   TIMETABLE ROW
========================================================= */

function TimetableRow({
  entry,
  onEdit,
  onDelete,
}: {
  entry: TimetableEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group flex flex-col gap-6 border-l-4 border-transparent p-6 transition-all hover:border-sky-500 hover:bg-sky-50/40 lg:flex-row lg:items-center">

      {/* TIME */}

      <div className="w-36 shrink-0">

        <p className="text-base font-extrabold text-sky-700">
          {formatTime(
            entry.startTime,
          )}
        </p>

        <p className="mt-1 text-xs font-semibold text-slate-500">
          to{" "}
          {formatTime(entry.endTime)}
        </p>

      </div>

      {/* SUBJECT */}

      <div className="min-w-0 flex-1">

        <div className="flex items-start gap-4">

          <div className="mt-1 h-11 w-1.5 shrink-0 rounded-full bg-sky-500" />

          <div>

            <h3 className="text-base font-extrabold text-slate-900">
              {entry.subject}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2">

              <span className="rounded-md bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700">
                Class{" "}
                {entry.className}
              </span>

              {entry.stream && (
                <span className="rounded-md bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
                  {entry.stream}
                </span>
              )}

              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                Section{" "}
                {entry.section}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* FACULTY */}

      <div className="w-48">

        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
          Faculty
        </p>

        <p className="mt-1 text-sm font-bold text-slate-800">
          {entry.faculty}
        </p>

      </div>

      {/* ROOM */}

      <div className="w-36">

        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
          Room
        </p>

        <p className="mt-1 text-sm font-bold text-slate-800">
          {entry.room}
        </p>

      </div>

      {/* STATUS */}

      <div>
        <StatusBadge
          status={entry.status}
        />
      </div>

      {/* ACTIONS */}

      <div className="flex gap-2 lg:ml-auto">

        <ActionButton
          label="Edit"
          onClick={onEdit}
        />

        <ActionButton
          label="Delete"
          danger
          onClick={onDelete}
        />

      </div>

    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  description,
  icon,
  positive = false,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${
            positive
              ? "bg-emerald-100 text-emerald-600"
              : "bg-sky-100 text-sky-600"
          }`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   TIMETABLE MODAL
========================================================= */

function TimetableModal({
  editing,
  formData,
  setFormData,
  onClose,
  onSave,
}: {
  editing: boolean;
  formData: Omit<TimetableEntry, "id">;
  setFormData: React.Dispatch<
    React.SetStateAction<
      Omit<TimetableEntry, "id">
    >
  >;
  onClose: () => void;
  onSave: () => void;
}) {
  const isSeniorClass =
    formData.className === "11" ||
    formData.className === "12";

  const update = (
    field: keyof Omit<
      TimetableEntry,
      "id"
    >,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleModalClassChange = (
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      className: value,
      stream:
        value === "11" ||
        value === "12"
          ? current.stream ||
            "Science"
          : "",
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-slate-200 bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b-2 border-slate-100 px-6 py-5">

          <div>

            <h2 className="text-lg font-extrabold text-slate-900">
              {editing
                ? "Edit Timetable Entry"
                : "Add Class"}
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Configure the school class schedule
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-slate-200 text-xl font-bold text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>

        </div>

        {/* FORM */}

        <div className="grid gap-5 p-6 sm:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              Class
            </label>

            <select
              value={formData.className}
              onChange={(e) =>
                handleModalClassChange(
                  e.target.value,
                )
              }
              className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
            >

              {classes.map(
                (className) => (
                  <option
                    key={className}
                    value={className}
                  >
                    Class {className}
                  </option>
                ),
              )}

            </select>

          </div>

          <SelectField
            label="Section"
            value={formData.section}
            onChange={(value) =>
              update(
                "section",
                value,
              )
            }
            options={sections}
          />

          {isSeniorClass && (
            <SelectField
              label="Stream"
              value={formData.stream}
              onChange={(value) =>
                update(
                  "stream",
                  value,
                )
              }
              options={streams}
            />
          )}

          <SelectField
            label="Day"
            value={formData.day}
            onChange={(value) =>
              update("day", value)
            }
            options={days}
          />

          <InputField
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(value) =>
              update(
                "startTime",
                value,
              )
            }
          />

          <InputField
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(value) =>
              update(
                "endTime",
                value,
              )
            }
          />

          <SelectField
            label="Subject"
            value={formData.subject}
            onChange={(value) =>
              update(
                "subject",
                value,
              )
            }
            options={subjects}
          />

          <SelectField
            label="Faculty"
            value={formData.faculty}
            onChange={(value) =>
              update(
                "faculty",
                value,
              )
            }
            options={facultyMembers}
          />

          <InputField
            label="Room"
            value={formData.room}
            onChange={(value) =>
              update(
                "room",
                value,
              )
            }
            placeholder="Room 10-A"
          />

          <SelectField
            label="Status"
            value={formData.status}
            onChange={(value) =>
              update(
                "status",
                value,
              )
            }
            options={[
              "Active",
              "Cancelled",
            ]}
          />

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3 border-t-2 border-slate-100 px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border-2 border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700"
          >
            {editing
              ? "Save Changes"
              : "Add Class"}
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
  entry,
  onCancel,
  onDelete,
}: {
  entry: TimetableEntry;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-sm rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-2xl">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-xl font-extrabold text-red-600">
          !
        </div>

        <h2 className="mt-5 text-lg font-extrabold text-slate-900">
          Delete this class?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">

          Delete{" "}

          <strong className="text-slate-800">
            {entry.subject}
          </strong>

          {" "}from Class{" "}

          <strong className="text-slate-800">
            {entry.className}
          </strong>

          {" "}Section{" "}

          <strong className="text-slate-800">
            {entry.section}
          </strong>

          {" "}?

        </p>

        <div className="mt-7 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-xl border-2 border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: TimetableStatus;
}) {
  const styles: Record<
    TimetableStatus,
    string
  > = {
    Active:
      "border border-emerald-200 bg-emerald-50 text-emerald-700",

    Cancelled:
      "border border-red-200 bg-red-50 text-red-700",
  };

  const dots: Record<
    TimetableStatus,
    string
  > = {
    Active:
      "bg-emerald-500",

    Cancelled:
      "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold ${styles[status]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-extrabold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      />

    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-extrabold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ),
        )}

      </select>

    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  label,
  onClick,
  danger = false,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-2 text-xs font-extrabold transition ${
        danger
          ? "border-red-100 text-red-600 hover:border-red-200 hover:bg-red-50"
          : "border-slate-200 text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
      }`}
    >
      {label}
    </button>
  );
}

/* =========================================================
   TIME FORMAT
========================================================= */

function formatTime(
  time: string,
) {
  const [hour, minute] =
    time.split(":").map(Number);

  const suffix =
    hour >= 12 ? "PM" : "AM";

  const displayHour =
    hour % 12 || 12;

  return `${displayHour}:${String(
    minute,
  ).padStart(2, "0")} ${suffix}`;
}