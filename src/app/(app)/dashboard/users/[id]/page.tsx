import React from "react";

function Page({ params }) {
  const { id } = params;
  return (
    <div className="app-page px-2">
      <h1>Account - {id}</h1>
    </div>
  );
}

export default Page;
