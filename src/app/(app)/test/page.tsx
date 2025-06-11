import React from "react";
import Loader from "../dashboard/_components/loader";

function page({ ...args }) {
  return (
    <div {...args}>
      <h2>Test Page</h2>

      <Loader />
    </div>
  );
}

export default page;
