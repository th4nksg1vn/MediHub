import React from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, CalendarIcon } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

const features = [
	{
		Icon: FileTextIcon,
		name: "APIs & SDKs",
		description:
			"Unified REST and realtime APIs for patient records, consent, and events.",
		cta: "Explore APIs",
		href: "/docs",
		bgClass: "bg-gradient-to-r from-sky-100 to-white",
		colSpan: "col-span-1",
	},
	{
		Icon: BellIcon,
		name: "Auth & Access",
		description: "Role-based auth, consent workflows, SSO, and audit logs.",
		cta: "Learn more",
		href: "/features/auth",
		bgClass: "bg-gradient-to-r from-emerald-100 to-white",
		colSpan: "col-span-1",
	},
	{
		Icon: Share2Icon,
		name: "Integrations",
		description: "Connect EHRs, devices and third-party tools with secure adapters.",
		cta: "See integrations",
		href: "/integrations",
		bgClass: "bg-gradient-to-r from-purple-100 to-white",
		colSpan: "col-span-1",
	},
	{
		Icon: CalendarIcon,
		name: "Realtime",
		description: "Push updates for vitals, alerts and collaborative workflows.",
		cta: "Realtime docs",
		href: "/realtime",
		bgClass: "bg-gradient-to-r from-yellow-100 to-white",
		colSpan: "col-span-1",
	},
];

export default function BentoDemo() {
	return (
		<div className="mt-12">
			<BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((f) => (
					<BentoCard
						key={f.name}
						name={f.name}
						className={f.colSpan}
						background={<div className={`${f.bgClass} h-48 w-full`} />}
						Icon={f.Icon}
						description={f.description}
						href={f.href}
						cta={f.cta}
					/>
				))}
			</BentoGrid>
		</div>
	);
}
