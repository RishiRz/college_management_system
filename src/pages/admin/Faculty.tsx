import { useMemo, useState } from "react";

type FacultyStatus =
  | "Active"
  | "On Leave";

type Faculty = {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningYear: string;
  status: FacultyStatus;
};

const initialFaculty: Faculty[] = [
  {
    id: "1",
    facultyId: "FAC001",
    name: "Dr. Anil Sharma",
    email: "anil.sharma@college.edu",
    phone: "+91 98765 10001",
    department: "Computer Science",
    designation: "Professor",
    joiningYear: "2018",
    status: "Active",
  },
  {
    id: "2",
    facultyId: "FAC002",
    name: "Dr. Priya Das",
    email: "priya.das@college.edu",
    phone: "+91 98765 10002",
    department: "Computer Science",
    designation: "Associate Professor",
    joiningYear: "2020",
    status: "Active",
  },
  {
    id: "3",
    facultyId: "FAC003",
    name: "Rahul Mehta",
    email: "rahul.mehta@college.edu",
    phone: "+91 98765 10003",
    department: "Information Technology",
    designation: "Assistant Professor",
    joiningYear: "2022",
    status: "Active",
  },
  {
    id: "4",
    facultyId: "FAC004",
    name: "Dr. Sneha Gupta",
    email: "sneha.gupta@college.edu",
    phone: "+91 98765 10004",
    department: "Electronics",
    designation: "Professor",
    joiningYear: "2016",
    status: "Active",
  },
  {
    id: "5",
    facultyId: "FAC005",
    name: "Amit Kumar",
    email: "amit.kumar@college.edu",
    phone: "+91 98765 10005",
    department: "Mechanical",
    designation: "Assistant Professor",
    joiningYear: "2023",
    status: "On Leave",
  },
  {
    id: "6",
    facultyId: "FAC006",
    name: "Dr. Neha Sharma",
    email: "neha.sharma@college.edu",
    phone: "+91 98765 10006",
    department: "Computer Science",
    designation: "Assistant Professor",
    joiningYear: "2021",
    status: "Active",
  },
];

const emptyFaculty: Omit<Faculty, "id"> = {
  facultyId: "",
  name: "",
  email: "",
  phone: "",
  department: "Computer Science",
  designation: "Assistant Professor",
  joiningYear: "2026",
  status: "Active",
};

export default function Faculty() {
  const [faculty, setFaculty] =
    useState<Faculty[]>(initialFaculty);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [designation, setDesignation] = useState("All");
  const [status, setStatus] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingFaculty, setEditingFaculty] =
    useState<Faculty | null>(null);

  const [selectedFaculty, setSelectedFaculty] =
    useState<Faculty | null>(null);

  const [deleteFaculty, setDeleteFaculty] =
    useState<Faculty | null>(null);

  const [formData, setFormData] =
    useState<Omit<Faculty, "id">>(emptyFaculty);

  /* ==========================================
     FILTER FACULTY
  ========================================== */

  const filteredFaculty = useMemo(() => {
    return faculty.filter((member) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(searchValue) ||
        member.facultyId.toLowerCase().includes(searchValue) ||
        member.email.toLowerCase().includes(searchValue);

      const matchesDepartment =
        department === "All" ||
        member.department === department;

      const matchesDesignation =
        designation === "All" ||
        member.designation === designation;

      const matchesStatus =
        status === "All" ||
        member.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesDesignation &&
        matchesStatus
      );
    });
  }, [
    faculty,
    search,
    department,
    designation,
    status,
  ]);

  /* ==========================================
     STATISTICS
  ========================================== */

  const activeFaculty = faculty.filter(
    (member) => member.status === "Active"
  ).length;

  const onLeaveFaculty = faculty.filter(
    (member) => member.status === "On Leave"
  ).length;

  const professors = faculty.filter(
    (member) =>
      member.designation === "Professor"
  ).length;

  /* ==========================================
     OPEN ADD MODAL
  ========================================== */

  const openAddModal = () => {
    setEditingFaculty(null);
    setFormData({
      ...emptyFaculty,
      facultyId: `FAC${String(
        faculty.length + 1
      ).padStart(3, "0")}`,
    });

    setShowModal(true);
  };

  /* ==========================================
     OPEN EDIT MODAL
  ========================================== */

  const openEditModal = (member: Faculty) => {
    setEditingFaculty(member);

    setFormData({
      facultyId: member.facultyId,
      name: member.name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      designation: member.designation,
      joiningYear: member.joiningYear,
      status: member.status,
    });

    setShowModal(true);
  };

  /* ==========================================
     SAVE FACULTY
  ========================================== */

  const handleSaveFaculty = () => {
    if (
      !formData.facultyId.trim() ||
      !formData.name.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingFaculty) {
      setFaculty((current) =>
        current.map((member) =>
          member.id === editingFaculty.id
            ? {
                ...member,
                ...formData,
              }
            : member
        )
      );
    } else {
      const newFaculty: Faculty = {
        id: Date.now().toString(),
        ...formData,
      };

      setFaculty((current) => [
        newFaculty,
        ...current,
      ]);
    }

    setShowModal(false);
  };

  /* ==========================================
     DELETE FACULTY
  ========================================== */

  const handleDelete = () => {
    if (!deleteFaculty) return;

    setFaculty((current) =>
      current.filter(
        (member) =>
          member.id !== deleteFaculty.id
      )
    );

    setDeleteFaculty(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="flex h-20 items-center justify-between px-5 sm:px-8">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-sky-600">
              Administration
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-800">
              Faculty Details
            </h1>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
            >
              <span className="text-base">
                +
              </span>

              Add Faculty
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="hidden items-center gap-2 sm:flex">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                AD
              </div>

              <div>

                <p className="text-[11px] font-bold text-slate-700">
                  Administrator
                </p>

                <p className="text-[9px] text-slate-400">
                  System Admin
                </p>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* ========================================
          CONTENT
      ======================================== */}

      <main className="p-5 sm:p-8">

        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">

          <span>Dashboard</span>

          <span>›</span>

          <span className="font-semibold text-slate-600">
            Faculty
          </span>

        </div>

        {/* ========================================
            STATISTICS
        ======================================== */}

        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            title="Total Faculty"
            value={faculty.length.toString()}
            description="Registered faculty"
            icon="♙"
          />

          <SummaryCard
            title="Active Faculty"
            value={activeFaculty.toString()}
            description="Currently teaching"
            icon="✓"
            positive
          />

          <SummaryCard
            title="Professors"
            value={professors.toString()}
            description="Senior faculty"
            icon="★"
          />

          <SummaryCard
            title="On Leave"
            value={onLeaveFaculty.toString()}
            description="Currently on leave"
            icon="−"
          />

        </div>

        {/* ========================================
            FACULTY TABLE
        ======================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}

          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div>

                <h2 className="text-sm font-bold text-slate-800">
                  All Faculty
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  View and manage college faculty
                </p>

              </div>

              <div className="text-xs text-slate-400">

                Showing{" "}

                <span className="font-bold text-slate-700">
                  {filteredFaculty.length}
                </span>{" "}

                faculty members

              </div>

            </div>

            {/* Filters */}

            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">

              {/* Search */}

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search faculty..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />

              </div>

              {/* Department */}

              <FilterSelect
                value={department}
                onChange={setDepartment}
                options={[
                  "All",
                  "Computer Science",
                  "Information Technology",
                  "Electronics",
                  "Mechanical",
                ]}
              />

              {/* Designation */}

              <FilterSelect
                value={designation}
                onChange={setDesignation}
                options={[
                  "All",
                  "Professor",
                  "Associate Professor",
                  "Assistant Professor",
                  "Lecturer",
                ]}
              />

              {/* Status */}

              <FilterSelect
                value={status}
                onChange={setStatus}
                options={[
                  "All",
                  "Active",
                  "On Leave",
                ]}
              />

            </div>

          </div>

          {/* ========================================
              TABLE
          ======================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              <thead className="bg-slate-50">

                <tr className="border-b border-slate-100">

                  <TableHeader>
                    Faculty
                  </TableHeader>

                  <TableHeader>
                    Faculty ID
                  </TableHeader>

                  <TableHeader>
                    Department
                  </TableHeader>

                  <TableHeader>
                    Designation
                  </TableHeader>

                  <TableHeader>
                    Joining Year
                  </TableHeader>

                  <TableHeader>
                    Status
                  </TableHeader>

                  <TableHeader align="right">
                    Actions
                  </TableHeader>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredFaculty.map((member) => (

                  <tr
                    key={member.id}
                    className="transition hover:bg-slate-50/70"
                  >

                    {/* Faculty */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600">
                          {getInitials(member.name)}
                        </div>

                        <div>

                          <p className="text-xs font-bold text-slate-700">
                            {member.name}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {member.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ID */}

                    <td className="px-5 py-4">

                      <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                        {member.facultyId}
                      </span>

                    </td>

                    {/* Department */}

                    <td className="px-5 py-4 text-xs text-slate-600">
                      {member.department}
                    </td>

                    {/* Designation */}

                    <td className="px-5 py-4">

                      <span className="text-xs font-medium text-slate-600">
                        {member.designation}
                      </span>

                    </td>

                    {/* Joining Year */}

                    <td className="px-5 py-4">

                      <span className="text-xs text-slate-500">
                        {member.joiningYear}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={member.status}
                      />

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-1">

                        <ActionButton
                          label="View"
                          onClick={() =>
                            setSelectedFaculty(
                              member
                            )
                          }
                        />

                        <ActionButton
                          label="Edit"
                          onClick={() =>
                            openEditModal(member)
                          }
                        />

                        <ActionButton
                          label="Delete"
                          danger
                          onClick={() =>
                            setDeleteFaculty(
                              member
                            )
                          }
                        />

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* Empty State */}

            {filteredFaculty.length === 0 && (

              <div className="px-5 py-16 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  ⌕
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-700">
                  No faculty found
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </div>

          {/* Pagination */}

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

            <p className="text-[10px] text-slate-400">

              Showing{" "}

              <span className="font-semibold text-slate-600">
                {filteredFaculty.length}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-slate-600">
                {faculty.length}
              </span>{" "}

              faculty members

            </p>

            <div className="flex gap-1">

              <button
                disabled
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-300"
              >
                ‹
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white">
                1
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50">
                2
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50">
                ›
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* ========================================
          ADD / EDIT MODAL
      ======================================== */}

      {showModal && (

        <FacultyModal
          editing={!!editingFaculty}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowModal(false)}
          onSave={handleSaveFaculty}
        />

      )}

      {/* ========================================
          VIEW MODAL
      ======================================== */}

      {selectedFaculty && (

        <FacultyDetailsModal
          faculty={selectedFaculty}
          onClose={() =>
            setSelectedFaculty(null)
          }
          onEdit={() => {
            setSelectedFaculty(null);
            openEditModal(selectedFaculty);
          }}
        />

      )}

      {/* ========================================
          DELETE MODAL
      ======================================== */}

      {deleteFaculty && (

        <DeleteModal
          faculty={deleteFaculty}
          onCancel={() =>
            setDeleteFaculty(null)
          }
          onDelete={handleDelete}
        />

      )}

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
   FILTER
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option === "All"
            ? "All"
            : option}
        </option>
      ))}
    </select>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function TableHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: FacultyStatus;
}) {
  const styles: Record<
    FacultyStatus,
    string
  > = {
    Active:
      "bg-emerald-50 text-emerald-600",

    "On Leave":
      "bg-amber-50 text-amber-600",

  };

  const dots: Record<
    FacultyStatus,
    string
  > = {
    Active: "bg-emerald-500",
    "On Leave": "bg-amber-500",
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
      className={`rounded-lg px-2 py-1.5 text-[10px] font-semibold transition ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
      }`}
    >
      {label}
    </button>
  );
}

/* =========================================================
   FACULTY MODAL
========================================================= */

function FacultyModal({
  editing,
  formData,
  setFormData,
  onClose,
  onSave,
}: {
  editing: boolean;
  formData: Omit<Faculty, "id">;
  setFormData: React.Dispatch<
    React.SetStateAction<
      Omit<Faculty, "id">
    >
  >;
  onClose: () => void;
  onSave: () => void;
}) {
  const updateField = (
    field: keyof Omit<Faculty, "id">,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div>

            <h2 className="text-base font-bold text-slate-800">
              {editing
                ? "Edit Faculty"
                : "Add New Faculty"}
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              {editing
                ? "Update faculty information"
                : "Enter faculty member details"}
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <div className="grid gap-5 p-6 sm:grid-cols-2">

          <InputField
            label="Faculty ID"
            value={formData.facultyId}
            onChange={(value) =>
              updateField(
                "facultyId",
                value
              )
            }
            placeholder="FAC001"
            required
          />

          <InputField
            label="Full Name"
            value={formData.name}
            onChange={(value) =>
              updateField(
                "name",
                value
              )
            }
            placeholder="Dr. John Smith"
            required
          />

          <InputField
            label="Email Address"
            value={formData.email}
            onChange={(value) =>
              updateField(
                "email",
                value
              )
            }
            placeholder="faculty@college.edu"
            type="email"
            required
          />

          <InputField
            label="Phone Number"
            value={formData.phone}
            onChange={(value) =>
              updateField(
                "phone",
                value
              )
            }
            placeholder="+91 XXXXX XXXXX"
          />

          <SelectField
            label="Department"
            value={formData.department}
            onChange={(value) =>
              updateField(
                "department",
                value
              )
            }
            options={[
              "Computer Science",
              "Information Technology",
              "Electronics",
              "Mechanical",
            ]}
          />

          <SelectField
            label="Designation"
            value={formData.designation}
            onChange={(value) =>
              updateField(
                "designation",
                value
              )
            }
            options={[
              "Professor",
              "Associate Professor",
              "Assistant Professor",
              "Lecturer",
            ]}
          />

          <InputField
            label="Joining Year"
            value={formData.joiningYear}
            onChange={(value) =>
              updateField(
                "joiningYear",
                value
              )
            }
            placeholder="2026"
          />

          <SelectField
            label="Status"
            value={formData.status}
            onChange={(value) =>
              updateField(
                "status",
                value as FacultyStatus
              )
            }
            options={[
              "Active",
              "On Leave",
            ]}
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
          >
            {editing
              ? "Save Changes"
              : "Add Faculty"}
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      />

    </div>
  );
}

/* =========================================================
   SELECT
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

      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}

/* =========================================================
   DETAILS MODAL
========================================================= */

function FacultyDetailsModal({
  faculty,
  onClose,
  onEdit,
}: {
  faculty: Faculty;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Profile Header */}

        <div className="relative bg-[#102a43] px-6 py-7 text-white">

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            ×
          </button>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#102a43]">
              {getInitials(
                faculty.name
              )}
            </div>

            <div>

              <h2 className="text-lg font-bold">
                {faculty.name}
              </h2>

              <p className="mt-1 text-xs text-slate-300">
                {faculty.designation}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {faculty.facultyId}
              </p>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="grid grid-cols-2 gap-5 p-6">

          <DetailItem
            label="Email"
            value={faculty.email}
          />

          <DetailItem
            label="Phone"
            value={faculty.phone}
          />

          <DetailItem
            label="Department"
            value={faculty.department}
          />

          <DetailItem
            label="Designation"
            value={faculty.designation}
          />

          <DetailItem
            label="Joining Year"
            value={faculty.joiningYear}
          />

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </p>

            <div className="mt-1">
              <StatusBadge
                status={faculty.status}
              />
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>

          <button
            onClick={onEdit}
            className="rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
          >
            Edit Faculty
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-700">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
  faculty,
  onCancel,
  onDelete,
}: {
  faculty: Faculty;
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
          Delete faculty?
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-500">

          Are you sure you want to delete{" "}

          <strong>
            {faculty.name}
          </strong>

          ? This action cannot be undone.

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
            Delete Faculty
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}