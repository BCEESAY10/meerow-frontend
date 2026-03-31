import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#2A2A3E] border-t border-gray-200 dark:border-[#3A3A52] mt-12 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-[#E8622A] dark:text-[#F07A3D] mb-2">
              <span>📖</span>
              Meerow
            </div>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm">
              A platform for storytellers and story lovers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              Platform
            </h3>
            <ul className="space-y-2 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>
                <a
                  href="/"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/explore"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="/write"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Write
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>
                <a
                  href="/faq"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="hover:text-[#E8622A] dark:hover:text-[#F07A3D]">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-[#3A3A52] pt-8">
          <p className="text-center text-[#6B6B7D] dark:text-[#B8B8C8] text-sm">
            © 2026 Meerow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
