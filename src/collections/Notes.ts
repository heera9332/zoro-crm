import type { CollectionConfig } from "payload";

export const Notes: CollectionConfig = {
  slug: "notes",
  admin: {
    useAsTitle: "title"
  },
  access: {
    read: () => false,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  labels: {
    singular: "Note",
    plural: "Notes",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Note Title",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Note Content",
      required: true,
    },
    {
      access: {
        read: () => true, 
      },
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
    },
    {
      name: "Category",
      type: "relationship",
      relationTo: "categories",
      label: "Category",
      hasMany: true,
    },
    {
      name: "Tag",
      type: "relationship",
      relationTo: "tags",
      label: "Tag",
    },
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      label: "Project",
    }
  ],
  timestamps: true,
};
