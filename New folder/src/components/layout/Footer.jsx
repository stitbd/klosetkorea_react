import React from "react";

const FOOTER_LINKS = {
  customerAccount: [
    { label: "My Account", href: "/account" },
    { label: "My Order List", href: "/account/orders" },
    { label: "My Whishlist/List", href: "/account/wishlist" },
    { label: "Track Order", href: "/track-order" },
    { label: "Our Dashboard", href: "/account/dashboard" },
  ],
  relatedPages: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Notice", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
    { label: "Exchange Policy", href: "/exchange-policy" },
    { label: "Returns & Refunds Policy", href: "/returns" },
  ],
};

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 mt-8">
    <div className="container py-10 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand + Contact */}
        <div>
          <div className="font-display font-bold text-2xl text-white mb-4">
            FI<span className="text-red-500">X</span>ON
          </div>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Premium fashion brand from Bangladesh. Quality clothing, leather goods & accessories.
          </p>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📍</span>
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:01725689641" className="hover:text-white transition">01725689641</a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:info@fimon.com.bd" className="hover:text-white transition">info@fimon.com.bd</a>
            </li>
          </ul>
          {/* Social icons */}
          <div className="flex gap-2 mt-4">
            {["f", "in", "yt"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center text-xs font-bold text-white transition"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* We Accept */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">We Accept</h3>
          <div className="flex flex-wrap gap-2">
            {["bKash", "Nagad", "Visa", "MasterCard", "COD"].map((method) => (
              <span
                key={method}
                className="text-[10px] bg-gray-700 text-gray-300 border border-gray-600 px-2 py-1 rounded font-medium"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-white font-semibold mb-3 text-sm">Newsletter</h4>
            <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-r transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Customer Account */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Customer Account</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.customerAccount.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-white transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Pages */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Related Pages</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.relatedPages.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-white transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-700">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} Fimon. All rights reserved.</span>
        <span>
          Powered by{" "}
          <a href="#" className="text-red-500 hover:text-red-400 transition font-medium">
            Storex
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
