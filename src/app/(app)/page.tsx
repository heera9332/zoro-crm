import React from "react";
import "../globals.css";

function AppPage() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Zoro-CRM – All-in-One CRM for Growth</title>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Zoro-CRM</h1>
          <nav className="space-x-6 text-sm font-medium hidden md:block">
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#testimonials" className="hover:text-blue-600">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
            <a
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </a>
          </nav>
          <nav className="space-x-6 text-sm font-medium block md:hidden">
            <a
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </a>
          </nav>
        </div>
      </header>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Simplify Your Sales Process with Zoro-CRM
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Manage leads, track progress, and grow your business — all with one
            powerful CRM built on Payload CMS.
          </p>
          <a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
          >
            Schedule a Demo
          </a>
        </div>
      </section>

      <>
        {/* Task Management */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">Smart Task Management</h3>
              <p className="text-gray-600 mt-3">
                Stay organized with streamlined task assignment, reminders, and
                status tracking.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">
                  Assign &amp; Delegate
                </h4>
                <p className="text-gray-600">
                  Easily assign tasks to team members and track accountability
                  in real-time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">
                  Due Dates &amp; Alerts
                </h4>
                <p className="text-gray-600">
                  Never miss a deadline — get notified when tasks are due or
                  overdue.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">Status Tracking</h4>
                <p className="text-gray-600">
                  Track task progress across multiple stages: Pending, In
                  Progress, Completed.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Project Management */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">
                Collaborative Project Management
              </h3>
              <p className="text-gray-600 mt-3">
                Plan, organize, and execute projects with complete transparency.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">
                  Milestone Planning
                </h4>
                <p className="text-gray-600">
                  Break down projects into clear milestones with deadlines and
                  dependencies.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">Team Roles</h4>
                <p className="text-gray-600">
                  Assign project-specific roles and permissions to team members.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">
                  Performance Insights
                </h4>
                <p className="text-gray-600">
                  Track overall progress, bottlenecks, and task completion rates
                  with dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Notes */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">
                Notes &amp; Knowledge Management
              </h3>
              <p className="text-gray-600 mt-3">
                Capture ideas, meeting minutes, and task logs in a centralized
                knowledge base.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">Rich Text Editor</h4>
                <p className="text-gray-600">
                  Create and format notes easily with Markdown support and
                  auto-saving drafts.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">
                  Linked to Tasks &amp; Projects
                </h4>
                <p className="text-gray-600">
                  Attach notes to specific tasks or projects for contextual
                  collaboration.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-2">
                  Private or Shared Notes
                </h4>
                <p className="text-gray-600">
                  Control visibility with public, team-shared, or private note
                  options.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold">Powerful Features</h3>
            <p className="text-gray-600 mt-3">
              Built for growing teams that need more control and insight.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <h4 className="text-xl font-semibold mb-2">Lead Management</h4>
              <p className="text-gray-600">
                Track, nurture, and convert leads effectively with full
                visibility.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <h4 className="text-xl font-semibold mb-2">Custom Pipelines</h4>
              <p className="text-gray-600">
                Create multiple sales pipelines tailored to your workflow.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <h4 className="text-xl font-semibold mb-2">Task Automation</h4>
              <p className="text-gray-600">
                Assign tasks and auto-follow-ups with smart rules.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <h4 className="text-xl font-semibold mb-2">Team Collaboration</h4>
              <p className="text-gray-600">
                Give your sales team tools to work together efficiently.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <h4 className="text-xl font-semibold mb-2">
                Analytics &amp; Reports
              </h4>
              <p className="text-gray-600">
                See what’s working with real-time dashboards and KPIs.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <h4 className="text-xl font-semibold mb-2">Payload API Ready</h4>
              <p className="text-gray-600">
                Integrate with any frontend easily using Payload CMS REST APIs.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="bg-blue-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">What Our Clients Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <p className="text-gray-700 italic">
                "Zoro-CRM helped us double our deal closures in just 3 months.
                It's intuitive, fast, and just works."
              </p>
              <p className="mt-4 font-semibold text-blue-600">
                – Priya Sharma, Sales Head at FinCore
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <p className="text-gray-700 italic">
                "We integrated Zoro with our custom frontend in a weekend. The
                Payload API support is perfect for devs."
              </p>
              <p className="mt-4 font-semibold text-blue-600">
                – Karan Mehta, CTO at Bluestone Labs
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-8">
            Contact Us
          </h3>
          <form className="grid gap-6" method="POST" action="/api/contact">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-3 border rounded h-32"
              required
              defaultValue={""}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025 Zoro-CRM. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0 text-sm">
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AppPage;
