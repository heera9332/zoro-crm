import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
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
      relationTo: ["projects", "tasks", "notes"], // list your collection slugs here
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
