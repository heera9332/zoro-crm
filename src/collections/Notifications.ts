import { getSocket } from "@/server/config/init-socket";
import type { CollectionConfig } from "payload";

export const Notification: CollectionConfig = {
  slug: "notifications",
  labels: {
    singular: "Notification",
    plural: "Notifications",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Category Title",
      required: true,
    },
    {
      name: "content",
      type: "code",
      label: "Description",
      required: true,
      admin: {
        language: "html",
        style: {
          minHeight: 450,
        },
      },
    },
    {
      name: "statusRead",
      type: "select",
      label: "Read Status",
      options: [
        { label: "Read", value: "read" },
        { label: "Unread", value: "unread" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "readBy",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      label: "Users who read this",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "recipients",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      label: "Recipients",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "relatedTo",
      type: "relationship",
      relationTo: [
        "events",
        "tasks",
        "projects",
        "chats",
        "comments",
        "messages",
        "notes",
        "users",
      ],
      label: "Related Entity",
      required: false,
      admin: {
        position: "sidebar",
      },
    },
  ],

  hooks: {
     afterChange: [
      async ({ doc, operation }) => {
        // Only emit for create or update (skip delete, etc)
        if (operation === "create" || operation === "update") {
          // const io = await getSocket();
          // console.log("io isntance");
          // console.log(io)

          // if (io) {
          //   // Emit to all clients:
          //   console.log("sending notifications to all")
          //   io.emit("notification:new", doc);

          //   // If you want per-user, emit to specific rooms:
          //   if (doc?.recipients && Array.isArray(doc.recipients)) {
          //     doc.recipients.forEach((recipient: any) => {
          //       const userId = typeof recipient === "string" ? recipient : recipient?.id;
          //       if (userId) {
          //         io.to(userId).emit("notification:new", doc);
          //       }
          //     });
          //   } else {
          //     io.emit("notification:new", doc);
          //   }
          // }
        }
      }
    ]
  }
};
