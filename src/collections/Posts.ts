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
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Post Content",
      required: true,
      admin: {
        style: {
          minHeight: "400px",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
      admin: {
        position: "sidebar",
      },
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
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Featured Image",
      admin: {
        position: "sidebar",
      },
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  }
};
