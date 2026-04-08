import type { CollectionConfig } from "payload";

export const Tasks: CollectionConfig = {
  slug: "tasks",
  folders: true,
  labels: {
    singular: "Task",
    plural: "Tasks",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Task Title",
      required: true,
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "tasks", // self reference
      label: "Main task",
    },
    {
      name: "content",
      type: "richText",
      label: "Task Description",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Task Status",
      options: [
        { label: "To Do", value: "todo" },
        { label: "In Progress", value: "in-progress" },
        { label: "In Review", value: "in-review" },
        { label: "Blocked", value: "blocked" },
        { label: "Completed", value: "done" },
      ],
      defaultValue: "to-do",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Bug", value: "bug" },
        { label: "Feature", value: "feature" },
        { label: "Improvement", value: "improvement" },
      ],
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      admin: {
        description: "Add labels like bug, frontend, urgent",
      },
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      label: "Assigned To",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      label: "Project",
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
      name: "timeTaken",
      label: "Time Taken (in hours)",
      type: "number",
      min: 0,
      admin: {
        description: "Enter the total time taken (in hours).",
        position: "sidebar",
      },
    }, {
      name: "estimatedTime",
      label: "Estimated time (in hours)",
      type: "number",
      min: 0,
      admin: {
        description: "time given to task, complete within given time",
        position: "sidebar",
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      admin: {
        position: "sidebar",
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
      name: "completedAt",
      type: "date",
      label: "Completed At",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "attachments",
      type: "upload",
      relationTo: "media",
      label: "Attachments",
      hasMany: true,
    },
    {
      name: "comments",
      type: "relationship",
      relationTo: "comments",
      label: "Comments",
    }
  ],
  timestamps: true,
};
