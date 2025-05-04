import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },  
  
  admin: {
    useAsTitle: 'firstName',
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
      ],
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
      required: true,
    },
    {
      name: 'workspaces',
      type: 'relationship',
      relationTo: 'workspaces', // Referring to the workspaces collection
      hasMany: true,  // This allows the user to belong to multiple workspaces
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
};
