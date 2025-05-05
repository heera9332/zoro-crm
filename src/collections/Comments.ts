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
    useAsTitle: "title"
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
      },
    },
    {
      name: "commentedOn",
      type: "relationship",
      relationTo: ["projects", "tasks", "notes"],
      required: true,
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
    {
      name: "anchor",
      type: "group",
      fields: [
        {
          name: "startIndex",
          type: "number",
          required: true,
        },
        {
          name: "endIndex",
          type: "number",
          required: true,
        }
      ],
      label: "Text Anchor",
      admin: {
        description: "Position of text this comment is attached to",
      }
    },
    
  ],

  timestamps: true,
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === "create" && req.user) {
          data.author = req.user.id;
        }
        return data;
      },
    ],
  },
};
