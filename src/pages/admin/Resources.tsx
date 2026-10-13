import { useMemo, useState } from "react";

type ResourceStatus = "Published" | "Draft";

type ResourceType =
  | "Notes"
  | "Study Material"
  | "Question Paper"
  | "Assignment"
  | "E-Book"
  | "Video"
  | "Other";

type Resource = {
  id: string;
  resourceId: string;
  title: string;
  description: string;
  className: string;
  section: string;
  subject: string;
  type: ResourceType;
  addedBy: string;
  date: string;
  fileName: string;
  status: ResourceStatus;
};

const classOptions = Array.from(
  { length: 12 },
  (_, index) => `Class ${index + 1}`
);

const sectionOptions = [
  "All",
  "A",
  "B",
  "C",
  "D",
];

const subjectOptions = [
  "All",
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Hindi",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
];

const resourceTypeOptions: ResourceType[] = [
  "Notes",
  "Study Material",
  "Question Paper",
  "Assignment",
  "E-Book",
  "Video",
  "Other",
];

const initialResources: Resource[] = [
  {
    id: "1",
    resourceId: "RES001",
    title: "Mathematics Chapter 1 Notes",
    description:
      "Basic mathematics notes for students covering fundamental concepts.",
    className: "Class 6",
    section: "A",
    subject: "Mathematics",
    type: "Notes",
    addedBy: "Dr. Anil Sharma",
    date: "2026-10-05",
    fileName: "mathematics-chapter-1.pdf",
    status: "Published",
  },
  {
    id: "2",
    resourceId: "RES002",
    title: "Science Study Material",
    description:
      "Study material covering important science concepts and examples.",
    className: "Class 8",
    section: "B",
    subject: "Science",
    type: "Study Material",
    addedBy: "Dr. Priya Das",
    date: "2026-10-04",
    fileName: "science-study-material.pdf",
    status: "Published",
  },
  {
    id: "3",
    resourceId: "RES003",
    title: "Class 10 Science Question Paper",
    description:
      "Previous examination question paper for Class 10 Science.",
    className: "Class 10",
    section: "A",
    subject: "Science",
    type: "Question Paper",
    addedBy: "Dr. Sneha Gupta",
    date: "2026-10-03",
    fileName: "class-10-science-paper.pdf",
    status: "Published",
  },
  {
    id: "4",
    resourceId: "RES004",
    title: "English Grammar Assignment",
    description:
      "Grammar assignment covering important topics for students.",
    className: "Class 5",
    section: "A",
    subject: "English",
    type: "Assignment",
    addedBy: "Rahul Mehta",
    date: "2026-10-02",
    fileName: "english-grammar-assignment.pdf",
    status: "Published",
  },
  {
    id: "5",
    resourceId: "RES005",
    title: "Physics Reference E-Book",
    description:
      "Reference e-book for senior secondary Physics students.",
    className: "Class 12",
    section: "A",
    subject: "Physics",
    type: "E-Book",
    addedBy: "Dr. Neha Sharma",
    date: "2026-10-01",
    fileName: "physics-reference-book.pdf",
    status: "Published",
  },
  {
    id: "6",
    resourceId: "RES006",
    title: "Computer Science Introduction",
    description:
      "Introduction to computer science and programming concepts.",
    className: "Class 9",
    section: "B",
    subject: "Computer Science",
    type: "Study Material",
    addedBy: "Rahul Mehta",
    date: "2026-09-30",
    fileName: "computer-science-intro.pdf",
    status: "Draft",
  },
];

const emptyResource: Omit<Resource, "id"> = {
  resourceId: "",
  title: "",
  description: "",
  className: "Class 1",
  section: "A",
  subject: "English",
  type: "Notes",
  addedBy: "",
  date: "2026-10-05",
  fileName: "",
  status: "Published",
};

export default function Resources() {
  const [resources, setResources] =
    useState<Resource[]>(initialResources);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] =
    useState("All");
  const [sectionFilter, setSectionFilter] =
    useState("All");
  const [subjectFilter, setSubjectFilter] =
    useState("All");
  const [typeFilter, setTypeFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [editingResource, setEditingResource] =
    useState<Resource | null>(null);

  const [selectedResource, setSelectedResource] =
    useState<Resource | null>(null);

  const [deleteResource, setDeleteResource] =
    useState<Resource | null>(null);

  const [formData, setFormData] =
    useState<Omit<Resource, "id">>(
      emptyResource
    );

  /* =========================================================
     FILTER RESOURCES
  ========================================================= */

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        resource.title
          .toLowerCase()
          .includes(searchValue) ||
        resource.resourceId
          .toLowerCase()
          .includes(searchValue) ||
        resource.subject
          .toLowerCase()
          .includes(searchValue) ||
        resource.addedBy
          .toLowerCase()
          .includes(searchValue);

      const matchesClass =
        classFilter === "All" ||
        resource.className === classFilter;

      const matchesSection =
        sectionFilter === "All" ||
        resource.section === sectionFilter;

      const matchesSubject =
        subjectFilter === "All" ||
        resource.subject === subjectFilter;

      const matchesType =
        typeFilter === "All" ||
        resource.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        resource.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSection &&
        matchesSubject &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    resources,
    search,
    classFilter,
    sectionFilter,
    subjectFilter,
    typeFilter,
    statusFilter,
  ]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const publishedResources =
    resources.filter(
      (resource) =>
        resource.status === "Published"
    ).length;

  const notesCount = resources.filter(
    (resource) => resource.type === "Notes"
  ).length;

  const questionPapers = resources.filter(
    (resource) =>
      resource.type === "Question Paper"
  ).length;

  /* =========================================================
     OPEN ADD MODAL
  ========================================================= */

  const openAddModal = () => {
    setEditingResource(null);

    setFormData({
      ...emptyResource,
      resourceId: `RES${String(
        resources.length + 1
      ).padStart(3, "0")}`,
    });

    setShowModal(true);
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const openEditModal = (
    resource: Resource
  ) => {
    setEditingResource(resource);

    setFormData({
      resourceId: resource.resourceId,
      title: resource.title,
      description: resource.description,
      className: resource.className,
      section: resource.section,
      subject: resource.subject,
      type: resource.type,
      addedBy: resource.addedBy,
      date: resource.date,
      fileName: resource.fileName,
      status: resource.status,
    });

    setShowModal(true);
  };

  /* =========================================================
     SAVE RESOURCE
  ========================================================= */

  const handleSaveResource = () => {
    if (
      !formData.resourceId.trim() ||
      !formData.title.trim() ||
      !formData.addedBy.trim()
    ) {
      alert(
        "Please fill in all required fields."
      );
      return;
    }

    if (editingResource) {
      setResources((current) =>
        current.map((resource) =>
          resource.id === editingResource.id
            ? {
                ...resource,
                ...formData,
              }
            : resource
        )
      );
    } else {
      const newResource: Resource = {
        id: Date.now().toString(),
        ...formData,
      };

      setResources((current) => [
        newResource,
        ...current,
      ]);
    }

    setShowModal(false);
  };

  /* =========================================================
     DELETE RESOURCE
  ========================================================= */

  const handleDelete = () => {
    if (!deleteResource) return;

    setResources((current) =>
      current.filter(
        (resource) =>
          resource.id !== deleteResource.id
      )
    );

    setDeleteResource(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="flex h-20 items-center justify-between px-5 sm:px-8">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-sky-600">
              Administration
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-800">
              Resources
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

              Add Resource
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

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="p-5 sm:p-8">

        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">

          <span>Dashboard</span>

          <span>›</span>

          <span className="font-semibold text-slate-600">
            Resources
          </span>

        </div>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            title="Total Resources"
            value={resources.length.toString()}
            description="All learning resources"
            icon="▤"
          />

          <SummaryCard
            title="Published"
            value={publishedResources.toString()}
            description="Available to students"
            icon="✓"
            positive
          />

          <SummaryCard
            title="Notes"
            value={notesCount.toString()}
            description="Notes and class material"
            icon="▱"
          />

          <SummaryCard
            title="Question Papers"
            value={questionPapers.toString()}
            description="Practice examinations"
            icon="□"
          />

        </div>

        {/* ===================================================
            RESOURCE TABLE
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}

          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div>

                <h2 className="text-sm font-bold text-slate-800">
                  All Resources
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  View and manage learning resources
                </p>

              </div>

              <div className="text-xs text-slate-400">

                Showing{" "}

                <span className="font-bold text-slate-700">
                  {filteredResources.length}
                </span>{" "}

                resources

              </div>

            </div>

            {/* Filters */}

            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">

              {/* Search */}

              <div className="relative lg:col-span-1">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search resources..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />

              </div>

              {/* Class */}

              <FilterSelect
                value={classFilter}
                onChange={setClassFilter}
                options={[
                  "All",
                  ...classOptions,
                ]}
              />

              {/* Section */}

              <FilterSelect
                value={sectionFilter}
                onChange={setSectionFilter}
                options={sectionOptions}
              />

              {/* Subject */}

              <FilterSelect
                value={subjectFilter}
                onChange={setSubjectFilter}
                options={subjectOptions}
              />

              {/* Type */}

              <FilterSelect
                value={typeFilter}
                onChange={setTypeFilter}
                options={[
                  "All",
                  ...resourceTypeOptions,
                ]}
              />

              {/* Status */}

              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  "All",
                  "Published",
                  "Draft",
                ]}
              />

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1150px]">

              <thead className="bg-slate-50">

                <tr className="border-b border-slate-100">

                  <TableHeader>
                    Resource
                  </TableHeader>

                  <TableHeader>
                    Class
                  </TableHeader>

                  <TableHeader>
                    Subject
                  </TableHeader>

                  <TableHeader>
                    Type
                  </TableHeader>

                  <TableHeader>
                    Added By
                  </TableHeader>

                  <TableHeader>
                    Date
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

                {filteredResources.map(
                  (resource) => (

                    <tr
                      key={resource.id}
                      className="transition hover:bg-slate-50/70"
                    >

                      {/* Resource */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xs font-bold text-sky-600">
                            {getResourceIcon(
                              resource.type
                            )}
                          </div>

                          <div>

                            <p className="text-xs font-bold text-slate-700">
                              {resource.title}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                              {resource.resourceId}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Class */}

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                          {resource.className}
                        </span>

                        <span className="ml-1 text-[10px] text-slate-400">
                          Sec. {resource.section}
                        </span>

                      </td>

                      {/* Subject */}

                      <td className="px-5 py-4">

                        <span className="text-xs font-medium text-slate-600">
                          {resource.subject}
                        </span>

                      </td>

                      {/* Type */}

                      <td className="px-5 py-4">

                        <ResourceTypeBadge
                          type={resource.type}
                        />

                      </td>

                      {/* Added By */}

                      <td className="px-5 py-4">

                        <span className="text-xs text-slate-600">
                          {resource.addedBy}
                        </span>

                      </td>

                      {/* Date */}

                      <td className="px-5 py-4">

                        <span className="text-xs text-slate-500">
                          {formatDate(
                            resource.date
                          )}
                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">

                        <ResourceStatusBadge
                          status={resource.status}
                        />

                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-1">

                          <ActionButton
                            label="View"
                            onClick={() =>
                              setSelectedResource(
                                resource
                              )
                            }
                          />

                          <ActionButton
                            label="Edit"
                            onClick={() =>
                              openEditModal(
                                resource
                              )
                            }
                          />

                          <ActionButton
                            label="Delete"
                            danger
                            onClick={() =>
                              setDeleteResource(
                                resource
                              )
                            }
                          />

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            {/* Empty State */}

            {filteredResources.length ===
              0 && (

              <div className="px-5 py-16 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  ⌕
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-700">
                  No resources found
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

            <p className="text-[10px] text-slate-400">

              Showing{" "}

              <span className="font-semibold text-slate-600">
                {filteredResources.length}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-slate-600">
                {resources.length}
              </span>{" "}

              resources

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

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <ResourceModal
          editing={!!editingResource}
          formData={formData}
          setFormData={setFormData}
          onClose={() =>
            setShowModal(false)
          }
          onSave={handleSaveResource}
        />

      )}

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {selectedResource && (

        <ResourceDetailsModal
          resource={selectedResource}
          onClose={() =>
            setSelectedResource(null)
          }
          onEdit={() => {
            setSelectedResource(null);
            openEditModal(
              selectedResource
            );
          }}
        />

      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteResource && (

        <DeleteModal
          resource={deleteResource}
          onCancel={() =>
            setDeleteResource(null)
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
   RESOURCE TYPE BADGE
========================================================= */

function ResourceTypeBadge({
  type,
}: {
  type: ResourceType;
}) {
  const styles: Record<
    ResourceType,
    string
  > = {
    Notes:
      "bg-sky-50 text-sky-600",
    "Study Material":
      "bg-indigo-50 text-indigo-600",
    "Question Paper":
      "bg-violet-50 text-violet-600",
    Assignment:
      "bg-amber-50 text-amber-600",
    "E-Book":
      "bg-emerald-50 text-emerald-600",
    Video:
      "bg-rose-50 text-rose-600",
    Other:
      "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

/* =========================================================
   RESOURCE STATUS BADGE
========================================================= */

function ResourceStatusBadge({
  status,
}: {
  status: ResourceStatus;
}) {
  const styles: Record<
    ResourceStatus,
    string
  > = {
    Published:
      "bg-emerald-50 text-emerald-600",
    Draft:
      "bg-amber-50 text-amber-600",
  };

  const dots: Record<
    ResourceStatus,
    string
  > = {
    Published: "bg-emerald-500",
    Draft: "bg-amber-500",
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
   RESOURCE MODAL
========================================================= */

function ResourceModal({
  editing,
  formData,
  setFormData,
  onClose,
  onSave,
}: {
  editing: boolean;
  formData: Omit<Resource, "id">;
  setFormData: React.Dispatch<
    React.SetStateAction<
      Omit<Resource, "id">
    >
  >;
  onClose: () => void;
  onSave: () => void;
}) {
  const updateField = (
    field: keyof Omit<Resource, "id">,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div>

            <h2 className="text-base font-bold text-slate-800">
              {editing
                ? "Edit Resource"
                : "Add New Resource"}
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              {editing
                ? "Update resource information"
                : "Add a learning resource for students"}
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
            label="Resource ID"
            value={formData.resourceId}
            onChange={(value) =>
              updateField(
                "resourceId",
                value
              )
            }
            placeholder="RES001"
            required
          />

          <InputField
            label="Resource Title"
            value={formData.title}
            onChange={(value) =>
              updateField(
                "title",
                value
              )
            }
            placeholder="Mathematics Chapter 1 Notes"
            required
          />

          <SelectField
            label="Class"
            value={formData.className}
            onChange={(value) =>
              updateField(
                "className",
                value
              )
            }
            options={classOptions}
          />

          <SelectField
            label="Section"
            value={formData.section}
            onChange={(value) =>
              updateField(
                "section",
                value
              )
            }
            options={[
              "A",
              "B",
              "C",
              "D",
            ]}
          />

          <SelectField
            label="Subject"
            value={formData.subject}
            onChange={(value) =>
              updateField(
                "subject",
                value
              )
            }
            options={subjectOptions.filter(
              (subject) =>
                subject !== "All"
            )}
          />

          <SelectField
            label="Resource Type"
            value={formData.type}
            onChange={(value) =>
              updateField(
                "type",
                value
              )
            }
            options={resourceTypeOptions}
          />

          <InputField
            label="Added By"
            value={formData.addedBy}
            onChange={(value) =>
              updateField(
                "addedBy",
                value
              )
            }
            placeholder="Faculty name"
            required
          />

          <InputField
            label="Date"
            value={formData.date}
            onChange={(value) =>
              updateField(
                "date",
                value
              )
            }
            type="date"
          />

          <div className="sm:col-span-2">

            <InputField
              label="File Name / Resource URL"
              value={formData.fileName}
              onChange={(value) =>
                updateField(
                  "fileName",
                  value
                )
              }
              placeholder="chapter-1.pdf or https://..."
            />

          </div>

          <div className="sm:col-span-2">

            <label className="mb-2 block text-xs font-bold text-slate-700">
              Description
            </label>

            <textarea
              value={formData.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Enter a short description of the resource..."
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
            />

          </div>

          <SelectField
            label="Status"
            value={formData.status}
            onChange={(value) =>
              updateField(
                "status",
                value
              )
            }
            options={[
              "Published",
              "Draft",
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
              : "Add Resource"}
          </button>

        </div>

      </div>

    </div>
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

function ResourceDetailsModal({
  resource,
  onClose,
  onEdit,
}: {
  resource: Resource;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="relative bg-[#102a43] px-6 py-7 text-white">

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            ×
          </button>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#102a43]">
              {getResourceIcon(
                resource.type
              )}
            </div>

            <div>

              <h2 className="text-lg font-bold">
                {resource.title}
              </h2>

              <p className="mt-1 text-xs text-slate-300">
                {resource.type}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {resource.resourceId}
              </p>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="grid grid-cols-2 gap-5 p-6">

          <DetailItem
            label="Class"
            value={`${resource.className} - Section ${resource.section}`}
          />

          <DetailItem
            label="Subject"
            value={resource.subject}
          />

          <DetailItem
            label="Added By"
            value={resource.addedBy}
          />

          <DetailItem
            label="Date"
            value={formatDate(
              resource.date
            )}
          />

          <DetailItem
            label="File / URL"
            value={resource.fileName || "Not provided"}
          />

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </p>

            <div className="mt-1">

              <ResourceStatusBadge
                status={resource.status}
              />

            </div>

          </div>

          <div className="col-span-2">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Description
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              {resource.description ||
                "No description provided."}
            </p>

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
            Edit Resource
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
  resource,
  onCancel,
  onDelete,
}: {
  resource: Resource;
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
          Delete resource?
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-500">

          Are you sure you want to delete{" "}

          <strong>
            {resource.title}
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
            Delete Resource
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatDate(date: string) {
  if (!date) return "-";

  const parsedDate = new Date(
    `${date}T00:00:00`
  );

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function getResourceIcon(
  type: ResourceType
) {
  const icons: Record<
    ResourceType,
    string
  > = {
    Notes: "N",
    "Study Material": "S",
    "Question Paper": "Q",
    Assignment: "A",
    "E-Book": "E",
    Video: "V",
    Other: "•",
  };

  return icons[type];
}
