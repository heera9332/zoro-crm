import SendTestEmailComponent from "@/components/SendTestEmail";
import { GlobalConfig } from "payload";

const EmailTemplates: GlobalConfig = {
  slug: "email-templates",
  fields: [
    {
      name: "userSignup",
      label: "User Signup Email",
      type: "group",
      fields: [
        {
          name: "subject",
          type: "text",
          required: true,
        },
        {
          name: "body",
          type: "textarea",
          required: true,
          admin: {
            description: `
Available variables:
- \`{{name}}\`: User's full name
- \`{{email}}\`: User's email address
- \`{{username}}\`: User's username
- \`{{verificationLink}}\`: Email verification link

You can use these variables anywhere in the subject or body.
Example: "Welcome, {{name}}! Please verify your email: {{verificationLink}}"
            `.trim(),
          },
        },
      ],
    },
    {
      name: "projectCreated",
      label: "Project Created Email",
      type: "group",
      fields: [
        {
          name: "subject",
          type: "text",
          required: true,
        },
        {
          name: "body",
          type: "textarea",
          required: true,
          admin: {
            description: `
Available variables:
- \`{{name}}\`: Recipient's name
- \`{{email}}\`: Recipient's email
- \`{{projectTitle}}\`: Project title
- \`{{projectDescription}}\`: Project description
- \`{{projectDueDate}}\`: Project due date

You can use these variables anywhere in the subject or body.
Example: "Project '{{projectTitle}}' has been created and is due on {{projectDueDate}}."
            `.trim(),
          },
        },
      ],
    },
  ],
};

export default EmailTemplates;
