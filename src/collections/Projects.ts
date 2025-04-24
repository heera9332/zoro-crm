import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
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
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "dueDate",
      type: "date",
      label: "Due Date",
      required: true,
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
        { label: "Doing", value: "doing" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "to-do",
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
      },
    }
  ],
};
