import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function LookAP1() {
  return (
    <p>
      Look A is now the live storefront. 
      <a href="index.html">Continue to FreshPhool</a>
      .
    </p>
  );
}

export default function LookAPage() {
  return (
    <>
      <LookAP1 />
    </>
  );
}
