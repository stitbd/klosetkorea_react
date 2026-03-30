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
import dbblIcon from '../../../assets/icons/dbbl.png';
import bKashIcon from '../../../assets/icons/bkash.png';
import nagadIcon from '../../../assets/icons/nogod.png';
import rocketIcon from '../../../assets/icons/rocket.png';

// ── Social Links Config ───────────────────────────────────
const SOCIALS = [
  { href: 'https://www.facebook.com/elonis.official',  icon: fbIcon, label: 'Facebook'  },
  { href: 'https://www.instagram.com/elonis.official', icon: igIcon, label: 'Instagram' },
  { href: 'https://tiktok.com/@elonis.official',    icon: ttIcon, label: 'TikTok'},
  { href: 'https://youtube.com/@elonis.official',   icon: ytIcon, label: 'YouTube'   },
  { href: 'https://www.linkedin.com/company/elonis-official',  icon: liIcon, label: 'LinkedIn'  },
];

// ── Payment Methods Config ────────────────────────────────
const PAYMENTS = [
  { name: 'Visa',       icon: visaIcon,       alt: 'Visa' },
  { name: 'Mastercard', icon: mastercardIcon, alt: 'Mastercard' },
  { name: 'AmericanExpress', icon: americanExpressIcon, alt: 'AmericanExpress' },
  { name: 'BracBank', icon: bracBankIcon, alt: 'BracBank' },
  { name: 'Dbbl', icon: dbblIcon, alt: 'Dbbl' },
  { name: 'bKash',      icon: bKashIcon,      alt: 'bKash' },
  { name: 'Nagad',      icon: nagadIcon,      alt: 'Nagad' },
  { name: 'Rocket',     icon: rocketIcon,     alt: 'Rocket' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'success' | 'error' | ''

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    // TODO: Add your API call here
    console.log('Newsletter signup:', email);
    
    // Simulate success
    setStatus('success');
    setEmail('');
    
    // Clear status after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <Container fluid="xl">
          <Row className="gy-4 py-5">
            {/* Brand + Contact */}
            <Col xs={12} sm={6} lg={3}>
              {/* Logo */}
              <Link to="/" className="site-footer__logo">
                <img src={logo} alt="Elonis" className="site-footer__logo-img"/>
              </Link>
              
              {/* <p className="site-footer__tagline">Bangladesh's Premium Lifestyle Brand</p> */}
              <ul className="site-footer__contact list-unstyled mt-3">
                <li>📞 +88 01886 899103</li>
                {/* <li>📧 info@elonis.com.bd</li> */}
                <li>📧 elonis.official@gmail.com</li>
                <li>📍 Dhaka, Bangladesh</li>
              </ul>
              <div className="site-footer__social mt-3">
                {SOCIALS.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="site-footer__social-link">
                    <img src={s.icon} alt={s.label} className="site-footer__social-icon" />
                  </a>
                ))}
              </div>
            </Col>

            {/* Newsletter */}
            <Col xs={12} sm={6} lg={3}>
              <h6 className="site-footer__heading">Newsletter Signup</h6>
              <p className="site-footer__newsletter-text">
                Subscribe to our newsletter and get exciting offers
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="site-footer__newsletter-form">
                <div className="site-footer__newsletter-input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus('');
                    }}
                    placeholder="Your email address"
                    className="site-footer__newsletter-input"
                    required
                  />
                  <button type="submit" className="site-footer__newsletter-btn">
                    SUBSCRIBE
                  </button>
                </div>
                {status === 'success' && (
                  <p className="site-footer__newsletter-message site-footer__newsletter-message--success">
                    ✓ Thank you for subscribing!
                  </p>
                )}
                {status === 'error' && (
                  <p className="site-footer__newsletter-message site-footer__newsletter-message--error">
                    Please enter a valid email address
                  </p>
                )}
              </form>
            </Col>

            {/* Customer Account */}
            <Col xs={12} sm={6} lg={2}>
              <h6 className="site-footer__heading">Customer Account</h6>
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

            {/* Related Pages */}
            <Col xs={12} sm={6} lg={2}>
              <h6 className="site-footer__heading">Related Pages</h6>
              <ul className="site-footer__links list-unstyled">
                {[
                  { label: 'About Us',              to: '/about' },
                  { label: 'Privacy Policy',        to: '/privacy-policy' },
                  { label: 'Exchange Policy',       to: '/exchange-policy' },
                  { label: 'Contact Us',            to: '/contact' },
                  { label: 'Returns & Refunds',     to: '/returns' },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="site-footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* ──  We Accept (with SSLCOMMERZ logo) ───────── */}
            <Col xs={12} sm={6} lg={2}>
              <div className="site-footer__heading-wrapper">
                <h6 className="site-footer__heading">WE ACCEPT </h6>
                {/* SSLCOMMERZ logo - right side, no bg/border */}
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

      <div className="site-footer__bottom">
        <Container>
          <p className="mb-0 text-center">
            © {new Date().getFullYear()} ELONIS Lifestyle | All rights reserved | Powered by{' '}
            <Link to="https://stitbd.com/" className="" target='_blank'>
                <span className="site-footer__brand">STITBD</span>
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;