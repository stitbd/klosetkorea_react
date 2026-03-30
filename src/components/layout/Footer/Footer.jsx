import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

// ── Logo ──────────────────────────────────────────────────
import logo from '../../../assets/images/logo.png';

// ── Social Icons ──────────────────────────────────────────
import fbIcon       from '../../../assets/icons/facebook.png';
import igIcon       from '../../../assets/icons/instagram.png';
import liIcon       from '../../../assets/icons/linkedin.png';
import ttIcon       from '../../../assets/icons/tiktok.png';
import ytIcon       from '../../../assets/icons/youtube.png';

// ── Payment Method Logos ──────────────────────────────────
import sslCommerzIcon from '../../../assets/icons/sslcommerz.png';
import visaIcon from '../../../assets/icons/visa.png';
import mastercardIcon from '../../../assets/icons/mastercard.png';
import americanExpressIcon from '../../../assets/icons/american-express.png';
import bracBankIcon from '../../../assets/icons/brac-bank.png';
import cityBankIcon from '../../../assets/icons/citybank.png';
import dbblIcon from '../../../assets/icons/dbbl.png';
import bKashIcon from '../../../assets/icons/bkash.png';
import nagadIcon from '../../../assets/icons/nogod.png';
import rocketIcon from '../../../assets/icons/rocket.png';

// ── Social Links Config ───────────────────────────────────
const SOCIALS = [
  { href: 'https://www.facebook.com/elonis.official',  icon: fbIcon, label: 'Facebook'  },
  { href: 'https://www.instagram.com/elonis.official', icon: igIcon, label: 'Instagram' },
  { href: 'https://tiktok.com/@elonis.official',       icon: ttIcon, label: 'TikTok'    },
  { href: 'https://youtube.com/@elonis.official',      icon: ytIcon, label: 'YouTube'   },
  { href: 'https://www.linkedin.com/company/elonis-official', icon: liIcon, label: 'LinkedIn' },
];

// ── Payment Methods Config ────────────────────────────────
const PAYMENTS = [
  { name: 'Visa',       icon: visaIcon,       alt: 'Visa' },
  { name: 'Mastercard', icon: mastercardIcon, alt: 'Mastercard' },
  { name: 'AmericanExpress', icon: americanExpressIcon, alt: 'AmericanExpress' },
  { name: 'BracBank', icon: bracBankIcon, alt: 'BracBank' },
  { name: 'CityBank', icon: cityBankIcon, alt: 'CityBank' },
  { name: 'Dbbl', icon: dbblIcon, alt: 'DBBL' },
  { name: 'bKash',      icon: bKashIcon,      alt: 'bKash' },
  { name: 'Nagad',      icon: nagadIcon,      alt: 'Nagad' },
  { name: 'Rocket',     icon: rocketIcon,     alt: 'Rocket' },
];

// ── Validation Helpers ────────────────────────────────────
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value) => {
  const regex = /^(\+88|88)?01[3-9]\d{8}$/;
  return regex.test(value.replace(/[\s\-\(\)]/g, ''));
};

const detectInputType = (value) => {
  const cleanValue = value.trim().replace(/[\s\-\(\)]/g, '');
  if (!cleanValue) return null;
  if (cleanValue.includes('@')) return 'email';
  if (/^\d+$/.test(cleanValue) || /^(\+88|88)?01[3-9]\d{8}$/.test(cleanValue)) return 'phone';
  return 'unknown';
};

const Footer = () => {
  const [contactValue, setContactValue] = useState('');
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setStatus('');
    setErrorMsg('');

    const cleanValue = contactValue.trim().replace(/[\s\-\(\)]/g, '');

    if (!cleanValue) {
      setStatus('error');
      setErrorMsg('Please enter your email or phone number');
      return;
    }

    const inputType = detectInputType(cleanValue);

    if (inputType === 'email' && !isValidEmail(cleanValue)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (inputType === 'phone' && !isValidPhone(cleanValue)) {
      setStatus('error');
      setErrorMsg('Please enter a valid phone number (e.g., 017XXXXXXXX)');
      return;
    }

    if (inputType === 'unknown') {
      setStatus('error');
      setErrorMsg('Please enter a valid email or phone number');
      return;
    }

    const subscriptionData = inputType === 'email' 
      ? { email: cleanValue, phone: null }
      : { email: null, phone: cleanValue };
    
    console.log('Newsletter signup:', subscriptionData);
    
    setStatus('success');
    setContactValue('');
    
    setTimeout(() => {
      setStatus('');
      setErrorMsg('');
    }, 3000);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <Container fluid="xl">
          <Row className="gy-4 py-5">
            {/* Brand + Contact */}
            <Col xs={12} sm={6} lg={3}>
              <Link to="/" className="site-footer__logo">
                <img src={logo} alt="Elonis" className="site-footer__logo-img"/>
              </Link>
              
              <ul className="site-footer__contact list-unstyled mt-3">
                <li>📞 +88 01886 899103</li>
                <li>📧 elonis.official@gmail.com</li>
                <li>📍 Dhaka, Bangladesh</li>
              </ul>
            </Col>

            {/* Newsletter */}
            <Col xs={12} sm={6} lg={3}>
              <h6 className="site-footer__heading">Newsletter Signup</h6>
              <p className="site-footer__newsletter-text">
                Subscribe with email or phone for exclusive offers
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="site-footer__newsletter-form">
                <div className="site-footer__newsletter-input-wrapper">
                  <input
                    type="text"
                    value={contactValue}
                    onChange={(e) => {
                      setContactValue(e.target.value);
                      if (status === 'error') { setStatus(''); setErrorMsg(''); }
                    }}
                    placeholder="Email or Phone (017XXXXXXXX)"
                    className="site-footer__newsletter-input"
                    autoComplete="off"
                  />
                </div>
                
                <button type="submit" className="site-footer__newsletter-btn">
                  SUBSCRIBE
                </button>
                
                {status === 'success' && (
                  <p className="site-footer__newsletter-message site-footer__newsletter-message--success">
                    ✓ Thank you for subscribing!
                  </p>
                )}
                {status === 'error' && errorMsg && (
                  <p className="site-footer__newsletter-message site-footer__newsletter-message--error">
                    ✗ {errorMsg}
                  </p>
                )}
              </form>
            </Col>

            {/* My Account */}
            <Col xs={12} sm={6} lg={2}>
              <h6 className="site-footer__heading">My Account</h6>
              <ul className="site-footer__links list-unstyled">
                {[
                  { label: 'Create an Account', to: '/register' },
                  { label: 'My Shopping List',  to: '/wishlist' },
                  { label: 'My Orders',         to: '/account/orders' },
                  { label: 'My Dashboard',      to: '/account' },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="site-footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Company Pages */}
            <Col xs={12} sm={6} lg={2}>
              <h6 className="site-footer__heading">Company</h6>
              <ul className="site-footer__links list-unstyled">
                {[
                  { label: 'About Us',              to: '/about' },
                  { label: 'Contact Us',            to: '/contact' },
                  { label: 'Privacy Policy',        to: '/privacy-policy' },
                  { label: 'Exchange Policy',       to: '/exchange-policy' },
                  { label: 'Returns and Refunds Policy',     to: '/returns' },
                  { label: 'Size Guide',            to: '/size-guide' },
                  { label: 'Terms and Conditions',  to: '/terms-conditions' },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="site-footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Secure Payments */}
            <Col xs={12} sm={6} lg={2}>
              <div className="site-footer__heading-wrapper">
                <h6 className="site-footer__heading">Secure Payments</h6>
                <img 
                  src={sslCommerzIcon} 
                  alt="SSLCommerz" 
                  className="site-footer__sslcommerz-logo"
                  loading="lazy"
                />
              </div>
              
              <div className="site-footer__payments">
                {PAYMENTS.map((p) => (
                  <span key={p.name} className="site-footer__payment-badge">
                    <img 
                      src={p.icon} 
                      alt={p.alt} 
                      className="site-footer__payment-img"
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ✅ Bottom Bar - Social Left, Copyright Right */}
      <div className="site-footer__bottom">
        <Container>
          <div className="site-footer__bottom-content">
            {/* ✅ Social Icons - Left Side */}
            <div className="site-footer__social-bottom">
              {SOCIALS.map((s) => (
                <a 
                  key={s.href} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="site-footer__social-link-bottom"
                  aria-label={s.label}
                >
                  <img 
                    src={s.icon} 
                    alt={s.label} 
                    className="site-footer__social-icon-bottom" 
                  />
                </a>
              ))}
            </div>

            {/* ✅ Copyright - Right Side */}
            <p className="site-footer__copyright">
              © {new Date().getFullYear()} ELONIS Lifestyle | All rights reserved | Powered by{' '}
              <Link to="https://stitbd.com/" className="site-footer__brand" target='_blank' rel="noopener noreferrer">
                STITBD
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;