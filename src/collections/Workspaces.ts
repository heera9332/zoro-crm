// src/collections/Workspaces.js
import type { CollectionConfig } from "payload";

const Workspaces: CollectionConfig = {
  slug: "workspaces",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "users",
      type: "relationship",
      relationTo: "users",
      hasMany: true, // A workspace can have many users
    },
    {
      name: "createdAt",
      type: "date",
      defaultValue: new Date(),
    },
  ],
};

export { Workspaces };
