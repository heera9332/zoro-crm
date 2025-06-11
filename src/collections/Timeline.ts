import { CollectionConfig } from "payload";

export const Timeline: CollectionConfig = {
  slug: "timeline",
  fields: [
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      required: true,
    },
    {
      name: "task",
      type: "relationship",
      relationTo: "tasks",
      required: true,
    },
    {
      name: "action",
      type: "text",
      label: "Action",
      required: true,
    },
    {
      name: "performedBy",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "timestamp",
      type: "date",
      defaultValue: () => new Date(),
    },
    {
      name: "details",
      type: "textarea",
    },
  ],
  timestamps: true,
};
