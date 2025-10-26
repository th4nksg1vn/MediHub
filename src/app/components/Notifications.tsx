import React from "react";

export default function Notifications({
  items,
}: {
  items?: Array<{ id: string; message: string }>;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div
      className="notifications"
      style={{ position: "fixed", right: 12, bottom: 12, zIndex: 60 }}
    >
      {items.map((it) => (
        <div
          key={it.id}
          className="card"
          style={{ marginBottom: 8, padding: 8 }}
        >
          {it.message}
        </div>
      ))}
    </div>
  );
}
