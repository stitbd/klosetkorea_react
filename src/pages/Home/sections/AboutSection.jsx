// src/pages/Home/sections/AboutSection.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import aboutImage from '../../../assets/images/about/about.jpg';
import './AboutSection.scss';

const AboutSection = ({
  title = "ABOUT US",
  subtitle = "Our Story",
  heading = "Kloset Korea Since 2010",
  description = "Kloset Korea operates as a trusted manufacturer and nationwide distributor of premium sanitary fixtures, proudly supplying our signature brand to hundreds of retail partners across every major region in South Korea. Supported by a dedicated network of regional field specialists, we have established ourselves as a leading force in the domestic sanitary metal sector, recognized for engineering products that seamlessly blend everyday affordability with exceptional durability and long-term reliability. Every fixture we bring to market is designed with practical living in mind, ensuring consistent shelf availability, user-friendly functionality, and responsive after-sales support. Our comprehensive catalog covers concealed valves, angle stops, stopcocks, bibcocks, pillar taps, sink mixers, handheld showers, towel rails, rings, soap dishes, toilet paper holders, floor gratings, precision bushings, and a wide range of complementary bathroom accessories. Behind our finished products lies a highly optimized manufacturing environment built around a streamlined product-line layout that maximizes workflow efficiency and maintains steady, high-volume output. We adhere to internationally aligned production standards at every stage, but rigorous quality control is what truly defines Kloset Korea—it’s embedded into our daily operations through multi-tier inspections, material traceability, and continuous performance calibration rather than treated as a final checkpoint. To stay aligned with shifting consumer trends and retail needs, we strategically blend push and pull methodologies across our demand forecasting, inventory planning, and promotional campaigns. This dual approach keeps our supply chain lean and highly responsive, ensuring the right fixtures are consistently positioned where demand is strongest and reinforcing Kloset Korea’s reputation as a dependable, forward-thinking leader in the modern sanitary ware industry.",
  stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "50K+", label: "Happy Clients" },
    { value: "100%", label: "Crafted" },
  ],
  ctaText = "Discover Our Journey",
  ctaLink = "/about",
  image = aboutImage,
  imageAlt = "Our artisan workshop"
}) => {
  return (
    <section className="about-section section-wrapper">
      <Container fluid="xl">
        <Row className="align-items-center g-0">
          
          {/* ── Left: Content ── */}
          <Col lg={6} className="about-content order-2 order-lg-1">
            <div className="about-content__inner">
              {/* Subtitle + Title */}
              <div className="about-header">
                <span className="about-header__subtitle">{subtitle}</span>
                <h2 className="about-header__title">{heading}</h2>
              </div>

              {/* Decorative Divider */}
              <div className="about-divider" />

              {/* Description */}
              <p className="about-content__text">Kloset Korea is a premier manufacturer and distributor of high-quality sanitary fixtures, serving hundreds of retail partners across South Korea through a dedicated network of regional representatives. We specialize in durable, customer-focused products—from concealed valves, angle stops, and bibcocks to showers, towel rails, soap dishes, and essential bathroom accessories—all designed to deliver reliable performance, everyday affordability, and seamless after-sales support.
              Our production facility runs on an efficient product-line layout, following strict industry standards to ensure consistent quality and productivity. Quality control is woven into every step of our process, while our smart blend of push-and-pull marketing strategies keeps inventory agile and aligned with real-time market demand—helping Kloset Korea stay a trusted, responsive leader in Korea's sanitary ware industry.</p>

              {/* Stats Grid */}
              {stats?.length > 0 && (
                <div className="about-stats">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="about-stat">
                      <span className="about-stat__value">{stat.value}</span>
                      <span className="about-stat__label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {ctaLink && (
                <Link to={ctaLink} className="about-cta">
                  {ctaText}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
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
              />
              {/* Decorative Gold Frame */}
              <div className="about-image__frame" />
              {/* Floating Badge */}
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