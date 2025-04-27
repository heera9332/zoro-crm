import type { CollectionConfig } from "payload";
export const Notes: CollectionConfig = {
  slug: "notes",
  admin: {
    useAsTitle: "title",
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
      admin: {
        readOnly: true,
      },
      access: {
        read: () => true,
      },
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
    },
    {
      name: "content",
      type: "richText",
      label: "Note Content",
      required: true,
    },
    {
      name: "Category",
      type: "relationship",
      relationTo: "categories",
      label: "Category",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "Tag",
      type: "relationship",
      relationTo: "tags",
      label: "Tag",
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
      name: "collaborators",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      label: "Collaborators",
      admin: {
        position: "sidebar",
        description: "Users who can collaborate on this note",
      },
    },
    {
      name: "lastEditedBy",
      type: "relationship",
      relationTo: "users",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "lastEditedAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "docId",
      type: "text",
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ originalDoc }) => {
            // originalDoc.id always exists once the note is saved
            return originalDoc.id;
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "update" && req.user) {
          data.lastEditedBy = req.user.id;
          data.lastEditedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
