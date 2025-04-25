// collections/Chats.ts
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
    read: ({ req }) => !!req.user, // only logged-in users
    create: ({ req }) => !!req.user, // allow creation via API/UI
    update: ({ req }) => !!req.user,
    delete: () => false, // disable destructive deletes
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
      admin: {
        description: "Optional name for group chats",
      },
    },
    {
      name: "participants",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: true,
      admin: {
        description: "Users who can see & send messages in this chat",
      },
    },
    {
      name: "lastMessage",
      type: "relationship",
      relationTo: "messages",
      required: false,
      admin: {
        description: "Denormalized pointer to the most recent Message",
      },
    },
    {
      name: "unreadCounts",
      type: "json",
      required: false,
      admin: {
        description: "Map of userID → number of unread messages",
      },
    },
  ],
  timestamps: true, // automatically adds createdAt & updatedAt
 
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // e.g. reset unreadCounts for req.user when they open the chat
      },
    ],
  },
};

export  {Chats};
