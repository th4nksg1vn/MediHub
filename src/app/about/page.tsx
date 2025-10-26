import { Users, Shield, Brain, LineChart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security and privacy of health data above all else."
    },
    {
      icon: Users,
      title: "Patient-Centric",
      description: "Everything we build puts patients and their needs at the center."
    },
    {
      icon: Brain,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in healthcare."
    },
    {
      icon: LineChart,
      title: "Impact-Driven",
      description: "Our success is measured by the positive impact we create in healthcare."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900">About Medihub</h1>
          <p className="mt-4 text-lg text-slate-600">
            Our mission is to democratize access to health data, empowering developers and researchers to build the future of healthcare.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Our Story</h2>
            <p className="mt-4 text-slate-600">
              Founded in 2023, Medihub was born out of the need for a unified, secure, and developer-friendly platform for health data. 
              We believe that by providing the right tools, we can accelerate innovation in healthcare and improve patient outcomes.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Our Values</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">{value.title}</h3>
                      <p className="mt-2 text-slate-600 dark:text-slate-400">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Join Our Mission</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              We're always looking for talented individuals who share our vision for the future of healthcare. 
              Whether you're a developer, researcher, or healthcare professional, there's a place for you at Medihub.
            </p>
            <div className="mt-6">
              <a href="/careers" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}