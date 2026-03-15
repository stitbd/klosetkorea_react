import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './TrustBar.scss';

const FEATURES = [
  { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ৳1,000' },
  { icon: '🔄', title: 'Easy Returns',  sub: '7-day hassle-free return' },
  { icon: '🔒', title: '100% Secure',   sub: 'SSL secured checkout' },
];

const TrustBar = () => (
  <div className="trust-bar">
    <Container fluid="xl">
      <Row className="gy-3">
        {FEATURES.map((f) => (
          <Col key={f.title} xs={12} sm={4}>
            <div className="trust-bar__item">
              <span className="trust-bar__icon">{f.icon}</span>
              <div>
                <p className="trust-bar__title">{f.title}</p>
                <p className="trust-bar__sub">{f.sub}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
);

export default TrustBar;
