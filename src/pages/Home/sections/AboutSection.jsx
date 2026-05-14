// src/pages/Home/sections/AboutSection.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../../utils';
import './AboutSection.scss';

const AboutSection = ({
  subtitle,
  heading,
  description,
  stats = [],
  image,
  imageAlt = "About Kloset Korea",
}) => {
  const displayImage = image ? `${BASE_IMAGE_URL}${image}` : PLACEHOLDER_IMG;

  return (
    <section className="about-section">
      <Container fluid="xl">
        <Row className="align-items-center g-0">

          {/* ── Left: Content ── */}
          <Col lg={6} className="about-content order-2 order-lg-1">
            <div className="about-content__inner">

              {/* Subtitle + Title */}
              <div className="about-header">
                {subtitle && <span className="about-header__subtitle">{subtitle}</span>}
                {heading  && <h2 className="about-header__title">{heading}</h2>}
              </div>

              {/* Decorative Divider */}
              <div className="about-divider" />

              {/* Description */}
              {description && (
                <p className="about-content__text">{description}</p>
              )}

              {/* Stats Grid */}
              {stats?.length > 0 && (
                <div className="about-stats">
                  {stats.map((stat, idx) => (
                    <div key={stat.id ?? idx} className="about-stat">
                      <span className="about-stat__value">{stat.value}</span>
                      <span className="about-stat__label">{stat.title}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </Col>

          {/* ── Right: Image ── */}
          <Col lg={6} className="about-image order-1 order-lg-2">
            <div className="about-image__wrap">
              <img
                src={displayImage}
                alt={imageAlt}
                className="about-image__main"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMG; }}
              />
              <div className="about-image__frame" />
              <div className="about-image__badge">
                <span className="about-image__badge-text">Est. 2010</span>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;