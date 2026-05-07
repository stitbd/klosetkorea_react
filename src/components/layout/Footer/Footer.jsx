import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Footer.scss';

import logoFallback from '../../../assets/images/logo.png';

// Social Icons (Static)
import fbIcon from '../../../assets/icons/facebook.png';
import igIcon from '../../../assets/icons/instagram.png';
import liIcon from '../../../assets/icons/linkedin.png';
import ttIcon from '../../../assets/icons/tiktok.png';
import ytIcon from '../../../assets/icons/youtube.png';

// Payments
import sslCommerzIcon      from '../../../assets/icons/sslcommerz.png';
import visaIcon            from '../../../assets/icons/visa.png';
import mastercardIcon      from '../../../assets/icons/mastercard.png';
import americanExpressIcon from '../../../assets/icons/american-express.png';
import bracBankIcon        from '../../../assets/icons/brac-bank.png';
import cityBankIcon        from '../../../assets/icons/citybank.png';
import dbblIcon            from '../../../assets/icons/dbbl.png';
import bKashIcon           from '../../../assets/icons/bkash.png';
import nagadIcon           from '../../../assets/icons/nogod.png';
import rocketIcon          from '../../../assets/icons/rocket.png';

import { useGeneralSettings } from '../../../hooks/useGeneralSettings';
import { BASE_IMAGE_URL }     from '../../../utils';

const SOCIAL_ICON_MAP = {
  facebook:  fbIcon,
  instagram: igIcon,
  linkedin:  liIcon,
  tiktok:    ttIcon,
  youtube:   ytIcon,
};

const PAYMENTS = [
  { name: 'Visa',            icon: visaIcon },
  { name: 'Mastercard',      icon: mastercardIcon },
  { name: 'AmericanExpress', icon: americanExpressIcon },
  { name: 'BracBank',        icon: bracBankIcon },
  { name: 'CityBank',        icon: cityBankIcon },
  { name: 'Dbbl',            icon: dbblIcon },
  { name: 'bKash',           icon: bKashIcon },
  { name: 'Nagad',           icon: nagadIcon },
  { name: 'Rocket',          icon: rocketIcon },
];

const Footer = () => {
  const { settings, contact, socials, loading } = useGeneralSettings();

  // ── Newsletter state ──
  const [email,       setEmail]       = useState('');
  const [subLoading,  setSubLoading]  = useState(false);
  const [subMessage,  setSubMessage]  = useState(null);
  const [toast, setToast] = useState(null);

  // ── Pages (Company menu) state ──
  const [pages, setPages] = useState([]);

  // const logo = settings?.dark_logo
  //   ? `${BASE_IMAGE_URL}/${settings.dark_logo}`
  //   : logoFallback;

    const logo = settings?.light_logo
  ? `${BASE_IMAGE_URL}/${settings.light_logo}`
  : logoFallback;

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const SOCIALS = socials.map((s) => {
    const key = s.title?.toLowerCase();
    return { href: s.href, label: s.title, icon: SOCIAL_ICON_MAP[key] || fbIcon };
  });

  // ── Fetch pages list from API ──
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    axios
      .get(`${API}/pages`)
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          // Sort pages alphabetically by name before setting to state
          const sortedPages = [...res.data.data].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          setPages(sortedPages);
        }
      })
      .catch(() => {
        // Silently fail — footer still works without pages
      });
  }, []);

  // ── Subscribe handler ──
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('warning', 'Please enter your email.');
      return;
    }
  
    setSubLoading(true);
  
    try {
      const API = import.meta.env.VITE_API_URL;
      const formData = new FormData();
      formData.append('email', email.trim());
  
      const res = await axios.post(`${API}/subscribe`, formData);
  
      if (res.data?.success) {
        showToast('success', res.data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        // 409 Conflict — already subscribed
        showToast('warning', res.data?.message || 'This email is already subscribed.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      showToast('error', msg);
    } finally {
      setSubLoading(false);
    }
  };

  if (loading) return null;

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <Container fluid="xl">
          <Row className="gy-4 py-5">

            {/* Brand + Contact */}
            <Col xs={12} sm={6} lg={3}>
              <Link to="/" className="site-footer__logo">
                <img src={logo} alt="logo" className="site-footer__logo-img"/>
              </Link>
              <ul className="site-footer__contact list-unstyled mt-3">
                <li>📞 {contact?.phone}</li>
                <li>📧 {contact?.email}</li>
                <li>📍 {contact?.address}</li>
              </ul>
              
              {/* Social */}
              <div className="site-footer__social-bottom">
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    className="site-footer__social-link-bottom">
                    <img src={s.icon} alt={s.label} className="site-footer__social-icon-bottom"/>
                  </a>
                ))}
              </div>
            </Col>

            {/* Newsletter */}
            <Col xs={12} sm={6} lg={3}>
              <h6 className="site-footer__heading">Newsletter Signup</h6>
              <p className="site-footer__newsletter-text">
                Subscribe with email for exclusive offers
              </p>
              <form className="site-footer__newsletter-form" onSubmit={handleSubscribe}>
                <div className="site-footer__newsletter-input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubMessage(null); }}
                    placeholder="Enter your email here..."
                    className="site-footer__newsletter-input"
                    disabled={subLoading}
                  />
                </div>
                <button
                  className="site-footer__newsletter-btn"
                  type="submit"
                  disabled={subLoading}
                >
                  {subLoading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                  </button>
                {toast && (
                  <div className={`site-footer__newsletter-toast site-footer__newsletter-toast--${toast.type}`}>
                    <span className="site-footer__newsletter-toast-icon">
                      {toast.type === 'success' ? '✔' : toast.type === 'warning' ? '⚠' : '✖'}
                    </span>
                    <span className="site-footer__newsletter-toast-text">{toast.text}</span>
                  </div>
                )}
              </form>
            </Col>

            {/* Account */}
            <Col xs={12} sm={6} lg={2}>
              <h6 className="site-footer__heading">My Account</h6>
              <ul className="site-footer__links list-unstyled">
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {/* <li><Link to="/wishlist">Wishlist</Link></li> */}
                {/* <li><Link to="/account/orders">Orders</Link></li> */}
              </ul>
            </Col>

            {/* Company — dynamic pages from API (sorted alphabetically) */}
            <Col xs={12} sm={6} lg={2}>
              <h6 className="site-footer__heading">Company</h6>
              <ul className="site-footer__links list-unstyled">
                {/* Dynamic pages from API - already sorted alphabetically */}
                {pages.map((page) => (
                  <li key={page.id}>
                    <Link to={`/page/${page.slug}`}>{page.name}</Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Payments */}
            <Col xs={12} sm={6} lg={2}>
              <div className="site-footer__heading-wrapper">
                <h6 className="site-footer__heading">Secure Payments</h6>
                <img src={sslCommerzIcon} alt="SSLCommerz" className="site-footer__sslcommerz-logo"/>
              </div>
              <div className="site-footer__payments">
                {PAYMENTS.map((p) => (
                  <span key={p.name} className="site-footer__payment-badge">
                    <img src={p.icon} alt={p.name} className="site-footer__payment-img"/>
                  </span>
                ))}
              </div>
            </Col>

          </Row>
        </Container>
      </div>

      {/* Bottom */}
      <div className="site-footer__bottom">
        <Container>
          <div className="site-footer__bottom-content">

            {/* Copyright */}
            <p className="site-footer__copyright">
              {settings?.copyright
                ? settings.copyright
                : `© ${new Date().getFullYear()} ${settings?.name || 'Kloset Korea'} | All rights reserved`
              }{' '}
              {/* | Powered by{' '}
              <Link to="https://stitbd.com/" className="site-footer__brand" target="_blank" rel="noopener noreferrer">
                STITBD
              </Link> */}
            </p>

          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;