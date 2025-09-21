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
    }
    ,{
      name: "comments",
      type: "relationship",
      relationTo: "comments",
      label: "Comments",
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
        { label: "To Do", value: "to-do" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
      ],
      defaultValue: "to-do",
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
    },{
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
  ],
  timestamps: true,
};
