import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function NorthBangaloreP1() {
  return (
    <p>
      Delivery coverage now lives at 
      <a href="delivery.html">delivery.html</a>
      .
    </p>
  );
}

export default function NorthBangalorePage() {
  return (
    <>
      <NorthBangaloreP1 />
    </>
  );
}
