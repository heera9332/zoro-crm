// collections/Messages.ts
import type { CollectionConfig } from "payload";

const Messages: CollectionConfig = {
  slug: "messages",
  labels: {
    singular: "Message",
    plural: "Messages",
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: () => false, // messages are immutable once sent
    delete: () => false,
  },
  fields: [
    {
      name: "chat",
      type: "relationship",
      relationTo: "chats",
      required: true,
      admin: {
        description: "Which Chat this message belongs to",
      },
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Text", value: "text" },
        { label: "Image", value: "image" },
        { label: "File", value: "file" },
      ],
      defaultValue: "text",
      admin: {
        description: "Determines if `text` vs `attachment` is shown",
      },
    },
    {
      name: "attachment",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        condition: (_, data) => data.type !== "text",
      },
    },
    {
      name: "seenBy",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Users who have viewed this message",
      },
    },
  ],
  timestamps: true,
  indexes: [],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // emit via Socket.IO and update Chats.lastMessage / unreadCounts
      },
    ],
  },
  admin: {
    useAsTitle: "text",
  },
};

export  {Messages};
