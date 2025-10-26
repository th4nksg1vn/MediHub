import React, { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="container form-page">Loading…</div>}>
      {/* Client component handles search params and actions */}
      <VerifyClient />
    </Suspense>
  );
}
