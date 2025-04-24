import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",

  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        const userId = req?.user?.id;
        let action = "";

        if (operation === "create") action = "Created Project";
        else if (operation === "update") action = "Updated Project";

        if (action) {
          await req.payload.create({
            collection: "timeline",
            data: {
              project: doc.id,
              action,
              performedBy: userId,
              details: `${action} titled "${doc.title}"`,
            },
          });
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        const userId = req?.user?.id;

        await req.payload.create({
          collection: "timeline",
          data: {
            project: doc.id,
            action: "Deleted Project",
            performedBy: userId,
            details: `Deleted project titled "${doc.title}"`,
          },
        });
      },
    ],
  },
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "dueDate",
      type: "date",
      label: "Due Date",
    },
    {
      name: "priority",
      type: "select",
      label: "Priority",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
      defaultValue: "medium",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Not started", value: "not-started" },
        { label: "Doing", value: "doing" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "not-started",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      label: "Assigned To",
      hasMany: true,
      admin: {
        allowCreate: false,
      },
    },
    {
      name: "notes",
      type: "relationship",
      relationTo: "notes",
      label: "Notes",
      hasMany: true,
      admin: {
        allowCreate: false,
        position: "sidebar",
        isSortable: true,
      },
    },
    {
      name: "attachments",
      type: "upload",
      relationTo: "media",
      label: "Attachments",
      hasMany: true,
      admin: {
        description: "Upload files related to the project.",
        position: "sidebar",
      },
    },
    {
      name: "timeline",
      type: "relationship",
      relationTo: "timeline",
      hasMany: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "View all logged timeline events",
      },
    },
  ],
};
