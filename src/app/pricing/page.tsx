export default function PricingPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-center">Pricing</h1>
      <p className="mt-4 text-slate-600 text-center">
        Choose the plan that's right for you.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-slate-600">For individuals and small projects</p>
          <div className="mt-4 text-3xl font-bold">$0<span className="text-lg font-medium">/mo</span></div>
          <ul className="mt-6 space-y-2">
            <li>1,000 API Calls/mo</li>
            <li>1 Project</li>
            <li>Community Support</li>
          </ul>
          <button className="mt-6 w-full hh-btn hh-btn-secondary">Get Started</button>
        </div>

        {/* Pro Plan */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border-sky-500 border-2">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2 text-slate-600">For growing businesses</p>
          <div className="mt-4 text-3xl font-bold">$99<span className="text-lg font-medium">/mo</span></div>
          <ul className="mt-6 space-y-2">
            <li>100,000 API Calls/mo</li>
            <li>5 Projects</li>
            <li>Email Support</li>
          </ul>
          <button className="mt-6 w-full hh-btn hh-btn-primary">Choose Pro</button>
        </div>

        {/* Enterprise Plan */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold">Enterprise</h2>
          <p className="mt-2 text-slate-600">For large-scale applications</p>
          <div className="mt-4 text-3xl font-bold">Contact Us</div>
          <ul className="mt-6 space-y-2">
            <li>Unlimited API Calls</li>
            <li>Unlimited Projects</li>
            <li>Dedicated Support</li>
          </ul>
          <button className="mt-6 w-full hh-btn hh-btn-secondary">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}