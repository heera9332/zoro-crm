import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Post Title",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Post Content",
      required: true,
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
      label: "Post Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "draft",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Featured Image",
    },
  ],
};
