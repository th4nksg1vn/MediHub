"use client";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import { getNavForRole } from "@/config/navigation";
import { useRoleStore } from "@/store/useRoleStore";
import SidebarLink from "@/components/SidebarLink";

export default function AppSidebar() {
  const { isExpanded } = useSidebar();
  const pathname = usePathname() || "/";

  const { user } = useRoleStore();
  const role = user?.role;
  const links = getNavForRole(role);

  return (
    <aside className={`fixed left-0 top-0 h-screen w-[72px] lg:w-60 transition-all bg-[#003DB8] text-white`}> 
      <div className="p-3 h-full flex flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3 pl-3">
            <Image src="/assets/Frame.png" alt="MediHub Logo" width={36} height={36} />
          </div>

          <nav className="space-y-2 mt-6">
            {links.map((l) => (
              <SidebarLink key={l.id} href={l.href} label={l.label} />
            ))}
          </nav>
        </div>

        <div className="pt-4">
          <Link href="/logout" className="block rounded px-3 py-2 text-white hover:bg-white hover:text-[#003DB8]">Sign out</Link>
        </div>
      </div>
    </aside>
  );
}
