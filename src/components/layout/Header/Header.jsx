import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Offcanvas, Form, InputGroup, Button } from 'react-bootstrap';
import useCartStore from '../../../app/store';
import useDebounce from '../../../hooks/useDebounce';
import { PHONE } from '../../../utils';
import './Header.scss';
import logo from '../../../assets/images/logo.png';

// ─── Icons ───────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const CategoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const LoginIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── Nav Data ─────────────────────────────────────────────────────
export const NAV_LINKS = [
  {
    label: 'SNEAKERS', href: '/categories/sneakers',
    children: [
      { label: 'Nike', href: '/categories/nike' },
      { label: 'Adidas', href: '/categories/adidas' },
      { label: 'Puma', href: '/categories/puma' },
      { label: 'Air Jordan', href: '/categories/air-jordan' },
      { label: 'Converse', href: '/categories/converse' },
      { label: 'Vans', href: '/categories/vans' },
      { label: 'New Balance', href: '/categories/new-balance' },
    ],
  },
  { label: 'SANDAL', href: '/categories/sandal' },
  {
    label: 'APPAREL', href: '/categories/apparel',
    children: [
      { label: 'Eid 26', href: '/categories/eid-woman' },
      { label: 'Western Wear', href: '/categories/western-wear', children: [] },
      {
        label: 'Traditional Wear', href: '/categories/traditional-wear', children: [
          { label: 'Kameez', href: '/categories/kameez' },
          { label: 'Kurti', href: '/categories/kurti' },
          { label: 'Kaftan', href: '/categories/kaftan' },
        ],
      },
      { label: 'Dress', href: '/categories/dress' },
      { label: 'Co-ord Sets', href: '/categories/co-ord-sets' },
      {
        label: 'Winterwear', href: '/categories/winterwear-woman', children: [
          { label: 'Hoodie', href: '/categories/hoodie-woman' },
          { label: 'Jacket', href: '/categories/jacket-woman' },
          { label: 'Overcoat', href: '/categories/overcoat' },
          { label: 'Poncho', href: '/categories/poncho' },
          { label: 'Sweater', href: '/categories/sweater-woman' },
        ],
      },
      { label: 'Shrug', href: '/categories/shrug' },
      {
        label: 'Bottoms', href: '/categories/bottoms-woman', children: [
          { label: 'Jeans', href: '/categories/jeans-woman' },
          { label: 'Skirts/Palazzo', href: '/categories/skirts' },
          { label: 'Pants', href: '/categories/pants' },
          { label: 'Joggers', href: '/categories/joggers-woman' },
        ],
      },
    ],
  },
  {
    label: 'ACCESSORIES', href: '/categories/accessories',
    children: [
      { label: 'Wallet/Money Clip', href: '/categories/wallet' },
      { label: 'Perfume', href: '/categories/perfume', children: [{ label: 'Man', href: '/categories/perfume-man' }] },
      { label: 'Privilege Card/Gold Card', href: '/categories/privilege-card' },
      {
        label: 'Bag', href: '/categories/bag', children: [
          { label: 'Man', href: '/categories/bag-man' },
          { label: 'Woman', href: '/categories/bag-woman' },
        ],
      },
      {
        label: 'Sunglass', href: '/categories/sunglass', children: [
          { label: 'Man', href: '/categories/sunglass-man' },
          { label: 'Woman', href: '/categories/sunglass-woman' },
        ],
      },
    ],
  },
  { label: 'GIFT VOUCHER', href: '/categories/gift-voucher' },
];

// ─── Desktop Hover Nav ────────────────────────────────────────────
const DesktopNav = () => {
  const [activeTop, setActiveTop] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [subBarTop, setSubBarTop] = useState(0);
  const [childBarTop, setChildBarTop] = useState(0);
  const navRef = useRef(null);
  const topBarRef = useRef(null);
  const subBarRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => { setActiveTop(null); setActiveSub(null); }, [location]);

  const scheduleClose = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => { setActiveTop(null); setActiveSub(null); }, 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  }, []);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const measureSubBarTop = useCallback(() => {
    if (topBarRef.current) setSubBarTop(topBarRef.current.getBoundingClientRect().bottom);
  }, []);

  useEffect(() => {
    measureSubBarTop();
    window.addEventListener('scroll', measureSubBarTop, { passive: true });
    window.addEventListener('resize', measureSubBarTop);
    return () => {
      window.removeEventListener('scroll', measureSubBarTop);
      window.removeEventListener('resize', measureSubBarTop);
    };
  }, [measureSubBarTop]);

  const activeTopItem = NAV_LINKS.find((n) => n.label === activeTop);
  const activeSubItem = activeTopItem?.children?.find((c) => c.label === activeSub);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (subBarRef.current) setChildBarTop(subBarRef.current.getBoundingClientRect().bottom);
    });
    return () => cancelAnimationFrame(id);
  }, [activeSub, activeTop, subBarTop]);

  const handleTopEnter = (item) => {
    cancelClose(); measureSubBarTop();
    setActiveTop(item.children?.length ? item.label : null);
    setActiveSub(null);
  };

  const handleSubEnter = (sub) => {
    cancelClose();
    setActiveSub(sub.children?.length ? sub.label : null);
  };

  const closeAll = () => { setActiveTop(null); setActiveSub(null); };

  return (
    <div ref={navRef} className="desktop-nav" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
      <div className="desktop-nav__top-bar" ref={topBarRef}>
        <Container fluid="xl">
          <div className="d-flex align-items-center">
            <Link to="/" className="desktop-nav__home" onClick={closeAll}><HomeIcon /></Link>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} to={item.href}
                className={`desktop-nav__top-item ${activeTop === item.label ? 'desktop-nav__top-item--active' : ''}`}
                onMouseEnter={() => handleTopEnter(item)} onClick={closeAll}>
                {item.label}
                {item.children?.length > 0 && (
                  <span className={`desktop-nav__chevron ${activeTop === item.label ? 'desktop-nav__chevron--open' : ''}`}>
                    <ChevronDown />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {activeTopItem?.children?.length > 0 && (
        <div ref={subBarRef} className="desktop-nav__sub-bar" style={{ top: subBarTop }} onMouseEnter={cancelClose}>
          <Container fluid="xl">
            <div className="d-flex align-items-center flex-wrap">
              {activeTopItem.children.map((sub) => (
                <Link key={sub.href} to={sub.href}
                  className={`desktop-nav__sub-item ${activeSub === sub.label ? 'desktop-nav__sub-item--active' : ''} ${sub.children?.length ? 'desktop-nav__sub-item--has-child' : ''}`}
                  onMouseEnter={() => handleSubEnter(sub)}
                  onClick={sub.children?.length ? (e) => e.preventDefault() : closeAll}>
                  {sub.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {activeSubItem?.children?.length > 0 && (
        <div className="desktop-nav__child-bar" style={{ top: childBarTop }} onMouseEnter={cancelClose}>
          <Container fluid="xl">
            <div className="d-flex align-items-center flex-wrap">
              {activeSubItem.children.map((child) => (
                <Link key={child.href} to={child.href} className="desktop-nav__child-item" onClick={closeAll}>
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

// ─── Login Form ───────────────────────────────────────────────────
// position='desktop' → absolute dropdown (downward)
// position='mobile'  → inside slide-up panel (full width)
const LoginForm = ({ onClose, position = 'desktop' }) => {
  const [loginData, setLoginData] = useState({ mobile: '', password: '' });
  const [trackOrder, setTrackOrder] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => { e.preventDefault(); console.log('Login:', loginData); };
  const handleTrack = (e) => { e.preventDefault(); console.log('Track:', trackOrder); };

  return (
    <div className={`login-dropdown login-dropdown--${position}`}>
      {position === 'mobile' && (
        <button className="login-dropdown__mobile-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      )}

      <h3 className="login-dropdown__title">Login to My Account</h3>

      <form onSubmit={handleLogin}>
        <div className="login-dropdown__field">
          <label className="login-dropdown__label">Email/Mobile Number</label>
          <input type="text" placeholder="Write your Email or Number" className="login-dropdown__input"
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
            <button type="button" className="login-dropdown__eye" onClick={() => setShowPass(!showPass)}>
              {showPass
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
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

      {/* <form onSubmit={handleTrack} className="login-dropdown__track">
        <label className="login-dropdown__label">Track Your Order</label>
        <input type="text" placeholder="Order ID or phone number" className="login-dropdown__input"
          value={trackOrder} onChange={(e) => setTrackOrder(e.target.value)} />
        <button type="submit" className="login-dropdown__btn">Check</button>
      </form> */}
    </div>
  );
};

// ─── Mobile Bottom Nav ────────────────────────────────────────────
// showMobileLogin & its handlers come from parent — completely separate from desktop login state
const MobileBottomNav = ({ showMobileLogin, onMobileLoginToggle, onMobileLoginClose }) => {
  const totalItems  = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const location    = useLocation();
  const navigate    = useNavigate();
  const loginBtnRef = useRef(null);
  const panelRef    = useRef(null);

  // Close panel ONLY when clicking truly outside:
  // outside the panel AND outside the login button
  useEffect(() => {
    if (!showMobileLogin) return;

    const handler = (e) => {
      const clickedBtn   = loginBtnRef.current?.contains(e.target);
      const clickedPanel = panelRef.current?.contains(e.target);
      if (!clickedBtn && !clickedPanel) {
        onMobileLoginClose();
      }
    };

    // Use capture so it fires before React's synthetic events
    document.addEventListener('pointerdown', handler, true);
    return () => document.removeEventListener('pointerdown', handler, true);
  }, [showMobileLogin, onMobileLoginClose]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.search;
    return (location.pathname + location.search) === href;
  };

  const links = [
    {
      icon: <HomeIcon />, label: 'Home', href: '/',
      onClick: () => { navigate('/'); onMobileLoginClose(); },
    },
    {
      icon: <CategoryIcon />, label: 'Category', href: '/?section=featured',
      onClick: (e) => { e.preventDefault(); navigate('/?section=featured'); onMobileLoginClose(); },
    },
    { icon: <CartIcon />, label: 'Cart', href: '/cart', badge: totalItems },
  ];

  return (
    <>
      {/* Dark backdrop — clicking it closes the panel */}
      {showMobileLogin && (
        <div className="mobile-login-backdrop" onClick={onMobileLoginClose} />
      )}

      {/* Slide-up login panel */}
      {showMobileLogin && (
        <div className="mobile-login-panel" ref={panelRef}>
          <LoginForm onClose={onMobileLoginClose} position="mobile" />
        </div>
      )}

      <nav className="mobile-bottom-nav">
        {links.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={item.onClick}
            className={`mobile-bottom-nav__item ${isActive(item.href) ? 'mobile-bottom-nav__item--active' : ''}`}
          >
            <div className="mobile-bottom-nav__icon-wrap">
              {item.icon}
              {item.badge > 0 && <span className="mobile-bottom-nav__badge">{item.badge}</span>}
            </div>
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </Link>
        ))}

        {/* Login — <button>, not <Link>, so no navigation */}
        <button
          ref={loginBtnRef}
          className={`mobile-bottom-nav__item mobile-bottom-nav__btn ${showMobileLogin ? 'mobile-bottom-nav__item--active' : ''}`}
          onClick={onMobileLoginToggle}
          aria-label="Login"
        >
          <div className="mobile-bottom-nav__icon-wrap">
            <LoginIcon />
          </div>
          <span className="mobile-bottom-nav__label">Login</span>
        </button>
      </nav>
    </>
  );
};

// ─── Mobile Accordion Item ────────────────────────────────────────
const MobileNavItem = ({ item, depth = 0, onClose }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <div className={`mobile-nav__item mobile-nav__item--d${depth}`}>
      <div className="mobile-nav__row">
        <Link to={item.href} className="mobile-nav__link" onClick={() => { if (!hasChildren) onClose(); }}>
          {item.label}
        </Link>
        {hasChildren && (
          <button className={`mobile-nav__toggle ${open ? 'mobile-nav__toggle--open' : ''}`}
            onClick={() => setOpen((v) => !v)} aria-label="expand">
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

// ─── Mobile Search Overlay ────────────────────────────────────────
const MobileSearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/search?q=${encodeURIComponent(query.trim())}`); onClose(); }
  };

  return (
    <div className="mobile-search-overlay">
      <form onSubmit={handleSubmit} className="mobile-search-overlay__form">
        <input ref={inputRef} type="text" placeholder="Search products..." value={query}
          onChange={(e) => setQuery(e.target.value)} className="mobile-search-overlay__input" />
        <button type="submit" className="mobile-search-overlay__submit" aria-label="Search"><SearchIcon /></button>
        <button type="button" className="mobile-search-overlay__close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
      </form>
    </div>
  );
};

// ─── Main Header ──────────────────────────────────────────────────
const Header = () => {
  const [showOffcanvas, setShowOffcanvas]       = useState(false);
  const [scrolled, setScrolled]                 = useState(false);
  const [searchQuery, setSearchQuery]           = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // ── Separate login states for desktop and mobile ──
  const [showDesktopLogin, setShowDesktopLogin] = useState(false);
  const [showMobileLogin, setShowMobileLogin]   = useState(false);

  const desktopLoginRef = useRef(null); // wraps the desktop login button + dropdown
  const navigate        = useNavigate();
  const totalItems      = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  useDebounce(searchQuery, 400);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close DESKTOP dropdown when clicking anywhere outside its wrapper div
  useEffect(() => {
    if (!showDesktopLogin) return;
    const handler = (e) => {
      if (desktopLoginRef.current && !desktopLoginRef.current.contains(e.target)) {
        setShowDesktopLogin(false);
      }
    };
    document.addEventListener('pointerdown', handler, true);
    return () => document.removeEventListener('pointerdown', handler, true);
  }, [showDesktopLogin]);

  // Lock body scroll when mobile search overlay is open
  useEffect(() => {
    document.body.style.overflow = showMobileSearch ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMobileSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Desktop login: toggle on button click
  const handleDesktopLoginToggle = () => setShowDesktopLogin((v) => !v);
  const handleDesktopLoginClose  = () => setShowDesktopLogin(false);

  // Mobile login: toggle on button click (1st click = open, 2nd = close)
  const handleMobileLoginToggle = () => setShowMobileLogin((v) => !v);
  const handleMobileLoginClose  = () => setShowMobileLogin(false);

  return (
    <>
      {/* Mobile Search Overlay */}
      {showMobileSearch && <MobileSearchOverlay onClose={() => setShowMobileSearch(false)} />}

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>

        {/* ══ MOBILE TOP BAR ══ */}
        <div className="site-header__mobile-top d-lg-none">
          <Container>
            <div className="site-header__mobile-row">
              <button className="site-header__hamburger" onClick={() => setShowOffcanvas(true)} aria-label="Open menu">
                <span /><span /><span />
              </button>
              <Link to="/" className="site-header__logo site-header__logo--mobile">
                <img src={logo} alt="Elonis" className="site-header__logo-img" />
              </Link>
              <button className="site-header__search-toggle" onClick={() => setShowMobileSearch(true)} aria-label="Search">
                <SearchIcon />
              </button>
            </div>
          </Container>
        </div>

        {/* ══ DESKTOP HEADER ══ */}
        <div className="site-header__desktop d-none d-lg-block">
          <div className="site-header__main">
            <Container>
              <div className="d-flex align-items-center justify-content-between gap-3 py-2">

                <Link to="/" className="site-header__logo">
                  <img src={logo} alt="Elonis" className="site-header__logo-img" />
                </Link>

                <Form onSubmit={handleSearch} className="site-header__search flex-grow-1">
                  <InputGroup>
                    <Form.Control placeholder="Search products..." value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} className="site-header__search-input" />
                    <Button type="submit" className="site-header__search-btn" aria-label="Search"><SearchIcon /></Button>
                  </InputGroup>
                </Form>

                <div className="d-flex align-items-center gap-2">
                  <Link to="tel:+8801886899103" className="site-header__phone-link d-flex align-items-center gap-1">
                    📞<span className="fw-bold">{PHONE}</span>
                  </Link>

                  {/*
                    Desktop login wrapper — ref covers both the button AND the dropdown.
                    Clicking anywhere outside this div closes the dropdown.
                    Clicking inside keeps it open.
                  */}
                  <div className="site-header__login-wrap" ref={desktopLoginRef}>
                    <button
                      className="site-header__login-btn"
                      onClick={handleDesktopLoginToggle}
                      aria-label="Account"
                    >
                      <LoginIcon />
                      <span className="site-header__login-label">Login | Sign Up</span>
                      <svg
                        className={`site-header__login-chevron ${showDesktopLogin ? 'site-header__login-chevron--open' : ''}`}
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    {/* Only the downward dropdown — no upward panel here */}
                    {showDesktopLogin && (
                      <LoginForm onClose={handleDesktopLoginClose} position="desktop" />
                    )}
                  </div>

                  <Link to="/cart" className="site-header__action site-header__cart">
                    <CartIcon />
                    {totalItems > 0 && <span className="site-header__cart-badge">{totalItems}</span>}
                  </Link>
                </div>

              </div>
            </Container>
          </div>
          <DesktopNav />
        </div>

        {/* ══ MOBILE OFFCANVAS ══ */}
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} className="site-header__offcanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><img src={logo} alt="Elonis" style={{ height: '36px' }} /></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) { navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); setShowOffcanvas(false); }
              }}
              className="mb-3"
            >
              <InputGroup>
                <Form.Control placeholder="Search products..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="site-header__search-input" />
                <Button type="submit" className="site-header__search-btn" aria-label="Search"><SearchIcon /></Button>
              </InputGroup>
            </Form>
            <div className="mobile-nav">
              {NAV_LINKS.map((link) => (
                <MobileNavItem key={link.href} item={link} onClose={() => setShowOffcanvas(false)} />
              ))}
            </div>
            <div className="mt-4 pt-3 border-top">
              <Link to="/login" className="site-header__offcanvas-link d-block mb-2" onClick={() => setShowOffcanvas(false)}>
                Login | Sign Up
              </Link>
              <p className="fw-bold mt-3 mb-0" style={{ fontSize: '0.85rem' }}>📞 {PHONE}</p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

      </header>

      {/*
        Mobile Bottom Nav receives its OWN login state.
        Completely independent from the desktop login state.
      */}
      <MobileBottomNav
        showMobileLogin={showMobileLogin}
        onMobileLoginToggle={handleMobileLoginToggle}
        onMobileLoginClose={handleMobileLoginClose}
      />
    </>
  );
};

export default Header;