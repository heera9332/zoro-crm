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
    update: ({ req }) => !!req.user, // Optional: allow edit if user === sender
    delete: () => false,
  },
  admin: {
    useAsTitle: "text",
  },
  fields: [
    {
      name: "chat",
      type: "relationship",
      relationTo: "chats",
      required: true,
      admin: {
        description: "Which chat this message belongs to",
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
      required: false,
      admin: {
        condition: (_, data) => data.type === "text",
      },
    },
    {
      name: "type",
      type: "select",
      defaultValue: "text",
      required: true,
      options: [
        { label: "Text", value: "text" },
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
        { label: "File", value: "file" },
        { label: "Sticker", value: "sticker" },
        { label: "System", value: "system" }, // e.g. "user joined"
      ],
    },
    {
      name: "attachment",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, data) => data.type !== "text" && data.type !== "system",
      },
    },
    {
      name: "replyTo",
      type: "relationship",
      relationTo: "messages",
      admin: {
        description: "If this message is a reply to another message",
      },
    },
    {
      name: "forwardedFrom",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "If this message was forwarded from another user",
      },
    },
    {
      name: "seenBy",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Users who have read this message",
      },
    },
    {
      name: "deletedFor",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Users for whom this message is deleted (soft delete)",
      },
    },
    {
      name: "editedAt",
      type: "date",
      admin: {
        description: "If message was edited, store timestamp",
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
    ],
  },
};

export { Messages };
