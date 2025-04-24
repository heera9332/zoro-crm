import type { CollectionConfig } from "payload";

export const Tasks: CollectionConfig = {
  slug: "tasks",
  labels: {
    singular: "Task",
    plural: "Tasks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Task Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Task Description",
      required: true,
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
  ],
  timestamps: true,
};
