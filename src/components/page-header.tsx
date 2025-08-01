import React from "react";

function PageHeader({ title }: { title: string }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold underline">{title}</h1>
      </div>
    </header>
  );
}

export default PageHeader;
