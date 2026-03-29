import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import useCart from "../../../features/cart/hooks/useCart";
import useDebounce from "../../../hooks/useDebounce";
import { NAV_LINKS } from "../../../utils/constants";
import logo from "../../../assets/images/logo.png";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

// ─── Header ──────────────────────────────────────────────────────────────────
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 350);
  const { count, toggleCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim().length > 1) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, navigate]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }, [searchQuery, navigate]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}>
      {/* Topbar */}
      <div className="hidden md:block bg-white text-gray-800 text-xs py-2 text-center border-b border-gray-100">
        <span className="font-medium">ঈদ স্পেশাল: প্রতিটি পঞ্জাবির সাথে একটি ১০০% লেদারের ওয়ালেট ফ্রি</span>
        <span className="mx-2">|</span>
        <span>HOTLINE: +88 01886 899103</span>
      </div>

      {/* Main Header */}
      <Container>
        <div className="flex items-center gap-4 py-4">
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Go to homepage">
            <img src={logo} alt="FIMON" className="h-12 w-auto object-contain" />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="flex w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 px-4 text-sm border border-red-600 border-r-0 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                aria-label="Search"
              />
              <button
                type="submit"
                className="h-12 px-5 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition border border-red-600 border-l-0 rounded-r-lg"
                aria-label="Submit search"
              >
                <SearchIcon />
              </button>
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            {/* Phone */}
            <Link
              to="tel:+8801886899103"
              className="hidden lg:flex items-center gap-2 text-gray-800 hover:text-red-600 transition"
            >
              <PhoneIcon />
              <span className="font-bold text-base">+88 01886 899103</span>
            </Link>

            {/* Login/Sign Up */}
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 text-gray-700 hover:text-red-600 transition"
            >
              <UserIcon />
              <span className="font-medium text-sm">Login / Sign Up</span>
              <ChevronDownIcon />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative text-gray-700 hover:text-red-600 transition flex items-center"
              aria-label={`Cart ${count} items`}
            >
              <CartIcon />
              <span className="relative ml-1">
                <span className="absolute inset-0 bg-black text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px]">
                  {count > 99 ? "99+" : count}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <div className="flex w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 px-4 text-sm border border-red-600 border-r-0 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <button
                type="submit"
                className="h-11 px-5 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition border border-red-600 border-l-0 rounded-r-lg"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </Container>

      {/* Navigation Menu */}
      <nav className="hidden md:block border-t border-gray-200" aria-label="Main navigation">
        <Container>
          <ul className="flex items-center">
            <li className="border-r border-gray-200">
              <Link to="/" className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:text-red-600 transition">
                <HomeIcon />
              </Link>
            </li>
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className={`border-r border-gray-200 ${index === NAV_LINKS.length - 1 ? 'border-r-0' : ''}`}>
                <Link
                  to={link.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 whitespace-nowrap transition"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDownIcon />}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={closeMobile} aria-hidden />
          <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-display font-extrabold text-xl">FI<span className="text-red-600">M</span>ON</span>
              <button onClick={closeMobile} className="p-1.5 rounded hover:bg-gray-100" aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={closeMobile}
                      className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDownIcon />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t space-y-3">
              <Link to="/login" onClick={closeMobile} className="flex items-center gap-2 text-gray-700 hover:text-red-600 py-2">
                <UserIcon />
                <span>Login / Sign Up</span>
              </Link>
              <Link to="tel:01325889643" onClick={closeMobile} className="flex items-center gap-2 text-gray-700 hover:text-red-600 py-2">
                <PhoneIcon />
                <span>01325889643</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;