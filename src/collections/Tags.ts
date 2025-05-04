import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  labels: {
    singular: "Tag",
    plural: "Tags",
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
      type: "richText",
      label: "Description",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
    },
    {
      name: "status",
      type: "select",
      label: "tag Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "draft",
    },
  ],
  timestamps: true,
};
