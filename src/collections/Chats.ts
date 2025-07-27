import { CollectionConfig } from "payload";

const Chats: CollectionConfig = {
  slug: "chats",
  labels: {
    singular: "Chat",
    plural: "Chats",
  },
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: () => false,
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        { label: "Private (1-on-1)", value: "private" },
        { label: "Group", value: "group" },
        { label: "Support", value: "support" },
      ],
      defaultValue: "private",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "title",
      type: "text",
      required: false,
      admin: {
        description: "Optional title, used for group/support chats",
        condition: (data) => data?.type === "group" || data?.type === "support",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description: "Group chat avatar",
        condition: (data) => data?.type === "group",
      },
    },
    {
      name: "participants",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: true,
      admin: {
        description: "Users in the chat",
      },
    },
    {
      name: "admins",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
      admin: {
        description: "Admins (only in group chats)",
        condition: (data) => data?.type === "group",
      },
    },
    {
      name: "lastMessage",
      type: "relationship",
      relationTo: "messages",
      required: false,
      admin: {
        description: "Latest message sent in this chat (cached)",
      },
    },
    {
      name: "unreadCounts",
      type: "json",
      required: false,
      admin: {
        description: "Map of { userId: number of unread messages }",
      },
    },
    {
      name: "mutedBy",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
      admin: {
        description: "Users who muted this chat",
      },
    },
    {
      name: "archivedBy",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
      admin: {
        description: "Users who archived this chat",
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // Example: reset unreadCounts for opening user
        if (req.user && doc.unreadCounts) {
          doc.unreadCounts[req.user.id] = 0;
          await req.payload.update({
            collection: 'chats',
            id: doc.id,
            data: {
              unreadCounts: doc.unreadCounts,
            },
            overrideAccess: true,
          });
        }
      },
    ],
  },
};

export { Chats };
