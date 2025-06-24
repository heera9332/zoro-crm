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
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
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
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "avatar",
      label: "Avatar",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        position: "sidebar",
        description: "Upload a profile picture (optional).",
      },
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
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active Account",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      admin: {
        description: "about yourself",
      },
    },

    {
      name: "billing",
      type: "group",
      label: "Billing Information",
      fields: [
        { name: "first_name", label: "First Name", type: "text" },
        { name: "last_name", label: "Last Name", type: "text" },
        { name: "company", label: "Company Name", type: "text" },
        { name: "address_1", label: "Address Line 1", type: "text" },
        { name: "address_2", label: "Address Line 2", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "state", label: "State/Province", type: "text" },
        { name: "postcode", label: "Postal Code", type: "text" },
        { name: "country", label: "Country", type: "text" },
        { name: "email", label: "Billing Email", type: "email" },
        { name: "phone", label: "Phone Number", type: "text" },
      ],
    },
    {
      name: "shipping",
      type: "group",
      label: "Shipping Information",
      fields: [
        { name: "first_name", label: "First Name", type: "text" },
        { name: "last_name", label: "Last Name", type: "text" },
        { name: "company", label: "Company Name", type: "text" },
        { name: "address_1", label: "Address Line 1", type: "text" },
        { name: "address_2", label: "Address Line 2", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "state", label: "State/Province", type: "text" },
        { name: "postcode", label: "Postal Code", type: "text" },
        { name: "country", label: "Country", type: "text" },
      ],
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
