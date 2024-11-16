import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 px-6 mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {/* About Section */}
          <div className="mb-6 lg:mb-0 ml-6 sm:ml-0">
            <h3 className="text-3xl font-black mb-4">retomizer</h3>
            <p className="text-gray-500 text-base sm:text-sm font-medium">
              An open source state manager that offers minimalistic design, async state support, and a lightweight API perfect for modern React applications.
            </p>
          </div>

          {/* Documentation Section */}
          <div className="mb-6 lg:mb-0 ml-6 sm:ml-8">
            <h3 className="text-xl mb-4">Documentation</h3>
            <ul>
              <li className="my-2">
                <a href="/getting-started" className="text-gray-500 hover:text-blue-400">Core Concepts</a>
              </li>
              <li className="my-2">
                <a href="/installation" className="text-gray-500 hover:text-blue-400">Installation</a>
              </li>
              <li className="my-2">
                <a href="/api-reference" className="text-gray-500 hover:text-blue-400">API Reference</a>
              </li>
              <li className="my-2">
                <a href="/examples" className="text-gray-500 hover:text-blue-400">Examples</a>
              </li>
              <li className="my-2">
                <a href="/best-practices" className="text-gray-500 hover:text-blue-400">Best Practices</a>
              </li>
            </ul>
          </div>

          {/* GitHub Section */}
          <div className="mb-6 lg:mb-0 ml-6 sm:ml-0">
            <h3 className="text-xl mb-4">GitHub</h3>
            <a href="https://github.com/samiranghosh04/retomizer" className="text-blue-400 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
              Visit the repository
            </a>
          </div>

          {/* Contact Section */}
          <div className="ml-6 sm:ml-0">
            <h3 className="text-xl mb-4">Contact</h3>
            <p className="text-gray-400">
              Have questions? Reach out to us via <a href="mailto:contact@yourdomain.com" className="text-blue-400 hover:text-blue-600">email</a>.
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">&copy; 2024 Samiran Ghosh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
