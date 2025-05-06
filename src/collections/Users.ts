import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "User",
    plural: "Users",
  },
  admin: {
    useAsTitle: "firstName",
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
    },
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      label: "Roles",
      required: true,
      defaultValue: ["developer"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
        { label: "Sales", value: "sales" },
        { label: "Developer", value: "developer" },
        { label: "Support", value: "support" },
        { label: "Customer", value: "customer" },
      ],
      access: {
        create: ({ req }) => req.user?.roles.includes("admin") ?? false,
        read: ({ req }) => req.user?.roles.includes("admin") ?? false,
        update: ({ req }) => req.user?.roles.includes("admin") ?? false,
      },
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
    },
    {
      name: "workspaces",
      type: "relationship",
      relationTo: "workspaces",
      hasMany: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
    },
    {
      name: "position",
      type: "text",
      label: "Position / Job Title",
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active Account",
      defaultValue: true,
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      admin: {
        description: "about yourself",
      },
    },
  ],

  access: {
    // ✅ Only admin can create users
    create: ({ req }) => req.user?.roles.includes("admin") ?? false,

    // ✅ Only admin can read users
    read: ({ req }) => req.user?.roles.includes("admin") ?? false,

    // ✅ Only admin can update users
    update: ({ req }) => req.user?.roles.includes("admin") ?? false,

    // ✅ Only admin can delete users
    delete: ({ req }) => req.user?.roles.includes("admin") ?? false,
  },
};
