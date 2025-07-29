import { isAdmin } from "@/utils/access";
import type { CollectionConfig } from "payload";
import { createClient } from "redis";

export const Notification: CollectionConfig = {
  slug: "notifications",
  access: {
    create: () => true,
    read: () => true,
    update: ({ req }) => isAdmin({ req }),
    delete: ({ req }) => isAdmin({ req })
  },
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
        if (operation === "create" || operation === "update") {
          try {
            console.log("notification create/update");
            const redis = createClient({ url: process.env.REDIS_URL });
            await redis.connect();

            // Broadcast to all or specific users
            if (doc?.recipients && Array.isArray(doc.recipients) && doc.recipients.length > 0) {
              for (const recipient of doc.recipients) {
                const userId = typeof recipient === "string" ? recipient : recipient?.id;
                if (userId) {
                  await redis.publish(
                    "notifications",
                    JSON.stringify({
                      userId,
                      notification: {
                        id: doc.id,
                        title: doc.title,
                        message: doc.content,
                        statusRead: doc.statusRead,
                        timestamp: Date.now(),
                      },
                    })
                  );
                }
              }
            } else {
              // global broadcast fallback
              await redis.publish(
                "notifications",
                JSON.stringify({
                  userId: "global",
                  notification: {
                    id: doc.id,
                    title: doc.title,
                    message: doc.content,
                    statusRead: doc.statusRead,
                    timestamp: Date.now(),
                  },
                })
              );
            }

            await redis.quit();
          } catch (err) {
            console.error("❌ Redis publish failed:", err);
          }
        }
      },
    ]
  }
};
