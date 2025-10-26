"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth pages and dashboard/dev routes
  const hideOn = ["/login", "/register", "/onboarding", "/dashboard", "/dev"];
  if (pathname && hideOn.some((p) => pathname.startsWith(p))) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                MH
              </div>
              <div className="font-semibold text-slate-900">Medihub</div>
            </div>
            <p className="mt-4 text-sm">
              Building the future of healthcare technology with secure, reliable, and scalable APIs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="hover:text-slate-900">Documentation</Link></li>
              <li><Link href="/pricing" className="hover:text-slate-900">Pricing</Link></li>
              <li><Link href="/docs/api" className="hover:text-slate-900">API Reference</Link></li>
              <li><Link href="/status" className="hover:text-slate-900">Status</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/support" className="hover:text-white">Support</Link></li>
              <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link href="/security" className="hover:text-white">Security</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/legal" className="hover:text-white">Legal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © {currentYear} Medihub. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="text-sm hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
