import { isAdmin, isAuthor } from "@/utils/access";
import type { CollectionConfig } from "payload";
export const Notes: CollectionConfig = {
  slug: "notes",
  folders: true,
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: "Note",
    plural: "Notes",
  },
  access: {
    // Restrict access to the note to only the author or collaborators
    read: () => true,
    create: ({ req }) => true,
    update: ({ req }) => true,
    delete: ({ req, data }) => isAdmin({ req }) || isAuthor({ req, data }),
  },
  
  fields: [
    {
      name: "title",
      type: "text",
      label: "Note Title",
      required: true,
    },
    {
      label: "Featured Image",
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
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
      access: {
        create: ({ req, data }) => {
          return (
            req?.user?.roles.some(
              (role) => role == "admin" || role == "manager"
            ) ?? false
          );
        },
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
  versions: {
    maxPerDoc: 50,
    drafts: true,
  },
  
};
