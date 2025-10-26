"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname() || "/";
  const active = pathname === href || pathname.startsWith(href + "/");

  const base = "block rounded px-3 py-2 transition-colors duration-150 overflow-hidden whitespace-nowrap";
  const cls = active
    ? `${base} bg-white text-[#003DB8]`
    : `${base} text-white hover:bg-white hover:text-[#003DB8]`;

  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
