// src/app/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ScholarSumm</h3>
            <p className="text-gray-400 text-sm">
              Making academic research more accessible through AI-powered summaries
            </p>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                Contact: <a href="mailto:aiautosite@gmail.com" className="hover:text-white transition-colors">
                  aiautosite@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Product Section */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-white transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} ScholarSumm. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              Made with ❤️ for students and researchers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}