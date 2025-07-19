import Link from "next/link";
import React from "react";
import {
  ListChecks,
  ListTodo,
  KanbanSquare,
  StickyNote,
  User2,
  Bell,
} from "lucide-react";
import Spacer from "./_components/spacer";
import { DashboardAnalytics } from "./_components/dashbaord-analytics";

const actions = [
  {
    title: "Task Management",
    desc: "Never miss a follow-up with automated reminders and task assignments.",
    link: "/dashboard/tasks",
    icon: <ListChecks className="lucide h-6 w-6 text-orange-500" />,
  },
  {
    title: "Projects",
    desc: "Organize your projects, track milestones, and manage deadlines efficiently.",
    link: "/dashboard/projects",
    icon: <KanbanSquare className="lucide h-6 w-6 text-blue-500" />,
  },
  {
    title: "Todos",
    desc: "Create and manage your daily to-dos, keeping your workflow productive.",
    link: "/dashboard/todos",
    icon: <ListTodo className="lucide h-6 w-6 text-teal-500" />,
  },
  {
    title: "Notes",
    desc: "Quickly jot down ideas, meeting minutes, and important information.",
    link: "/dashboard/notes",
    icon: <StickyNote className="lucide h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Users",
    desc: "View user information",
    link: "/dashboard/users",
    icon: <User2 className="lucide h-6 w-6 text-green-500" />,
  },{
    title: "Notifications",
    desc: "View notifications",
    link: "/dashboard/notifications",
    icon: <Bell className="lucide h-6 w-6 text-red-500" />,
  },
];

function Page() {
  return (
    <div className="app-page px-2">
      <h1 className="mb-4">App Dashboard</h1>

      <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <div
            key={action.title}
            className="bg-white rounded-md shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
          >
            <div className="bg-orange-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              {action.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <Link href={action.link}>{action.title}</Link>
            </h3>
            <p className="text-gray-600">{action.desc}</p>
          </div>
        ))}
      </div>

      <Spacer height="64"/>

      <DashboardAnalytics/>
    </div>
  );
}

export default Page;
