import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function ComingSoonBox1() {
  return (
    <div className="box">
      <img src="images/logo-nav.svg" alt="FreshPhool" width="280" height="72" />
      <h1>Coming soon</h1>
      <p>Fresh Flowers, Every Morning.</p>
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <>
      <ComingSoonBox1 />
    </>
  );
}
