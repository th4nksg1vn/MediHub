'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-sky-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Our Location</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    123 Health Tech Ave<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-sky-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Email Us</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    <a href="mailto:support@medihub.com" className="hover:text-sky-600">
                      support@medihub.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-sky-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Call Us</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">+233 12 345 6789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}