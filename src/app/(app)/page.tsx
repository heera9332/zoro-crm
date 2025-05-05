import Link from "next/link";
import React from "react";

function AppPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl underline font-bold">Landing Page</h1>

      <div className="flex gap-2">
        <Link
          href="/dashboard"
          className="border border-blue-600 text-blue-600 px-3 py-2"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/admin"
          className="border border-green-600 text-green-600 px-3 py-2"
        >
          Go to Admin
        </Link>
      </div>
    </div>
  );
}

export default AppPage;
