"use client";

import React from "react";

import { CodeBlock } from "@/components/ui/code-block";
import TagButton from "./nice_tag";

export function CodeBlockDemo({
  code,
  file_name,
  unchangedcode,
}: {
  code: string;
  file_name: string;
  unchangedcode: string;
}) {
  console.log("file_name:", file_name);

  return (
    <>
      <div className="max-w-3xl mx-auto w-full">
        <CodeBlock
          language={file_name.split(".").pop() || "jsx"}
          filename={file_name}
          highlightLines={[9, 13, 14, 18]}
          code={unchangedcode}
        />
      </div>

      <TagButton />

      <div className="max-w-3xl mx-auto w-full">
        <CodeBlock
          language={file_name.split(".").pop() || "jsx"}
          filename={file_name}
          highlightLines={[9, 13, 14, 18]}
          code={code}
        />
      </div>
    </>
  );
}
