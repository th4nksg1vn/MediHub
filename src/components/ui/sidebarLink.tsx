"use client";
import Link from "next/link";

export default function SidebarLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link href={href} className={`block px-3 py-2 rounded-md text-sm hover:bg-slate-100 ${className}`}>
      {label}
    </Link>
  );
}
