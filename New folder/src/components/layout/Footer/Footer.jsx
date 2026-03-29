import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { PAYMENT_METHODS } from "../../../utils/constants";
import iconFacebook from "../../../assets/icons/facebook.png";
import iconInstagram from "../../../assets/icons/instagram.png";
import iconLinkedin from "../../../assets/icons/linkedin.png";
import iconYoutube from "../../../assets/icons/youtube.png";
import iconTiktok from "../../../assets/icons/tiktok.png";
import logo from "../../../assets/images/logo.png";

const CUSTOMER_LINKS = [
  { label: "My Account", to: "/account" },
  { label: "My Orders", to: "/account/orders" },
  { label: "My Wishlist", to: "/account/wishlist" },
  { label: "Track Order", to: "/track-order" },
  { label: "Dashboard", to: "/account/dashboard" },
];

const PAGE_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Privacy Notice", to: "/privacy" },
  { label: "Contact Us", to: "/contact" },
  { label: "Exchange Policy", to: "/exchange-policy" },
  { label: "Returns & Refunds", to: "/returns" },
];

// Each entry maps to a file in src/assets/icons/
const SOCIAL_LINKS = [
  { icon: iconFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: iconInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: iconLinkedin, href: "https://linkedin.com", label: "Linkedin" },
  { icon: iconYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: iconTiktok, href: "https://tiktok.com", label: "TikTok" },
];

const CONTACT_INFO = [
  {
    icon: "📍",
    text: "Ka3/C, 3rd Floor, Joynob Ali Sarak, Jamuna Future Park Pocket Gate, Bashundhara Rd, Dhaka 1229",
  },
  { icon: "📞", text: "+88 01886 899103" },
  { icon: "✉️", text: "info@elonis.com.bd" },
];

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 mt-10">
    <Container>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 py-10 sm:py-12 lg:py-16">

        {/* ── Col 1: Brand ── */}
        <div>
          {/* Logo from assets/images/logo.png */}
          <Link to="/" className="inline-block mb-4" aria-label="Go to homepage">
            <img
              src={logo}
              alt="Brand logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Premium fashion brand from Bangladesh. Quality clothing, leather
            goods &amp; accessories for the modern lifestyle.
          </p> */}

          {/* Contact details */}
          <ul className="space-y-2 text-xs">
            {CONTACT_INFO.map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                <span className="leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>

          {/* Social icons from assets/icons/ */}
          <div className="flex gap-2 mt-5">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-red-600
                           flex items-center justify-center transition-colors duration-150 flex-shrink-0"
              >
                {/* brightness-0 invert renders any coloured PNG as white on the dark bg */}
                <img
                  src={icon}
                  alt={label}
                  className="w-4 h-4 object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Payment + Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">We Accept</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className="text-[10px] bg-gray-700 border border-gray-600 text-gray-300 px-2 py-1 rounded font-medium">
                {m}
              </span>
            ))}
          </div>
          <h3 className="text-white font-semibold mb-3 text-sm">Newsletter</h3>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email…"
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500"
            />
            <button type="submit" className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-r transition">
              Go
            </button>
          </form>
        </div>

        {/* Customer Account */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Customer Account</h3>
          <ul className="space-y-2">
            {CUSTOMER_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-xs text-gray-400 hover:text-white transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Pages */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Related Pages</h3>
          <ul className="space-y-2">
            {PAGE_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-xs text-gray-400 hover:text-white transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>

    <div className="border-t border-gray-700">
      <Container>
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Elonis Life Style. | All rights reserved.</span>
          <span>
            Powered by{" "}
            <a href="https://elonis.com.bd/" target="_blank" rel="noreferrer" className="text-red-400 hover:text-red-300 transition font-medium">
              STITBD
            </a>
          </span>
        </div>
      </Container>
    </div>
  </footer>
);

export default Footer;
