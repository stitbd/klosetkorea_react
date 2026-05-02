import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './AboutPage.scss';

// ── Image Import ─────────────────────────────────────────────────
import aboutImage from '../../assets/images/about/about.jpg';

// ── Page Content Data ────────────────────────────────────────────
const PAGE_DATA = {
  eyebrow: "Our Story",
  title: "Kloset Korea Since 2010",
  description: "Kloset Korea is a premier manufacturer and distributor of high-quality sanitary fixtures, serving hundreds of retail partners across South Korea through a dedicated network of regional representatives. We specialize in durable, customer-focused products—from concealed valves, angle stops, and bibcocks to showers, towel rails, soap dishes, and essential bathroom accessories—all designed to deliver reliable performance, everyday affordability, and seamless after-sales support.",
  image: aboutImage,
  imageAlt: "Kloset Korea manufacturing facility"
};

// ── Mission, Promise, Vision Data ────────────────────────────────
const MPV_DATA = [
  {
    icon: "target",
    title: "Our Mission",
    description: "To provide world-class kitchen appliances and professional installation services at competitive prices, ensuring every customer leaves satisfied."
  },
  {
    icon: "shield",
    title: "Our Promise",
    description: "Premium products, expert technicians, transparent pricing, and a hassle-free warranty on every installation. No hidden charges, ever."
  },
  {
    icon: "rocket",
    title: "Our Vision",
    description: "To be Bangladesh's #1 one-stop shop for all things kitchen — from chimneys and hobs to built-in ovens and premium appliances."
  }
];

// ── What We Do Data ─────────────────────────────────────────────
const WHAT_WE_DO_DATA = [
  {
    icon: "appliance",
    title: "Premium Appliances",
    description: "High-quality kitchen chimneys, induction cookers, gas stoves, built-in ovens, and dishwashers from top brands."
  },
  {
    icon: "installation",
    title: "Professional Installation",
    description: "Expert installation services for all kitchen appliances, ensuring safety, optimal performance, and perfect fit."
  },
  {
    icon: "repair",
    title: "Maintenance & Repair",
    description: "Comprehensive servicing, motor replacements, and deep cleaning for chimneys, ovens, and water purifiers."
  },
  {
    icon: "accessories",
    title: "Appliance Accessories",
    description: "Genuine spare parts, baffle filters, roasting pans, and smart kitchen accessories."
  }
];

// ── Why Choose Us Stats ──────────────────────────────────────────
const WHY_CHOOSE_STATS = [
  { value: "10,000+", label: "Appliances Installed", color: "blue" },
  { value: "99%", label: "Customer Satisfaction", color: "green" },
  { value: "15+", label: "Years Experience", color: "orange" },
  { value: "5 Years", label: "Motor Warranty", color: "purple" }
];

// ── Icon Components ──────────────────────────────────────────────
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const IconAppliance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18.01"/>
    <path d="M8 6h8"/>
  </svg>
);

const IconInstallation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const IconRepair = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const IconAccessories = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const getIcon = (iconName) => {
  const icons = {
    target: <IconTarget />,
    shield: <IconShield />,
    rocket: <IconRocket />,
    appliance: <IconAppliance />,
    installation: <IconInstallation />,
    repair: <IconRepair />,
    accessories: <IconAccessories />
  };
  return icons[iconName] || null;
};

// ── Main Component ───────────────────────────────────────────────
const AboutPage = () => {
  const { eyebrow, title, description, image, imageAlt } = PAGE_DATA;

  return (
    <main className="about-page">
      <Container fluid="xl" className="py-4">
        {/* Breadcrumb + Back */}
        <div className="pdp__topbar d-flex align-items-center justify-content-between mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pdp__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">About Us</li>
            </ol>
          </nav>
          <Link to="/" className="pdp__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back To Home
          </Link>
        </div>

        {/* ── Hero Section ── */}
        <section className="about-section">
          <Container fluid="xl">
            <Row className="align-items-center g-0">
              
              {/* ── Left: Content ── */}
              <Col lg={6} className="about-content order-2 order-lg-1">
                <div className="about-content__inner">
                  
                  {/* Header */}
                  <header className="about-header">
                    <span className="about-header__subtitle">{eyebrow}</span>
                    <h1 className="about-header__title">{title}</h1>
                  </header>

                  {/* Decorative Divider */}
                  <div className="about-divider" aria-hidden="true" />

                  {/* Description */}
                  <p className="about-content__text">{description}</p>

                  {/* Extended Description */}
                  <p className="about-content__text">
                    Our production facility runs on an efficient product-line layout, following strict industry standards to ensure consistent quality and productivity. Quality control is woven into every step of our process, while our smart blend of push-and-pull marketing strategies keeps inventory agile and aligned with real-time market demand—helping Kloset Korea stay a trusted, responsive leader in Korea's sanitary ware industry.
                  </p>

                </div>
              </Col>

              {/* ── Right: Image ── */}
              <Col lg={6} className="about-image order-1 order-lg-2">
                <div className="about-image__wrap">
                  <img 
                    src={image} 
                    alt={imageAlt} 
                    className="about-image__main"
                    loading="lazy"
                    width="600"
                    height="580"
                  />
                  {/* Decorative Gold Frame */}
                  <div className="about-image__frame" aria-hidden="true" />
                  {/* Floating Badge */}
                  <div className="about-image__badge">
                    <span className="about-image__badge-text">Est. 2010</span>
                  </div>
                </div>
              </Col>

            </Row>
          </Container>
        </section>

        {/* ── Mission, Promise, Vision Section ── */}
        <section className="mpv-section">
          <Container fluid="xl">
            <Row className="g-4">
              {MPV_DATA.map((item, idx) => (
                <Col lg={4} key={idx}>
                  <div className="mpv-card">
                    <div className={`mpv-card__icon mpv-card__icon--${idx === 0 ? 'blue' : idx === 1 ? 'red' : 'green'}`}>
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="mpv-card__title">{item.title}</h3>
                    <p className="mpv-card__text">{item.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── What We Do Section ── */}
        <section className="what-we-do-section">
          <Container fluid="xl">
            <div className="section-header">
              <h2 className="section-header__title">What We Do</h2>
              <div className="section-header__divider" aria-hidden="true" />
            </div>
            
            <Row className="g-4">
              {WHAT_WE_DO_DATA.map((item, idx) => (
                <Col lg={6} key={idx}>
                  <div className="wwd-card">
                    <div className="wwd-card__icon">
                      {getIcon(item.icon)}
                    </div>
                    <div className="wwd-card__content">
                      <h3 className="wwd-card__title">{item.title}</h3>
                      <p className="wwd-card__text">{item.description}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── Why Choose Us Section ── */}
        <section className="why-choose-section">
          <Container fluid="xl">
            <div className="section-header">
              <h2 className="section-header__title">Why Choose Kloset Korea?</h2>
              <div className="section-header__divider" aria-hidden="true" />
            </div>
            
            <div className="why-choose-stats">
              {WHY_CHOOSE_STATS.map((stat, idx) => (
                <div key={idx} className="why-choose-stat">
                  <div className={`why-choose-stat__value why-choose-stat__value--${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="why-choose-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

      </Container>
    </main>
  );
};

export default AboutPage;