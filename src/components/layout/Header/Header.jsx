import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Offcanvas, Form, InputGroup, Button } from 'react-bootstrap';
import useCartStore from '../../../app/store';
import useDebounce from '../../../hooks/useDebounce';
import { PHONE } from '../../../utils';
import './Header.scss';
import logo from '../../../assets/images/logo.png';

// ─── Icons ────────────────────────────────────────────────────────
const HomeIcon     = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const ChevronDown  = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>);

// ─── Nav Data ─────────────────────────────────────────────────────
export const NAV_LINKS = [
  {
    label: 'MAN', href: '/man',
    children: [
      { label: 'Eid 26',         href: '/product-list/68' },
      { label: 'Ethnic Wear',    href: '/product-list/18', children: [
        { label: 'Panjabi', href: '/products/20' },
        { label: 'Kabli',   href: '/products/21' },
        { label: 'Vest',    href: '/products/22' },
      ]},
      { label: 'T-Shirt',        href: '/product-list/19' },
      { label: 'Shirt',          href: '/product-list/4', children: [
        { label: 'Formal',      href: '/products/1'  },
        { label: 'Casual',      href: '/products/2'  },
        { label: 'Half Sleeve', href: '/products/72' },
        { label: 'Full Sleeve', href: '/products/76' },
        { label: 'Printed',     href: '/products/73' },
        { label: 'Solid',       href: '/products/74' },
        { label: 'Club',        href: '/products/75' },
      ]},
      { label: 'Polo',           href: '/product-list/3' },
      { label: 'Bottom',         href: '/product-list/5', children: [
        { label: 'Jeans',   href: '/products/7'  },
        { label: 'Chinos',  href: '/products/4'  },
        { label: 'Formal',  href: '/products/3'  },
        { label: 'Joggers', href: '/products/5'  },
        { label: 'Cargo',   href: '/products/71' },
        { label: 'Shorts',  href: '/products/6'  },
        { label: 'Pajama',  href: '/products/44' },
      ]},
      { label: 'Suits & Blazer', href: '/product-list/72' },
      { label: 'Winterwear',     href: '/product-list/70', children: [
        { label: 'Winter Shirt', href: '/products/85' },
        { label: 'Jacket',       href: '/products/61' },
        { label: 'Sweater',      href: '/products/62' },
        { label: 'Sweatshirt',   href: '/products/63' },
        { label: 'Hoodie',       href: '/products/64' },
      ]},
      { label: 'Underwear',      href: '/product-list/57' },
      { label: 'Footwear',       href: '/product-list/6', children: [
        { label: 'Sneakers', href: '/products/32' },
        { label: 'Sandal',   href: '/products/30' },
        { label: 'Boot',     href: '/products/33' },
      ]},
      { label: 'Accessories',    href: '/product-list/42', children: [
        { label: 'Mask',  href: '/products/27' },
        { label: 'Socks', href: '/products/28' },
        { label: 'Tie',   href: '/products/41' },
        { label: 'Belt',  href: '/products/52' },
      ]},
    ],
  },
  {
    label: 'WOMAN', href: '/woman',
    children: [
      { label: 'Eid 26',          href: '/product-list/69' },
      { label: 'Western Wear',    href: '/product-list/8', children: [
        { label: 'Tops',          href: '/products/77' },
        { label: 'T-Shirt',       href: '/products/78' },
        { label: 'Summer Blazer', href: '/products/84' },
        { label: 'Casual Shirt',  href: '/products/9'  },
        { label: 'Long Shirt',    href: '/products/10' },
      ]},
      { label: 'Traditional Wear',href: '/product-list/9', children: [
        { label: 'Kameez', href: '/products/79' },
        { label: 'Kurti',  href: '/products/80' },
        { label: 'Kaftan', href: '/products/81' },
      ]},
      { label: 'Dress',           href: '/product-list/34' },
      { label: 'Co-ord Sets',     href: '/product-list/71' },
      { label: 'Winterwear',      href: '/product-list/39', children: [
        { label: 'Hoodie',   href: '/products/86' },
        { label: 'Jacket',   href: '/products/34' },
        { label: 'Overcoat', href: '/products/36' },
        { label: 'Poncho',   href: '/products/53' },
        { label: 'Sweater',  href: '/products/55' },
      ]},
      { label: 'Shrug',           href: '/product-list/13' },
      { label: 'Bottoms',         href: '/product-list/11', children: [
        { label: 'Jeans',          href: '/products/11' },
        { label: 'Skirts/Palazzo', href: '/products/14' },
        { label: 'Pants',          href: '/products/15' },
        { label: 'Joggers',        href: '/products/29' },
      ]},
    ],
  },
  {
    label: 'LIFESTYLE', href: '/lifestyle',
    children: [
      { label: 'Wallet/Money Clip',        href: '/product-list/22' },
      { label: 'Perfume',                  href: '/product-list/23', children: [
        { label: 'Man', href: '/products/65' },
      ]},
      { label: 'Privilege Card/Gold Card', href: '/product-list/27' },
      { label: 'Bag',                      href: '/product-list/29', children: [
        { label: 'Man',   href: '/products/67' },
        { label: 'Woman', href: '/products/68' },
      ]},
      { label: 'Sunglass',                 href: '/product-list/59', children: [
        { label: 'Man',   href: '/products/69' },
        { label: 'Woman', href: '/products/70' },
      ]},
    ],
  },
  { label: 'GIFT VOUCHER', href: '/gift-voucher' },
];

// ─── Desktop Mega Menu ────────────────────────────────────────────
// Full-width click-based nav: click top item → sub-bar appears
// click sub-item with children → child-bar appears below
const DesktopNav = () => {
  const [activeTop, setActiveTop]   = useState(null); // label of active top item
  const [activeSub, setActiveSub]   = useState(null); // label of active sub item
  const navRef                      = useRef(null);
  const location                    = useLocation();

  // Close everything on route change
  useEffect(() => {
    setActiveTop(null);
    setActiveSub(null);
  }, [location]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveTop(null);
        setActiveSub(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeTopItem = NAV_LINKS.find((n) => n.label === activeTop);
  const activeSubItem = activeTopItem?.children?.find((c) => c.label === activeSub);

  const handleTopClick = (item) => {
    if (!item.children?.length) {
      setActiveTop(null);
      setActiveSub(null);
      return;
    }
    if (activeTop === item.label) {
      setActiveTop(null);
      setActiveSub(null);
    } else {
      setActiveTop(item.label);
      setActiveSub(null);
    }
  };

  const handleSubClick = (item) => {
    if (!item.children?.length) {
      setActiveSub(null);
      return;
    }
    setActiveSub(activeSub === item.label ? null : item.label);
  };

  return (
    <div ref={navRef} className="desktop-nav">

      {/* ── Row 1: Top-level items ── */}
      <div className="desktop-nav__top-bar">
        <Container fluid="xl">
          <div className="d-flex align-items-center">

            <Link to="/" className="desktop-nav__home" onClick={() => { setActiveTop(null); setActiveSub(null); }}>
              <HomeIcon />
            </Link>

            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                className={`desktop-nav__top-item ${activeTop === item.label ? 'desktop-nav__top-item--active' : ''}`}
                onClick={() => handleTopClick(item)}
              >
                {item.label}
                {item.children?.length > 0 && (
                  <span className={`desktop-nav__chevron ${activeTop === item.label ? 'desktop-nav__chevron--open' : ''}`}>
                    <ChevronDown />
                  </span>
                )}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Row 2: Sub-level items (shown when top item clicked) ── */}
      {activeTopItem?.children?.length > 0 && (
        <div className="desktop-nav__sub-bar">
          <Container fluid="xl">
            <div className="d-flex align-items-center flex-wrap">
              {activeTopItem.children.map((sub) => (
                <button
                  key={sub.href}
                  className={`desktop-nav__sub-item ${activeSub === sub.label ? 'desktop-nav__sub-item--active' : ''} ${sub.children?.length ? 'desktop-nav__sub-item--has-child' : ''}`}
                  onClick={() => handleSubClick(sub)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* ── Row 3: Child-level items (shown when sub item clicked) ── */}
      {activeSubItem?.children?.length > 0 && (
        <div className="desktop-nav__child-bar">
          <Container fluid="xl">
            <div className="d-flex align-items-center flex-wrap">
              {activeSubItem.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="desktop-nav__child-item"
                  onClick={() => { setActiveTop(null); setActiveSub(null); }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

// ─── Mobile accordion item ────────────────────────────────────────
const MobileNavItem = ({ item, depth = 0, onClose }) => {
  const [open, setOpen] = useState(false);
  const hasChildren     = item.children?.length > 0;

  return (
    <div className={`mobile-nav__item mobile-nav__item--d${depth}`}>
      <div className="mobile-nav__row">
        <Link
          to={item.href}
          className="mobile-nav__link"
          onClick={() => { if (!hasChildren) onClose(); }}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            className={`mobile-nav__toggle ${open ? 'mobile-nav__toggle--open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="expand"
          >
            <ChevronDown />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div className="mobile-nav__children">
          {item.children.map((child) => (
            <MobileNavItem key={child.href} item={child} depth={depth + 1} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Login Dropdown ───────────────────────────────────────────────
const LoginDropdown = ({ onClose }) => {
  const [loginData,  setLoginData]  = useState({ mobile: '', password: '' });
  const [trackOrder, setTrackOrder] = useState('');
  const [showPass,   setShowPass]   = useState(false);

  const handleLogin = (e) => { e.preventDefault(); console.log('Login:', loginData); };
  const handleTrack = (e) => { e.preventDefault(); console.log('Track:', trackOrder); };

  return (
    <div className="login-dropdown">
      <h3 className="login-dropdown__title">Login to My Account</h3>

      <form onSubmit={handleLogin}>
        <div className="login-dropdown__field">
          <label className="login-dropdown__label">Mobile Number</label>
          <input type="text" placeholder="Number or User name" className="login-dropdown__input"
            value={loginData.mobile} onChange={(e) => setLoginData({ ...loginData, mobile: e.target.value })} />
        </div>

        <div className="login-dropdown__field">
          <label className="login-dropdown__label">Password</label>
          <div className="login-dropdown__input-wrap">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Write your password"
              className="login-dropdown__input"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type="button" className="login-dropdown__eye" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
              {showPass ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="login-dropdown__btn">Login</button>
        <div className="login-dropdown__forgot">
          <Link to="/forgot-password" onClick={onClose}>Forgot Password?</Link>
        </div>
      </form>

      <div className="login-dropdown__meta">
        <span>New customer?</span>
        <Link to="/register" onClick={onClose}>Create your account</Link>
      </div>
      <div className="login-dropdown__meta">
        <span>Lost password?</span>
        <Link to="/forgot-password" onClick={onClose}>Reset account</Link>
      </div>

      <form onSubmit={handleTrack} className="login-dropdown__track">
        <label className="login-dropdown__label">Track Your Order</label>
        <input type="text" placeholder="Order ID or phone number" className="login-dropdown__input"
          value={trackOrder} onChange={(e) => setTrackOrder(e.target.value)} />
        <button type="submit" className="login-dropdown__btn">Check</button>
      </form>
    </div>
  );
};

// ─── Main Header ──────────────────────────────────────────────────
const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [showLoginDrop, setShowLoginDrop] = useState(false);
  const loginRef   = useRef(null);
  const navigate   = useNavigate();
  const totalItems = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  useDebounce(searchQuery, 400);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) setShowLoginDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>

      {/* ── Top info bar ── */}
      <div className="site-header__topbar d-none d-lg-block">
        <Container>
          <div className="d-flex justify-content-between align-items-center py-1">
            <p className="site-header__topbar-text mb-0">
              ঈদ স্পেশাল: প্রতিটি পঞ্জাবির সাথে একটি ১০০% লেদারের ওয়ালেট ফ্রি | HOTLINE: +88 01886 899103
            </p>
          </div>
        </Container>
      </div>

      {/* ── Main row ── */}
      <div className="site-header__main">
        <Container>
          <div className="d-flex align-items-center justify-content-between gap-3 py-2">

            <button className="site-header__hamburger d-lg-none" onClick={() => setShowOffcanvas(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>

            <Link to="/" className="site-header__logo">
              <img src={logo} alt="Elonis" className="site-header__logo-img" />
            </Link>

            <Form onSubmit={handleSearch} className="site-header__search d-none d-lg-flex flex-grow-1">
              <InputGroup>
                <Form.Control placeholder="Search products..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="site-header__search-input" />
                <Button type="submit" className="site-header__search-btn" aria-label="Search">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </Button>
              </InputGroup>
            </Form>

            <Link to="tel:+8801886899103" className="site-header__phone-link d-none d-lg-flex align-items-center gap-1">
              📞 <span className="fw-bold">{PHONE}</span>
            </Link>

            <div className="d-flex align-items-center gap-3">

              <div className="site-header__login-wrap d-none d-lg-block" ref={loginRef}>
                <button className="site-header__login-btn" onClick={() => setShowLoginDrop((v) => !v)} aria-label="Account">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="site-header__login-label">Login | Sign Up</span>
                  <svg className={`site-header__login-chevron ${showLoginDrop ? 'site-header__login-chevron--open' : ''}`}
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {showLoginDrop && <LoginDropdown onClose={() => setShowLoginDrop(false)} />}
              </div>

              <Link to="/cart" className="site-header__action site-header__cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {totalItems > 0 && <span className="site-header__cart-badge">{totalItems}</span>}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Desktop mega nav (click-based, full-width bars) ── */}
      <div className="d-none d-lg-block">
        <DesktopNav />
      </div>

      {/* ── Mobile Offcanvas ── */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} className="site-header__offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="Elonis" style={{ height: '36px' }} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSearch} className="mb-3">
            <InputGroup>
              <Form.Control placeholder="Search products..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              <Button type="submit" variant="danger">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </Button>
            </InputGroup>
          </Form>

          <div className="mobile-nav">
            {NAV_LINKS.map((link) => (
              <MobileNavItem key={link.href} item={link} onClose={() => setShowOffcanvas(false)} />
            ))}
          </div>

          <div className="mt-4 pt-3 border-top">
            <Link to="/login"    className="site-header__offcanvas-link d-block mb-2" onClick={() => setShowOffcanvas(false)}>Login</Link>
            <Link to="/register" className="site-header__offcanvas-link d-block mb-2" onClick={() => setShowOffcanvas(false)}>Sign Up</Link>
            <Link to="/account"  className="site-header__offcanvas-link d-block mb-2" onClick={() => setShowOffcanvas(false)}>My Account</Link>
            <Link to="/wishlist" className="site-header__offcanvas-link d-block mb-2" onClick={() => setShowOffcanvas(false)}>Wishlist</Link>
            <p className="fw-bold mt-3 mb-0" style={{ fontSize: '0.85rem' }}>📞 {PHONE}</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;