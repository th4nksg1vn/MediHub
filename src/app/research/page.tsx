export default function ResearchPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Research at Medihub</h1>
      <p className="mt-4 text-slate-600">
        We are committed to advancing the field of health informatics through cutting-edge research and collaboration.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Our Focus Areas</h2>
        <ul className="mt-4 list-disc list-inside text-slate-600">
          <li>Privacy-Preserving Machine Learning</li>
          <li>Federated Learning for Health Data</li>
          <li>AI-Powered Diagnostics</li>
          <li>Personalized Medicine</li>
        </ul>
      </div>
    </div>
  );
}