import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import express from "express";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Workspaces } from "./collections/Workspaces";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Tasks } from "./collections/Tasks";
import { Categories } from "./collections/Categories";
import { Notes } from "./collections/Notes";
import { Posts } from "./collections/Posts";
import { Projects } from "./collections/Projects";
import { Tags } from "./collections/Tags";
import { Timeline } from "./collections/Timeline";
import { Comments } from "./collections/Comments";
import { Chats } from "./collections/Chats";
import { Messages } from "./collections/Messages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: 'info@payloadcms.com',
    defaultFromName: 'Payload',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Categories,
    Tags,
    Posts,
    Notes,
    Projects,
    Tasks,
    Timeline,
    Comments,
    Chats,
    Messages,
    Workspaces,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  plugins: [formBuilderPlugin({})],
});
