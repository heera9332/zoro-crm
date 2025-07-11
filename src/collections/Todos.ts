import type { CollectionConfig } from "payload";

export const Todos: CollectionConfig = {
  slug: "todos",
  labels: {
    singular: "Todo",
    plural: "Todos",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      name: "content",
      type: "richText",
      label: "Task Description",
    },
    {
      name: "status",
      type: "select",
      label: "Todo Status",
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
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
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
  ],
  timestamps: true,
};
