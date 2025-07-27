import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  access: {
    create: ({ req }) => {
      return (
        req.user?.roles.some((role) => role == "admin" || role == "manager") ??
        false
      );
    },
    read: () => true,
    update: ({ req, data }) => {
      // const user = req.user;
      // const assignedTo = data?.assignedTo;
      // const userBelongs = assignedTo?.contains(user?.id);
      // return req.user?.roles.some((role) => role === "admin") || userBelongs;

      return true;
    },
    delete: ({ req }) => {
      return (
        req.user?.roles.some((role) => role == "admin" || role == "manager") ??
        false
      );
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      label: "Author",
      relationTo: "users",
    },
    {
      name: "description",
      type: "richText",
      label: "Description",
    },
    {
      label: "Featured Image",
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "priority",
      type: "select",
      label: "Priority",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
      defaultValue: "medium",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Not started", value: "not-started" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "In Review", value: "in-review" },
      ],
      defaultValue: "not-started",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      label: "Assigned To",
      hasMany: true,
      admin: {
        allowCreate: false,
        position: "sidebar",
      },
    },
    {
      name: "tasks",
      type: "relationship",
      relationTo: "tasks",
      label: "Tasks",
      hasMany: true,
      admin: {
        isSortable: true,
        position: "sidebar",
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "dueDate",
      type: "date",
      label: "Due Date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },

    {
      name: "notes",
      type: "relationship",
      relationTo: "notes",
      label: "Notes",
      hasMany: true,
      admin: {
        allowCreate: false,
        position: "sidebar",
        isSortable: true,
      },
    },
    {
      name: "attachments",
      type: "upload",
      relationTo: "media",
      label: "Attachments",
      hasMany: true,
      admin: {
        description: "Upload files related to the project.",
        position: "sidebar",
      },
    },
    {
      name: "timeline",
      type: "relationship",
      relationTo: "timeline",
      hasMany: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "View all logged timeline events",
      },
    },
    {
      label: "Eastimated Time (in hours)",
      name: "eastimatedTime",
      type: "number",
      admin: {
        position: "sidebar",
        description: "Project to be completed in time period",
      },
    },
    {
      label: "Total time (in hours)",
      name: "totalTime",
      type: "number",
      admin: {
        position: "sidebar",
        description:
          "Total time in project completion. (invested time in this project)",
        readOnly: true,
      },
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === "create") {
          await req.payload.create({
            collection: "notifications",
            data: {
              title: "New Project Created",
              content: `Project "<a href="${process.env.APP_URL}/dashboard/projects/${doc.id}">${doc.title}</a>" was created.`,
            },
          });
        }
      },
    ],
  },
};
