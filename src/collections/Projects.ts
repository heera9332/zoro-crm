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
    update: () => true,
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
      name: "description",
      type: "richText",
      label: "Description",
    },
    {
      name: "tasks",
      type: "relationship",
      relationTo: "tasks", // Linking tasks collection here
      label: "Tasks",
      hasMany: true, // Multiple tasks can be linked to one project
      admin: {
        isSortable: true,
      },
    },
    {
      name: "dueDate",
      type: "date",
      label: "Due Date",
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
  ], 
};
