import type { CollectionConfig } from "payload";

export const Tasks: CollectionConfig = {
  slug: "tasks",
  labels: {
    singular: "Task",
    plural: "Tasks",
  },
  admin: {
    useAsTitle: "title"
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Task Title",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Task Description", 
    },
    {
      name: "dueDate",
      type: "date",
      label: "Due Date",
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
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      label: "Assigned To",
      hasMany: true,
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
        position: "sidebar"
      }
    },
  ],
  timestamps: true,
};
