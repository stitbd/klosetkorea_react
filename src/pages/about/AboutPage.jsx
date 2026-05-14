// src/pages/About/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../utils'; 
import { apiGet } from '../../utils/api';
import './AboutPage.scss';

// ── Icon SVGs for Mission / Promise / Vision ─────────────────────
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
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

// ── Main Component ───────────────────────────────────────────────
const AboutPage = () => {
  const [about,      setAbout]      = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [whatWeDo,   setWhatWeDo]   = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    apiGet('/about')
      .then((res) => {
        if (!res.data?.success) return;
        const d = res.data.data || {};
        setAbout(d.about      || null);
        setStatistics(d.statistics  || []);
        setWhatWeDo(d.what_we_do  || []);
      })
      .catch((err) => console.error('About API error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="about-page">
        <Container fluid="xl" className="py-5 text-center">Loading…</Container>
      </main>
    );
  }

  // Build Mission / Promise / Vision array from API fields
  const mpvItems = about ? [
    { icon: <IconTarget />, color: 'blue',  title: about.mission_title, text: about.mission_description },
    { icon: <IconShield />, color: 'red',   title: about.promise_title, text: about.promise_description },
    { icon: <IconRocket />, color: 'green', title: about.vision_title,  text: about.vision_description  },
  ] : [];

  const displayImage = about?.image
    ? `${BASE_IMAGE_URL}${about.image}`
    : PLACEHOLDER_IMG;

  // Split description on newlines so \r\n renders as paragraphs
  const descParagraphs = (about?.description || '').split(/\r?\n/).filter(Boolean);

  return (
    <main className="about-page">
      <Container fluid="xl" className="py-4">

        {/* ── Breadcrumb ── */}
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
        {about && (
          <section className="about-section">
            <Container fluid="xl">
              <Row className="align-items-center g-0">

                {/* Left: Content */}
                <Col lg={6} className="about-content order-2 order-lg-1">
                  <div className="about-content__inner">
                    <header className="about-header">
                      <span className="about-header__subtitle">{about.title}</span>
                      <h1 className="about-header__title">{about.sub_title}</h1>
                    </header>
                    <div className="about-divider" aria-hidden="true" />
                    {descParagraphs.map((para, i) => (
                      <p key={i} className="about-content__text">{para}</p>
                    ))}
                  </div>
                </Col>

                {/* Right: Image */}
                <Col lg={6} className="about-image order-1 order-lg-2">
                  <div className="about-image__wrap">
                    <img
                      src={displayImage}
                      alt={about.sub_title || 'About Kloset Korea'}
                      className="about-image__main"
                      loading="lazy"
                      width="600"
                      height="580"
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMG; }}
                    />
                    <div className="about-image__frame" aria-hidden="true" />
                    <div className="about-image__badge">
                      <span className="about-image__badge-text">Est. 2010</span>
                    </div>
                  </div>
                </Col>

              </Row>
            </Container>
          </section>
        )}

        {/* ── Mission / Promise / Vision ── */}
        {mpvItems.length > 0 && (
          <section className="mpv-section">
            <Container fluid="xl">
              <Row className="g-4">
                {mpvItems.map((item, idx) => (
                  <Col lg={4} key={idx}>
                    <div className="mpv-card">
                      <div className={`mpv-card__icon mpv-card__icon--${item.color}`}>
                        {item.icon}
                      </div>
                      <h3 className="mpv-card__title">{item.title}</h3>
                      <p className="mpv-card__text">{item.text}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        )}

        {/* ── What We Do ── */}
        {whatWeDo.length > 0 && (
          <section className="what-we-do-section">
            <Container fluid="xl">
              <div className="section-header">
                <h2 className="section-header__title">What We Do</h2>
                <div className="section-header__divider" aria-hidden="true" />
              </div>
              <Row className="g-4">
                {whatWeDo.map((item) => (
                  <Col lg={6} key={item.id}>
                    <div className="wwd-card">
                      <div className="wwd-card__icon">
                        {item.icon ? (
                          <img
                            src={`${BASE_IMAGE_URL}${item.icon}`}
                            alt={item.title}
                            style={{ width: 40, height: 40, objectFit: 'contain' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : null}
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
        )}


        {/* ── Statistics ── */}
        {statistics.length > 0 && (
          <section className="why-choose-section">
            <Container fluid="xl">
              <div className="section-header">
                <h2 className="section-header__title">Why Choose Kloset Korea?</h2>
                <div className="section-header__divider" aria-hidden="true" />
              </div>
              <div className="why-choose-stats">
                {statistics.map((stat) => (
                  <div key={stat.id} className="why-choose-stat">
                    <div className="why-choose-stat__value">{stat.value}</div>
                    <div className="why-choose-stat__label">{stat.title}</div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}
        
      </Container>
    </main>
  );
};

export default AboutPage;