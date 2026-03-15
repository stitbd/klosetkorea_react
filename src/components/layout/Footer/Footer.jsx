import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';
import logo from '../../../assets/images/logo.png';
import fbIcon       from '../../../assets/icons/facebook.png';
import igIcon       from '../../../assets/icons/instagram.png';
import liIcon       from '../../../assets/icons/linkedin.png';
import ttIcon       from '../../../assets/icons/tiktok.png';
import ytIcon       from '../../../assets/icons/youtube.png';

const SOCIALS = [
  { href: 'https://facebook.com',  icon: fbIcon, label: 'Facebook'  },
  { href: 'https://instagram.com', icon: igIcon, label: 'Instagram' },
  { href: 'https://linkedin.com',  icon: liIcon, label: 'LinkedIn'  },
  { href: 'https://tiktok.com',    icon: ttIcon, label: 'TikTok'    },
  { href: 'https://youtube.com',   icon: ytIcon, label: 'YouTube'   },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__main">
      <Container fluid="xl">
        <Row className="gy-4 py-5">
          {/* Brand + Contact */}
          <Col xs={12} sm={6} lg={3}>
              {/* Logo */}
            <Link to="/" className="site-footer__logo"><img src={logo} alt="Elonis" className="site-footer__logo-img"/></Link>
                        
            {/* <p className="site-footer__tagline">Bangladesh's Premium Lifestyle Brand</p> */}
            <ul className="site-footer__contact list-unstyled mt-3">
              <li>📞 +88 01886 899103</li>
              <li>📧 info@elonis.com.bd</li>
              <li>📍 Ka3/C, 3rd Floor, Joynob Ali Sarak, Jamuna Future Park Pocket Gate, Bashundhara Rd, Dhaka, Bangladesh</li>
            </ul>
            <div className="site-footer__social mt-3">
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="site-footer__social-link">
                  <img src={s.icon} alt={s.label} className="site-footer__social-icon" />
                </a>
              ))}
            </div>
          </Col>

          {/* We Accept */}
          <Col xs={12} sm={6} lg={3}>
            <h6 className="site-footer__heading">WE ACCEPT</h6>
            <div className="site-footer__payments">
              {['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard'].map((p) => (
                <span key={p} className="site-footer__payment-badge">{p}</span>
              ))}
            </div>
          </Col>

          {/* Customer Account */}
          <Col xs={12} sm={6} lg={3}>
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
          <Col xs={12} sm={6} lg={3}>
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
        </Row>
      </Container>
    </div>

    <div className="site-footer__bottom">
      <Container>
        <p className="mb-0 text-center">
          © {new Date().getFullYear()} Elonis Life Style | All rights reserved | Powered by{' '}
          <span className="site-footer__brand">STITBD</span>
        </p>
      </Container>
    </div>
  </footer>
);

export default Footer;
