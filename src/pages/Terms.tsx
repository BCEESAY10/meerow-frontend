import React from "react";
import { PageWrapper } from "../components/layout/PageWrapper";

export const Terms: React.FC = () => {
  return (
    <PageWrapper>
      <div className="py-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
          Terms and Conditions
        </h1>
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              2. Use License
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Meerow for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for public
                display
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
              </li>
              <li>
                Remove any copyright or other proprietary notation from the
                materials
              </li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on other servers
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              3. Disclaimer
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              The materials on Meerow are provided on an 'as is' basis. Meerow
              makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              4. Limitations
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              In no event shall Meerow or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on Meerow, even if Meerow or an
              authorized representative has been notified orally or in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              5. User-Generated Content
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed mb-4">
              By submitting stories, comments, or other content to Meerow, you
              grant us a non-exclusive, worldwide, royalty-free license to use,
              reproduce, modify, and distribute such content. You represent and
              warrant that the content is original to you, does not violate
              others' rights, and complies with all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              6. Prohibited Conduct
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>
                Post content that is illegal, inappropriate, or violates
                third-party rights
              </li>
              <li>Harass, threaten, or defame other users</li>
              <li>Spam or create duplicate accounts</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Engage in any form of abusive behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              7. Moderation and Content Removal
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              Meerow reserves the right to moderate, remove, or reject any
              content that violates these terms or is deemed inappropriate. We
              may also suspend or terminate accounts of users who violate these
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              Meerow may revise these terms of service for our website at any
              time without notice. By using this website, you are agreeing to be
              bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              9. Contact
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
              If you have any questions about these Terms and Conditions, please
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

export default Terms;
