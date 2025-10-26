import Link from "next/link";

export default function DevelopersPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Developer Hub</h1>
      <p className="mt-4 text-slate-600">
        Everything you need to build with Medihub. Explore our APIs, SDKs, and documentation.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* API Playground */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">API Playground</h2>
          <p className="mt-2 text-slate-600">
            Interact with our APIs in a live sandbox environment.
          </p>
          <Link href="/developers/playground" className="mt-4 inline-block hh-btn hh-btn-secondary">
            Launch Playground
          </Link>
        </div>

        {/* Documentation */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Documentation</h2>
          <p className="mt-2 text-slate-600">
            Comprehensive guides and tutorials to get you started.
          </p>
          <Link href="/docs" className="mt-4 inline-block hh-btn hh-btn-secondary">
            View Docs
          </Link>
        </div>

        {/* SDKs */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">SDKs & Libraries</h2>
          <p className="mt-2 text-slate-600">
            Official libraries for your favorite languages and frameworks.
          </p>
          <Link href="/docs/sdks" className="mt-4 inline-block hh-btn hh-btn-secondary">
            Explore SDKs
          </Link>
        </div>
      </div>
    </div>
  );
}