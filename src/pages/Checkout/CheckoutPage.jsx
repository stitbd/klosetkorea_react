import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCartStore from '../../app/store';
import { formatPrice } from '../../utils';
import './CheckoutPage.scss';

const CheckoutPage = () => {
  const items   = useCartStore((s) => s.items);
  const total   = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = total >= 1000 ? 0 : 60;

  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', note: '', payment: 'cod',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <main className="checkout-page">
      <Container className="py-5 text-center">
        <div className="checkout-page__success">
          <p className="checkout-page__success-icon">✅</p>
          <h3>Order Placed Successfully!</h3>
          <p className="text-muted">Thank you, {form.name}! We'll call you at {form.phone} to confirm.</p>
          <Link to="/" className="checkout-page__back-btn">← Back to Home</Link>
        </div>
      </Container>
    </main>
  );

  return (
    <main className="checkout-page">
      <Container fluid="xl" className="py-4">
        <h2 className="checkout-page__title mb-4">Checkout</h2>
        <Row className="g-4">
          {/* Form */}
          <Col xs={12} lg={7}>
            <div className="checkout-page__form-card">
              <h5 className="checkout-page__section-title">Delivery Information</h5>
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control name="phone" value={form.phone} onChange={handleChange} required placeholder="01XXXXXXXXX" type="tel" />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Full Address *</Form.Label>
                      <Form.Control name="address" value={form.address} onChange={handleChange} required placeholder="House, road, area" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>City *</Form.Label>
                      <Form.Select name="city" value={form.city} onChange={handleChange} required>
                        <option value="">Select city</option>
                        {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Mymensingh', 'Rangpur'].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Order Note (optional)</Form.Label>
                      <Form.Control as="textarea" rows={2} name="note" value={form.note} onChange={handleChange} placeholder="Any special instructions..." />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="checkout-page__section-title mt-4">Payment Method</h5>
                <div className="checkout-page__payment-options">
                  {[
                    { value: 'cod',   label: '💵 Cash on Delivery' },
                    { value: 'bkash', label: '📱 bKash' },
                    { value: 'nagad', label: '📱 Nagad' },
                  ].map((opt) => (
                    <label key={opt.value} className={`checkout-page__payment-opt ${form.payment === opt.value ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={form.payment === opt.value}
                        onChange={handleChange}
                        className="me-2"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>

                <button type="submit" className="checkout-page__submit-btn mt-4">
                  Place Order →
                </button>
              </Form>
            </div>
          </Col>

          {/* Summary */}
          <Col xs={12} lg={5}>
            <div className="checkout-page__summary">
              <h5 className="checkout-page__section-title">Order Summary</h5>
              {items.map((item) => (
                <div key={item.id} className="checkout-page__summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="checkout-page__summary-divider" />
              <div className="checkout-page__summary-item">
                <span>Subtotal</span><span>{formatPrice(total)}</span>
              </div>
              <div className="checkout-page__summary-item">
                <span>Shipping</span>
                <span className="text-success">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="checkout-page__summary-item checkout-page__summary-item--total">
                <span>Grand Total</span><span>{formatPrice(total + shipping)}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CheckoutPage;
