import React from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Link } from "react-router-dom";

export const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <div className="py-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
          Contact Us
        </h1>
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-12">
          We'd love to hear from you. Reach out with any questions or concerns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] p-6">
              <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
                    📧 Email
                  </h3>
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
                    support@meerow.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
                    🐛 Report a Bug
                  </h3>
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-3">
                    Found something not working? Let us know so we can fix it.
                  </p>
                  <Link
                    to="/feedback"
                    className="inline-block px-4 py-2 bg-[#E8622A] dark:bg-[#F07A3D] text-white rounded-lg hover:bg-[#CC5220] dark:hover:bg-[#E06A2D] transition-colors">
                    Send Feedback
                  </Link>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
                    💡 Feature Request
                  </h3>
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-3">
                    Have an idea for a new feature? We'd love to hear it!
                  </p>
                  <Link
                    to="/feedback"
                    className="inline-block px-4 py-2 bg-[#E8622A] dark:bg-[#F07A3D] text-white rounded-lg hover:bg-[#CC5220] dark:hover:bg-[#E06A2D] transition-colors">
                    Send Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Help Resources */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] p-6">
              <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-6">
                Help Resources
              </h2>

              <div className="space-y-4">
                <Link
                  to="/faq"
                  className="block p-4 rounded-lg bg-gray-50 dark:bg-[#1E1E2E] hover:bg-gray-100 dark:hover:bg-[#3A3A52] transition-colors">
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-1">
                    FAQ
                  </h3>
                  <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                    Find answers to common questions
                  </p>
                </Link>

                <Link
                  to="/feedback"
                  className="block p-4 rounded-lg bg-gray-50 dark:bg-[#1E1E2E] hover:bg-gray-100 dark:hover:bg-[#3A3A52] transition-colors">
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-1">
                    Feedback
                  </h3>
                  <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                    Share your feedback and suggestions
                  </p>
                </Link>

                <Link
                  to="/privacy"
                  className="block p-4 rounded-lg bg-gray-50 dark:bg-[#1E1E2E] hover:bg-gray-100 dark:hover:bg-[#3A3A52] transition-colors">
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-1">
                    Privacy Policy
                  </h3>
                  <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                    Learn how we protect your data
                  </p>
                </Link>

                <Link
                  to="/terms"
                  className="block p-4 rounded-lg bg-gray-50 dark:bg-[#1E1E2E] hover:bg-gray-100 dark:hover:bg-[#3A3A52] transition-colors">
                  <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-1">
                    Terms & Conditions
                  </h3>
                  <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                    Review our terms of service
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social/Additional Info */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p className="text-blue-900 dark:text-blue-300">
            <strong>Response Times:</strong> We typically respond to all
            inquiries within 24-48 hours. During weekends and holidays,
            responses may take longer. For urgent matters, please clearly mark
            your message as urgent.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
