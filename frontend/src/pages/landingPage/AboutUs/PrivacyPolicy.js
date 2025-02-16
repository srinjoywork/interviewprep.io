import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-light text-xl">
      <div className="md:py-44 py-16 max-w-4xl mx-auto px-3 text-left">
        <h1 className="mx-auto md:text-7xl text-4xl font-bold text-gray-900 pb-4">
          Privacy Policy
        </h1>

        <p className="text-xl font-medium mb-10">
          Last updated: 16 February, 2025
        </p>
        <p>
          CodeHireX is responsible for the personal information that is
          processed on our platform. This privacy policy outlines how we
          handle user data, ensuring transparency and compliance with data
          protection laws. By using our platform, you agree to the terms
          outlined below.
        </p>

        <h2 className="text-3xl mb-4 mt-10">Data Collection and Usage</h2>
        <h3 className="text-2xl mb-2 mt-3">User-Provided Information</h3>
        <p>
          When you register on CodeHireX, apply for jobs, or use our tools
          (such as Code Collaboration, Resume Builder, Code Optimizer, Code
          Reviewer, and QGenAI), we collect information including your name,
          email, resume, job preferences, and coding activity.
        </p>
        
        <h3 className="text-2xl mb-2 mt-3">Automatic Data Collection</h3>
        <p>
          We collect technical data such as your IP address, device
          information, and browsing activity to improve our services.
        </p>

        <h2 className="text-3xl mb-4 mt-10">Data Sharing</h2>
        <p>
          Your data may be shared with prospective employers if you apply for
          jobs. We do not sell your personal information to third parties. We
          may share anonymized data with research partners for service
          improvements.
        </p>

        <h2 className="text-3xl mb-4 mt-10">Security and Retention</h2>
        <p>
          We implement strong security measures to protect user data.
          Personal data is retained only as long as necessary. Unused
          accounts and associated data will be deleted after two years of
          inactivity.
        </p>

        <h2 className="text-3xl mb-4 mt-10">User Rights</h2>
        <ul className="list-disc ml-5">
          <li>Access and modify your data</li>
          <li>Request data deletion</li>
          <li>Restrict data processing</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-3xl mb-4 mt-10">Contact Information</h2>
        <p>
          For privacy-related inquiries, please contact us at:
          <span className="font-bold"> support@codehirex.com</span>
        </p>
      </div>
    </div>
  );
}
