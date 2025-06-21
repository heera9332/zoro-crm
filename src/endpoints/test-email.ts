// src/endpoints/sendTestEmail.ts
import nodemailer from "nodemailer";
import { Endpoint } from "payload";

export const sendTestEmail: Endpoint = {
  path: "/send-test-email",
  method: "post",
  handler: async (req, res) => {
    const { to, subject, body, type } = req.body;

    const variables = {
      name: "Test User",
      email: to,
      username: "testuser",
      verificationLink: "https://your-app.com/verify?token=sampletoken",
      projectTitle: "Sample Project",
      projectDescription: "This is a sample project for preview.",
      projectDueDate: "2025-12-31",
    };

    const renderedSubject = subject.replace(
      /{{(.*?)}}/g,
      (_, v) => variables[v.trim()] ?? ""
    );
    const renderedBody = body.replace(
      /{{(.*?)}}/g,
      (_, v) => variables[v.trim()] ?? ""
    );

    try {
      // If using Payload's email adapter, use: req.payload.sendEmail({ ... })
      // Otherwise, use your own Nodemailer transport as below:
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: renderedSubject,
        html: renderedBody,
      });
      return res.status(200).json({ sent: true });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
