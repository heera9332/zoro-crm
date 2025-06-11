import { RichText } from "@payloadcms/richtext-lexical/react";
import React from "react";

function Content(props: any) {
  return (
    <div className="no-tailwind">
      <RichText data={props?.content || props?.description} />
    </div>
  );
}

export default Content;
