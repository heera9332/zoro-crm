import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Category Title",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      label: "Category Description",
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Category Status",
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
