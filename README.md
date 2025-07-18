# 🚀 Zoro CRM

Zoro CRM is a modern, full-stack, open-source customer relationship management system built with a clean developer experience in mind. It leverages **Next.js**, **Payload CMS**, **MongoDB**, and **TailwindCSS**, making it fast, scalable, and highly customizable for teams managing projects, tasks, timelines, and customer data.

---

## 📌 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Help & Support](#help--support)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## 📖 Introduction

Zoro CRM is built for internal project management, task tracking, and customer-focused operations. It supports collaborative workspaces, note-taking, category/tag labeling, and admin-side customization with Payload CMS. It is developer-first, headless, and frontend-agnostic — perfect for both SaaS platforms and in-house use.

---

## ✨ Features

- 🧑‍💼 Role-based user management (admin, sales, support, customer, etc.)
- 🗂️ Projects & Tasks with due dates, status, and priorities
- 📝 Collaborative Notes with categories, tags, and rich content
- 🧠 Task time tracking (manual entry by admin)
- 📎 Media attachments, featured images, and file support
- 🕒 Timeline tracking of task/project events
- 💬 Inline comments on tasks, notes, and projects
- 🔖 Category and Tag system
- 📁 Workspaces and multi-user support
- ⚡ Fast SPA UI built with TailwindCSS and Zustand
- 📡 REST API-ready with Payload CMS

---

## 🧱 Tech Stack

- **Frontend**: Next.js 15, TailwindCSS, shadcn/ui, Zustand
- **Backend**: Payload CMS (headless), Node.js
- **Database**: MongoDB
- **API**: RESTful
- **Deployment**: Vercel / Render / VPS (nginx supported)
- **Auth**: PayloadCMS built-in user roles

---

## 🛠️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/zoro-crm.git
cd zoro-crm
```

### 2. Install Dependencies

```bash
npm install      # or bun install / yarn install
```

```.env
MONGODB_URI=mongodb://localhost:27017/zoro-crm
PAYLOAD_SECRET=your-secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Run the Application

**for development**

```bash
npm run dev
```

**or if using bun**

bun run dev 5. Access Admin Panel
Visit http://localhost:3000/admin

## 📁 Folder Structure

```bash
zoro-crm/
├── src/
│   ├── app/               # Next.js App Router structure
│   ├── components/        # UI components (shadcn-based)
│   ├── store/             # Zustand state management
│   ├── _components/       # Rich content, loaders, editors
│   └── lib/               # Utilities and helpers
├── payload.config.ts      # PayloadCMS config
├── tailwind.config.js     # TailwindCSS config
└── public/                # Static assets
```

## 🚀 Usage

- Create users and assign roles (admin, sales, etc.)
- Admins can create projects, assign users, and add tasks
- Use rich editors for notes and project descriptions
- Time tracking is available via manual admin input per task
- View project summary and task time in project sidebars
- Upload media and documents to each project or task

## 🆘 Help & Support

- If you encounter bugs, issues, or have questions:
- Open an issue on GitHub Issues
- Email: support@yourdomain.com (or use Discussions tab)
- Join our community Discord (coming soon)

## 🤝 Contributing

- We welcome contributions!
- Fork this repository
- Create your feature branch (git checkout -b feat/awesome-feature)
- Commit your changes (git commit -m 'feat: add feature')
- Push to the branch (git push origin feat/awesome-feature)
- Open a Pull Request

## 👨‍💻 Contributors

Thanks to all these amazing contributors:

- @heera9332 - Creator  

## 📄 License

This project is licensed under the MIT License. See LICENSE for more information.

## 🙏 Acknowledgements

- Payload CMS
- Next.js
- MongoDB
- Tailwind CSS
- shadcn/ui
- Zustand

Made with ❤️ by **Heera Singh**

Let me know if you want:

- A `.env.example` file generated
- Badges (build status, license, etc.)
- Dockerfile and Docker-based installation instructions
- GitHub Actions workflow for CI/CD setup




