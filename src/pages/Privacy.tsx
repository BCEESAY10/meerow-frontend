import React from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";

export const Privacy: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <div className="py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-[#E8622A] dark:text-[#F07A3D] hover:text-[#CC5220] dark:hover:text-[#E06A2D] font-medium flex items-center gap-2 transition-colors">
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
            Privacy Policy
          </h1>
        </div>
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              1. Introduction
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              Meerow ("we", "us", "our", or "Company") operates the Meerow
              website and platform. This page informs you of our policies
              regarding the collection, use, and disclosure of personal data
              when you use our Service and the choices you have associated with
              that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              2. Information Collection and Use
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed mb-4">
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
            <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Types of Data Collected:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>Email address</li>
              <li>First and last name</li>
              <li>Cookies and Usage Data</li>
              <li>Story and comment content you create</li>
              <li>Profile information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              3. Use of Data
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed mb-4">
              Meerow uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information for improvement
              </li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              4. Security of Data
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              The security of your data is important to us but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your personal data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              5. Changes to This Privacy Policy
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date at the top of this Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              6. Contact Us
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through the{" "}
              <a
                href="/feedback"
                className="text-[#E8622A] dark:text-[#F07A3D] hover:underline">
                feedback page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Privacy;
