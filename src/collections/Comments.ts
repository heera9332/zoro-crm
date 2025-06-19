import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      label: "Comment",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        readOnly: true,
        position: "sidebar"
      },
    },
    {
      name: "commentedOn",
      type: "relationship",
      relationTo: ["projects", "tasks", "notes", "posts"],
      required: true,
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "comments",
      type: "relationship",
      relationTo: "comments",
      hasMany: true,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
