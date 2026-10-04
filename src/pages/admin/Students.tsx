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
    faculty: "Mrs. Sharma",
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
    subject: "Computer Science",
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

  /*
   * Classes 11 and 12 use streams.
   */
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

  const totalSubjects = new Set(
    entries.map((entry) => entry.subject),
  ).size;

  const totalFaculty = new Set(
    entries.map((entry) => entry.faculty),
  ).size;

  /*
   * When changing class, reset stream.
   */
  const handleClassChange = (
    value: string,
  ) => {
    setSelectedClass(value);

    if (value === "11" || value === "12") {
      setSelectedStream("Science");
    } else {
      setSelectedStream("");
    }
  };

  /*
   * Add timetable entry
   */
  const openAddModal = () => {
    setEditingEntry(null);

    setFormData({
      ...emptyEntry,
      className: selectedClass,
      section: selectedSection,
      stream:
        selectedClass === "11" ||
        selectedClass === "12"
          ? selectedStream
          : "",
      day: selectedDay,
    });

    setShowModal(true);
  };

  /*
   * Edit timetable entry
   */
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

  /*
   * Save timetable entry
   */
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

    /*
     * Basic conflict detection.
     *
     * Prevent the same section from having
     * two classes at the same time.
     */
    const hasConflict = entries.some(
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

    if (hasConflict) {
      alert(
        "This section already has a class scheduled during this time.",
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

  /*
   * Delete
   */
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
    <div className="min-h-screen bg-slate-50">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="flex h-20 items-center justify-between px-5 sm:px-8">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600">
              Administration
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-800">
              Timetable
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
          >
            <span className="text-base">
              +
            </span>

            Add Class
          </button>

        </div>

      </header>

      <main className="p-5 sm:p-8">

        {/* =========================================
            BREADCRUMB
        ========================================= */}

        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">

          <span>Dashboard</span>

          <span>›</span>

          <span className="font-semibold text-slate-600">
            Timetable
          </span>

        </div>

        {/* =========================================
            SUMMARY CARDS
        ========================================= */}

        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

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
            title="Subjects"
            value={totalSubjects.toString()}
            description="Subjects in timetable"
            icon="◈"
          />

          <SummaryCard
            title="Faculty"
            value={totalFaculty.toString()}
            description="Faculty assigned"
            icon="♙"
          />

        </div>

        {/* =========================================
            MAIN TIMETABLE CARD
        ========================================= */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* =========================================
              CLASS SELECTOR
          ========================================= */}

          <div className="border-b border-slate-100 p-5 sm:p-6">

            <div className="mb-5">

              <h2 className="text-sm font-bold text-slate-800">
                Section Timetable
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Select a class and section to view
                its weekly schedule.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* CLASS */}

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Class
                </label>

                <select
                  value={selectedClass}
                  onChange={(e) =>
                    handleClassChange(
                      e.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                >

                  {classes.map((className) => (
                    <option
                      key={className}
                      value={className}
                    >
                      Class {className}
                    </option>
                  ))}

                </select>
              </div>

              {/* STREAM */}

              {isSeniorClass ? (
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Stream
                  </label>

                  <select
                    value={selectedStream}
                    onChange={(e) =>
                      setSelectedStream(
                        e.target.value,
                      )
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  >

                    {streams.map((stream) => (
                      <option
                        key={stream}
                        value={stream}
                      >
                        {stream}
                      </option>
                    ))}

                  </select>
                </div>
              ) : (
                <div className="hidden lg:block" />
              )}

              {/* SECTION */}

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Section
                </label>

                <select
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(
                      e.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                >

                  {sections.map((section) => (
                    <option
                      key={section}
                      value={section}
                    >
                      Section {section}
                    </option>
                  ))}

                </select>
              </div>

              {/* SEARCH */}

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Search
                </label>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Subject, faculty or room..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />

              </div>

            </div>

            {/* =====================================
                DAYS
            ===================================== */}

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">

              {days.map((day) => (

                <button
                  key={day}
                  onClick={() =>
                    setSelectedDay(day)
                  }
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    selectedDay === day
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {day}
                </button>

              ))}

            </div>

          </div>

          {/* =========================================
              CURRENT CLASS HEADER
          ========================================= */}

          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-sm font-bold text-slate-800">
                    Class {selectedClass}
                  </h3>

                  {isSeniorClass && (
                    <>
                      <span className="text-slate-300">
                        •
                      </span>

                      <span className="text-xs font-semibold text-sky-600">
                        {selectedStream}
                      </span>
                    </>
                  )}

                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="text-xs font-semibold text-slate-600">
                    Section {selectedSection}
                  </span>

                </div>

                <p className="mt-1 text-[10px] text-slate-400">
                  {selectedDay} schedule
                </p>

              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-slate-500 shadow-sm">
                {filteredEntries.length}{" "}
                {filteredEntries.length === 1
                  ? "class"
                  : "classes"}
              </span>

            </div>

          </div>

          {/* =========================================
              TIMETABLE ENTRIES
          ========================================= */}

          <div className="divide-y divide-slate-100">

            {filteredEntries.length === 0 ? (

              <div className="px-5 py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                  ▦
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-700">
                  No classes scheduled
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  No timetable entry exists for
                  this class, section and day.
                </p>

                <button
                  onClick={openAddModal}
                  className="mt-5 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
                >
                  + Add Class
                </button>

              </div>

            ) : (

              filteredEntries.map((entry) => (

                <TimetableRow
                  key={entry.id}
                  entry={entry}
                  onEdit={() =>
                    openEditModal(entry)
                  }
                  onDelete={() =>
                    setDeleteEntry(entry)
                  }
                />

              ))

            )}

          </div>

        </section>

      </main>

      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

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

      {/* =========================================
          DELETE MODAL
      ========================================= */}

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
    <div className="group flex flex-col gap-5 p-5 transition hover:bg-slate-50/70 lg:flex-row lg:items-center">

      {/* TIME */}

      <div className="w-32 shrink-0">

        <p className="text-sm font-bold text-slate-800">
          {formatTime(entry.startTime)}
        </p>

        <p className="mt-1 text-[10px] text-slate-400">
          {formatTime(entry.endTime)}
        </p>

      </div>

      {/* SUBJECT */}

      <div className="min-w-0 flex-1">

        <div className="flex items-start gap-3">

          <div className="mt-1 h-10 w-1 rounded-full bg-sky-500" />

          <div>

            <h3 className="text-sm font-bold text-slate-800">
              {entry.subject}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">

              <span>
                Class {entry.className}
              </span>

              {entry.stream && (
                <>
                  <span>•</span>
                  <span>
                    {entry.stream}
                  </span>
                </>
              )}

              <span>•</span>

              <span>
                Section {entry.section}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* FACULTY */}

      <div className="w-48">

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Faculty
        </p>

        <p className="mt-1 text-xs font-semibold text-slate-700">
          {entry.faculty}
        </p>

      </div>

      {/* ROOM */}

      <div className="w-32">

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Room
        </p>

        <p className="mt-1 text-xs font-semibold text-slate-700">
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

      <div className="flex gap-1 lg:ml-auto">

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
            {value}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-sky-50 text-sky-600"
          }`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-3 text-[10px] text-slate-400">
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
    field: keyof Omit<TimetableEntry, "id">,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div>

            <h2 className="text-base font-bold text-slate-800">
              {editing
                ? "Edit Timetable Entry"
                : "Add Class"}
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Configure the class schedule
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 hover:bg-slate-100"
          >
            ×
          </button>

        </div>

        {/* FORM */}

        <div className="grid gap-5 p-6 sm:grid-cols-2">

          {/* CLASS */}

          <SelectField
            label="Class"
            value={formData.className}
            onChange={(value) =>
              update(
                "className",
                value,
              )
            }
            options={classes.map(
              (item) =>
                `Class ${item}`,
            )}
            rawValues={classes}
          />

          {/* SECTION */}

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

          {/* STREAM */}

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

          {/* DAY */}

          <SelectField
            label="Day"
            value={formData.day}
            onChange={(value) =>
              update("day", value)
            }
            options={days}
          />

          {/* START */}

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

          {/* END */}

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

          {/* SUBJECT */}

          <InputField
            label="Subject"
            value={formData.subject}
            onChange={(value) =>
              update(
                "subject",
                value,
              )
            }
            placeholder="Mathematics"
          />

          {/* FACULTY */}

          <InputField
            label="Faculty"
            value={formData.faculty}
            onChange={(value) =>
              update(
                "faculty",
                value,
              )
            }
            placeholder="Mr. Sharma"
          />

          {/* ROOM */}

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

          {/* STATUS */}

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

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          !
        </div>

        <h2 className="mt-5 text-base font-bold text-slate-800">
          Delete this class?
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-500">

          Delete{" "}

          <strong>
            {entry.subject}
          </strong>

          {" "}from Class{" "}

          <strong>
            {entry.className}
          </strong>

          {" "}Section{" "}

          <strong>
            {entry.section}
          </strong>

          {" "}?

        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-700"
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
      "bg-emerald-50 text-emerald-600",
    Cancelled:
      "bg-red-50 text-red-600",
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
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

      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
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
  rawValues,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  rawValues?: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      >

        {options.map((option, index) => {

          const actualValue =
            rawValues?.[index] ??
            option;

          return (
            <option
              key={actualValue}
              value={actualValue}
            >
              {option}
            </option>
          );
        })}

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
      className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

/* =========================================================
   TIME FORMAT
========================================================= */

function formatTime(time: string) {
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