import { useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type FacultyStatus = "Active" | "On Leave" | "Inactive";

type Gender = "Male" | "Female" | "Other";

type EmployeeType = "Permanent" | "Contract" | "Visiting" | "Guest";

type AccountStatus = "Active" | "Pending" | "Disabled";

type Faculty = {
  id: string;

  // Basic
  facultyId: string;
  name: string;
  profilePhoto: string;
  gender: Gender;
  dateOfBirth: string;

  // Contact
  phone: string;
  alternatePhone: string;
  personalEmail: string;
  email: string;

  // Professional
  department: string;
  employeeType: EmployeeType;
  joiningDate: string;
  joiningYear: string;
  qualification: string;
  specialization: string;
  experience: string;
  subjects: string;

  // Address
  address: string;
  city: string;
  state: string;
  pinCode: string;

  // Emergency
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  // Account
  username: string;
  temporaryPassword: string;
  accountStatus: AccountStatus;

  // Faculty status
  status: FacultyStatus;
};

/* =========================================================
   INITIAL DATA
========================================================= */

const initialFaculty: Faculty[] = [
  {
    id: "1",
    facultyId: "FAC001",
    name: "Dr. Anil Sharma",
    profilePhoto: "",
    gender: "Male",
    dateOfBirth: "1980-05-12",

    phone: "+91 98765 10001",
    alternatePhone: "+91 98765 20001",
    personalEmail: "anil.sharma@gmail.com",
    email: "anil.sharma@college.edu",

    department: "Computer Science",
    employeeType: "Permanent",
    joiningDate: "2018-07-01",
    joiningYear: "2018",
    qualification: "Ph.D. Computer Science",
    specialization: "Artificial Intelligence",
    experience: "15 Years",
    subjects: "Artificial Intelligence, Machine Learning",

    address: "12 University Road",
    city: "Guwahati",
    state: "Assam",
    pinCode: "781001",

    emergencyName: "Sunita Sharma",
    emergencyPhone: "+91 98765 30001",
    emergencyRelationship: "Spouse",

    username: "anil.sharma",
    temporaryPassword: "••••••••",
    accountStatus: "Active",

    status: "Active",
  },

  {
    id: "2",
    facultyId: "FAC002",
    name: "Dr. Priya Das",
    profilePhoto: "",
    gender: "Female",
    dateOfBirth: "1985-09-20",

    phone: "+91 98765 10002",
    alternatePhone: "",
    personalEmail: "priya.das@gmail.com",
    email: "priya.das@college.edu",

    department: "Computer Science",
    employeeType: "Permanent",
    joiningDate: "2020-07-15",
    joiningYear: "2020",
    qualification: "Ph.D. Computer Science",
    specialization: "Cybersecurity",
    experience: "10 Years",
    subjects: "Network Security, Web Security",

    address: "45 College Road",
    city: "Guwahati",
    state: "Assam",
    pinCode: "781005",

    emergencyName: "Raj Das",
    emergencyPhone: "+91 98765 30002",
    emergencyRelationship: "Spouse",

    username: "priya.das",
    temporaryPassword: "••••••••",
    accountStatus: "Active",

    status: "Active",
  },

  {
    id: "3",
    facultyId: "FAC003",
    name: "Rahul Mehta",
    profilePhoto: "",
    gender: "Male",
    dateOfBirth: "1988-03-18",

    phone: "+91 98765 10003",
    alternatePhone: "",
    personalEmail: "rahul.mehta@gmail.com",
    email: "rahul.mehta@college.edu",

    department: "Information Technology",
    employeeType: "Permanent",
    joiningDate: "2022-08-01",
    joiningYear: "2022",
    qualification: "M.Tech Information Technology",
    specialization: "Cloud Computing",
    experience: "7 Years",
    subjects: "Cloud Computing, DevOps",

    address: "21 MG Road",
    city: "Guwahati",
    state: "Assam",
    pinCode: "781003",

    emergencyName: "Asha Mehta",
    emergencyPhone: "+91 98765 30003",
    emergencyRelationship: "Mother",

    username: "rahul.mehta",
    temporaryPassword: "••••••••",
    accountStatus: "Active",

    status: "Active",
  },

  {
    id: "4",
    facultyId: "FAC004",
    name: "Dr. Sneha Gupta",
    profilePhoto: "",
    gender: "Female",
    dateOfBirth: "1978-11-05",

    phone: "+91 98765 10004",
    alternatePhone: "",
    personalEmail: "sneha.gupta@gmail.com",
    email: "sneha.gupta@college.edu",

    department: "Electronics",
    employeeType: "Permanent",
    joiningDate: "2016-06-20",
    joiningYear: "2016",
    qualification: "Ph.D. Electronics",
    specialization: "Embedded Systems",
    experience: "18 Years",
    subjects: "Digital Electronics, Embedded Systems",

    address: "8 Engineering Colony",
    city: "Guwahati",
    state: "Assam",
    pinCode: "781006",

    emergencyName: "Amit Gupta",
    emergencyPhone: "+91 98765 30004",
    emergencyRelationship: "Spouse",

    username: "sneha.gupta",
    temporaryPassword: "••••••••",
    accountStatus: "Active",

    status: "Active",
  },

  {
    id: "5",
    facultyId: "FAC005",
    name: "Amit Kumar",
    profilePhoto: "",
    gender: "Male",
    dateOfBirth: "1990-01-15",

    phone: "+91 98765 10005",
    alternatePhone: "",
    personalEmail: "amit.kumar@gmail.com",
    email: "amit.kumar@college.edu",

    department: "Mechanical",
    employeeType: "Contract",
    joiningDate: "2023-07-01",
    joiningYear: "2023",
    qualification: "M.Tech Mechanical Engineering",
    specialization: "Thermal Engineering",
    experience: "5 Years",
    subjects: "Thermodynamics, Fluid Mechanics",

    address: "17 Industrial Area",
    city: "Guwahati",
    state: "Assam",
    pinCode: "781007",

    emergencyName: "Ravi Kumar",
    emergencyPhone: "+91 98765 30005",
    emergencyRelationship: "Father",

    username: "amit.kumar",
    temporaryPassword: "••••••••",
    accountStatus: "Active",

    status: "On Leave",
  },

  {
    id: "6",
    facultyId: "FAC006",
    name: "Dr. Neha Sharma",
    profilePhoto: "",
    gender: "Female",
    dateOfBirth: "1987-06-10",

    phone: "+91 98765 10006",
    alternatePhone: "",
    personalEmail: "neha.sharma@gmail.com",
    email: "neha.sharma@college.edu",

    department: "Computer Science",
    employeeType: "Permanent",
    joiningDate: "2021-07-10",
    joiningYear: "2021",
    qualification: "M.Tech Computer Science",
    specialization: "Data Science",
    experience: "8 Years",
    subjects: "Data Science, Python Programming",

    address: "33 University Road",
    city: "Guwahati",
    state: "Assam",
    pinCode: "781001",

    emergencyName: "Vikram Sharma",
    emergencyPhone: "+91 98765 30006",
    emergencyRelationship: "Brother",

    username: "neha.sharma",
    temporaryPassword: "••••••••",
    accountStatus: "Active",

    status: "Active",
  },
];

/* =========================================================
   EMPTY FACULTY
========================================================= */

const emptyFaculty: Omit<Faculty, "id"> = {
  facultyId: "",
  name: "",
  profilePhoto: "",
  gender: "Male",
  dateOfBirth: "",

  phone: "",
  alternatePhone: "",
  personalEmail: "",
  email: "",

  department: "Computer Science",
  employeeType: "Permanent",
  joiningDate: "",
  joiningYear: "2026",
  qualification: "",
  specialization: "",
  experience: "",
  subjects: "",

  address: "",
  city: "",
  state: "",
  pinCode: "",

  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",

  username: "",
  temporaryPassword: "",
  accountStatus: "Pending",

  status: "Active",
};

/* =========================================================
   MAIN FACULTY PAGE
========================================================= */

export default function Faculty() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const [deleteFaculty, setDeleteFaculty] = useState<Faculty | null>(null);

  const [formData, setFormData] = useState<Omit<Faculty, "id">>(emptyFaculty);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredFaculty = useMemo(() => {
    return faculty.filter((member) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(searchValue) ||
        member.facultyId.toLowerCase().includes(searchValue) ||
        member.email.toLowerCase().includes(searchValue) ||
        member.department.toLowerCase().includes(searchValue);

      const matchesDepartment =
        department === "All" || member.department === department;

      const matchesStatus = status === "All" || member.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [faculty, search, department, status]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const activeFaculty = faculty.filter(
    (member) => member.status === "Active",
  ).length;

  const onLeaveFaculty = faculty.filter(
    (member) => member.status === "On Leave",
  ).length;

  /* =========================================================
     ADD FACULTY
  ========================================================= */

  const openAddModal = () => {
    setEditingFaculty(null);

    const nextId = faculty.length + 1;

    setFormData({
      ...emptyFaculty,

      facultyId: `FAC${String(nextId).padStart(3, "0")}`,

      username: "",
      temporaryPassword: generateTemporaryPassword(),
    });

    setShowModal(true);
  };

  /* =========================================================
     EDIT FACULTY
  ========================================================= */

  const openEditModal = (member: Faculty) => {
    setEditingFaculty(member);

    setFormData({
      facultyId: member.facultyId,

      name: member.name,

      profilePhoto: member.profilePhoto,

      gender: member.gender,

      dateOfBirth: member.dateOfBirth,

      phone: member.phone,

      alternatePhone: member.alternatePhone,

      personalEmail: member.personalEmail,

      email: member.email,

      department: member.department,

      employeeType: member.employeeType,

      joiningDate: member.joiningDate,

      joiningYear: member.joiningYear,

      qualification: member.qualification,

      specialization: member.specialization,

      experience: member.experience,

      subjects: member.subjects,

      address: member.address,

      city: member.city,

      state: member.state,

      pinCode: member.pinCode,

      emergencyName: member.emergencyName,

      emergencyPhone: member.emergencyPhone,

      emergencyRelationship: member.emergencyRelationship,

      username: member.username,

      temporaryPassword: member.temporaryPassword,

      accountStatus: member.accountStatus,

      status: member.status,
    });

    setShowModal(true);
  };

  /* =========================================================
     SAVE FACULTY
  ========================================================= */

  const handleSaveFaculty = () => {
    if (
      !formData.facultyId.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.department.trim()
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
            : member,
        ),
      );
    } else {
      const newFaculty: Faculty = {
        id: Date.now().toString(),
        ...formData,
      };

      setFaculty((current) => [newFaculty, ...current]);
    }

    setShowModal(false);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteFaculty) return;

    setFaculty((current) =>
      current.filter((member) => member.id !== deleteFaculty.id),
    );

    setDeleteFaculty(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-20 items-center justify-between px-5 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-800">
              Faculty Details
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
            >
              <span className="text-lg">+</span>
              Add Faculty
            </button>

            <div className="hidden h-9 w-px bg-slate-200 sm:block" />

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                AD
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700">
                  Administrator
                </p>

                <p className="text-xs text-slate-400">System Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="p-5 sm:p-8">
        {/* Breadcrumb */}

        <div className="mb-7 flex items-center gap-2 text-sm text-slate-400">
          <span>Dashboard</span>

          <span>›</span>

          <span className="font-semibold text-slate-600">Faculty</span>
        </div>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="mb-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* <SummaryCard
            title="Professors"
            value={professors.toString()}
            description="Senior faculty"
            icon="★"
          /> */}

          <SummaryCard
            title="On Leave"
            value={onLeaveFaculty.toString()}
            description="Currently on leave"
            icon="−"
          />
        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  All Faculty
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  View and manage college faculty
                </p>
              </div>

              <div className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-700">
                  {filteredFaculty.length}
                </span>{" "}
                faculty members
              </div>
            </div>

            {/* Filters */}

            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search faculty..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />
              </div>

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

              <FilterSelect
                value={status}
                onChange={setStatus}
                options={["All", "Active", "On Leave", "Inactive"]}
              />
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-100">
                  <TableHeader>Faculty</TableHeader>

                  <TableHeader>Faculty ID</TableHeader>

                  <TableHeader>Department</TableHeader>

                  <TableHeader>Joining Year</TableHeader>

                  <TableHeader>Status</TableHeader>

                  <TableHeader align="right">Actions</TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredFaculty.map((member) => (
                  <tr
                    key={member.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-600">
                          {getInitials(member.name)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {member.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">
                        {member.facultyId}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-600">
                      {member.department}
                    </td>

                    <td className="px-5 py-5">
                      <span className="text-sm text-slate-500">
                        {member.joiningYear}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={member.status} />
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-end gap-1">
                        <ActionButton
                          label="View"
                          onClick={() => setSelectedFaculty(member)}
                        />

                        <ActionButton
                          label="Edit"
                          onClick={() => openEditModal(member)}
                        />

                        <ActionButton
                          label="Delete"
                          danger
                          onClick={() => setDeleteFaculty(member)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFaculty.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  ⌕
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-700">
                  No faculty found
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-5">
            <p className="text-xs text-slate-400">
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-300"
              >
                ‹
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white">
                1
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50">
                2
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50">
                ›
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          MODALS
      ===================================================== */}

      {showModal && (
        <FacultyModal
          editing={!!editingFaculty}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowModal(false)}
          onSave={handleSaveFaculty}
        />
      )}

      {selectedFaculty && (
        <FacultyDetailsModal
          faculty={selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
          onEdit={() => {
            setSelectedFaculty(null);

            openEditModal(selectedFaculty);
          }}
        />
      )}

      {deleteFaculty && (
        <DeleteModal
          faculty={deleteFaculty}
          onCancel={() => setDeleteFaculty(null)}
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
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-sky-50 text-sky-600"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </div>
  );
}

/* =========================================================
   FILTER SELECT
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
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
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
      className={`px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }: { status: FacultyStatus }) {
  const styles: Record<FacultyStatus, string> = {
    Active: "bg-emerald-50 text-emerald-600",

    "On Leave": "bg-amber-50 text-amber-600",

    Inactive: "bg-slate-100 text-slate-500",
  };

  const dots: Record<FacultyStatus, string> = {
    Active: "bg-emerald-500",

    "On Leave": "bg-amber-500",

    Inactive: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />

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
      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
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
  setFormData: React.Dispatch<React.SetStateAction<Omit<Faculty, "id">>>;
  onClose: () => void;
  onSave: () => void;
}) {
  const updateField = (field: keyof Omit<Faculty, "id">, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {editing ? "Edit Faculty Profile" : "Create Faculty Profile"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {editing
                ? "Update faculty information"
                : "Create a complete faculty profile and account"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-400 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <FormSection
            title="Personal Information"
            description="Basic identity and personal details"
          >
            <InputField
              label="Faculty ID"
              value={formData.facultyId}
              onChange={(value) => updateField("facultyId", value)}
              placeholder="FAC001"
              required
            />

            <InputField
              label="Full Name"
              value={formData.name}
              onChange={(value) => updateField("name", value)}
              placeholder="Dr. John Smith"
              required
            />

            <SelectField
              label="Gender"
              value={formData.gender}
              onChange={(value) => updateField("gender", value)}
              options={["Male", "Female", "Other"]}
            />

            <InputField
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(value) => updateField("dateOfBirth", value)}
              type="date"
            />

            <InputField
              label="Profile Photo URL"
              value={formData.profilePhoto}
              onChange={(value) => updateField("profilePhoto", value)}
              placeholder="https://..."
            />
          </FormSection>

          {/* =================================================
              CONTACT
          ================================================= */}

          <FormSection
            title="Contact Information"
            description="Faculty contact details"
          >
            <InputField
              label="College Email"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              placeholder="faculty@college.edu"
              type="email"
              required
            />

            <InputField
              label="Personal Email"
              value={formData.personalEmail}
              onChange={(value) => updateField("personalEmail", value)}
              placeholder="faculty@gmail.com"
              type="email"
            />

            <InputField
              label="Phone Number"
              value={formData.phone}
              onChange={(value) => updateField("phone", value)}
              placeholder="+91 XXXXX XXXXX"
              required
            />

            <InputField
              label="Alternate Phone"
              value={formData.alternatePhone}
              onChange={(value) => updateField("alternatePhone", value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </FormSection>

          {/* =================================================
              PROFESSIONAL
          ================================================= */}

          <FormSection
            title="Professional Information"
            description="Employment and academic information"
          >
            <SelectField
              label="Department"
              value={formData.department}
              onChange={(value) => updateField("department", value)}
              options={[
                "Computer Science",
                "Information Technology",
                "Electronics",
                "Mechanical",
              ]}
            />

            <SelectField
              label="Employee Type"
              value={formData.employeeType}
              onChange={(value) => updateField("employeeType", value)}
              options={["Permanent", "Contract", "Visiting", "Guest"]}
            />

            <InputField
              label="Joining Date"
              value={formData.joiningDate}
              onChange={(value) => updateField("joiningDate", value)}
              type="date"
            />

            <InputField
              label="Qualification"
              value={formData.qualification}
              onChange={(value) => updateField("qualification", value)}
              placeholder="Ph.D / M.Tech / M.Sc"
            />

            <InputField
              label="Specialization"
              value={formData.specialization}
              onChange={(value) => updateField("specialization", value)}
              placeholder="Cybersecurity"
            />

            <InputField
              label="Total Experience"
              value={formData.experience}
              onChange={(value) => updateField("experience", value)}
              placeholder="8 Years"
            />

            <InputField
              label="Subjects / Courses"
              value={formData.subjects}
              onChange={(value) => updateField("subjects", value)}
              placeholder="DBMS, Operating Systems"
            />

            <InputField
              label="Joining Year"
              value={formData.joiningYear}
              onChange={(value) => updateField("joiningYear", value)}
              placeholder="2026"
            />
          </FormSection>

          {/* =================================================
              ADDRESS
          ================================================= */}

          <FormSection
            title="Address"
            description="Current residential address"
          >
            <div className="sm:col-span-2">
              <InputField
                label="Address"
                value={formData.address}
                onChange={(value) => updateField("address", value)}
                placeholder="House number, street, area"
              />
            </div>

            <InputField
              label="City"
              value={formData.city}
              onChange={(value) => updateField("city", value)}
              placeholder="Guwahati"
            />

            <InputField
              label="State"
              value={formData.state}
              onChange={(value) => updateField("state", value)}
              placeholder="Assam"
            />

            <InputField
              label="PIN Code"
              value={formData.pinCode}
              onChange={(value) => updateField("pinCode", value)}
              placeholder="781001"
            />
          </FormSection>

          {/* =================================================
              EMERGENCY
          ================================================= */}

          <FormSection
            title="Emergency Contact"
            description="Contact person for emergencies"
          >
            <InputField
              label="Contact Name"
              value={formData.emergencyName}
              onChange={(value) => updateField("emergencyName", value)}
              placeholder="Emergency contact name"
            />

            <InputField
              label="Contact Phone"
              value={formData.emergencyPhone}
              onChange={(value) => updateField("emergencyPhone", value)}
              placeholder="+91 XXXXX XXXXX"
            />

            <InputField
              label="Relationship"
              value={formData.emergencyRelationship}
              onChange={(value) => updateField("emergencyRelationship", value)}
              placeholder="Father / Mother / Spouse"
            />
          </FormSection>

          {/* =================================================
              ACCOUNT
          ================================================= */}

          <FormSection
            title="Faculty Account"
            description="Login account for the faculty portal"
          >
            <InputField
              label="Username"
              value={formData.username}
              onChange={(value) => updateField("username", value)}
              placeholder="john.smith"
            />

            <InputField
              label="Temporary Password"
              value={formData.temporaryPassword}
              onChange={(value) => updateField("temporaryPassword", value)}
              placeholder="Temporary password"
            />

            <SelectField
              label="Account Status"
              value={formData.accountStatus}
              onChange={(value) => updateField("accountStatus", value)}
              options={["Active", "Pending", "Disabled"]}
            />

            <SelectField
              label="Faculty Status"
              value={formData.status}
              onChange={(value) => updateField("status", value)}
              options={["Active", "On Leave", "Inactive"]}
            />
          </FormSection>
        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
          >
            {editing ? "Save Changes" : "Create Faculty"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>

        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
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
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
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
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
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
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="relative bg-[#102a43] px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg text-white hover:bg-white/20"
          >
            ×
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#102a43]">
              {getInitials(faculty.name)}
            </div>

            <div>
              <h2 className="text-xl font-bold">{faculty.name}</h2>

              <p className="mt-1 text-xs text-slate-400">{faculty.facultyId}</p>
            </div>
          </div>
        </div>

        {/* Details */}

        <div className="p-7">
          <DetailsSection title="Personal Information">
            <DetailItem label="Gender" value={faculty.gender} />

            <DetailItem
              label="Date of Birth"
              value={faculty.dateOfBirth || "Not provided"}
            />
          </DetailsSection>

          <DetailsSection title="Contact Information">
            <DetailItem label="College Email" value={faculty.email} />

            <DetailItem
              label="Personal Email"
              value={faculty.personalEmail || "Not provided"}
            />

            <DetailItem label="Phone" value={faculty.phone} />

            <DetailItem
              label="Alternate Phone"
              value={faculty.alternatePhone || "Not provided"}
            />
          </DetailsSection>

          <DetailsSection title="Professional Information">
            <DetailItem label="Department" value={faculty.department} />

            <DetailItem label="Employee Type" value={faculty.employeeType} />

            <DetailItem
              label="Joining Date"
              value={faculty.joiningDate || "Not provided"}
            />

            <DetailItem
              label="Qualification"
              value={faculty.qualification || "Not provided"}
            />

            <DetailItem
              label="Specialization"
              value={faculty.specialization || "Not provided"}
            />

            <DetailItem
              label="Experience"
              value={faculty.experience || "Not provided"}
            />

            <DetailItem
              label="Subjects"
              value={faculty.subjects || "Not provided"}
            />
          </DetailsSection>

          <DetailsSection title="Address">
            <DetailItem
              label="Address"
              value={faculty.address || "Not provided"}
            />

            <DetailItem label="City" value={faculty.city || "Not provided"} />

            <DetailItem label="State" value={faculty.state || "Not provided"} />

            <DetailItem
              label="PIN Code"
              value={faculty.pinCode || "Not provided"}
            />
          </DetailsSection>

          <DetailsSection title="Emergency Contact">
            <DetailItem
              label="Name"
              value={faculty.emergencyName || "Not provided"}
            />

            <DetailItem
              label="Phone"
              value={faculty.emergencyPhone || "Not provided"}
            />

            <DetailItem
              label="Relationship"
              value={faculty.emergencyRelationship || "Not provided"}
            />
          </DetailsSection>

          <DetailsSection title="Account">
            <DetailItem
              label="Username"
              value={faculty.username || "Not configured"}
            />

            <DetailItem label="Account Status" value={faculty.accountStatus} />

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Faculty Status
              </p>

              <div className="mt-2">
                <StatusBadge status={faculty.status} />
              </div>
            </div>
          </DetailsSection>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>

          <button
            onClick={onEdit}
            className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white hover:bg-sky-700"
          >
            Edit Faculty
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DETAILS SECTION
========================================================= */

function DetailsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <h3 className="mb-4 text-sm font-bold text-slate-800">{title}</h3>

      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
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
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-red-50 text-lg font-bold text-red-600">
          !
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-800">
          Delete faculty?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <strong className="text-slate-700">{faculty.name}</strong>? This
          action cannot be undone.
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
          >
            Delete Faculty
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PASSWORD GENERATOR
========================================================= */

function generateTemporaryPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let password = "";

  for (let i = 0; i < 10; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

/* =========================================================
   INITIALS
========================================================= */

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
