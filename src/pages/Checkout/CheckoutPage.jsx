import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCartStore from '../../app/store';
import { formatPrice } from '../../utils';
import './CheckoutPage.scss';


// ✅ Bangladesh Division → Cities Map
const BD_LOCATIONS = {
  Dhaka: [
    "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj",
    "Madaripur", "Manikganj", "Munshiganj", "Narayanganj",
    "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
  ],
  Chittagong: [
    "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Brahmanbaria",
    "Chandpur", "Khagrachari", "Lakshmipur", "Noakhali",
    "Rangamati", "Bandarban"
  ],
  Rajshahi: [
    "Rajshahi", "Bogra", "Sirajganj", "Pabna", "Natore",
    "Chapainawabganj", "Joypurhat", "Naogaon"
  ],
  Sylhet: [
    "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"
  ],
  Khulna: [
    "Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah",
    "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
  ],
  Barishal: [
    "Barishal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"
  ],
  Rangpur: [
    "Rangpur", "Dinajpur", "Thakurgaon", "Panchagarh",
    "Kurigram", "Lalmonirhat", "Nilphamari", "Gaibandha"
  ],
  Mymensingh: [
    "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
  ],
};

// ✅ Coupon Codes
const COUPONS = {
  SAVE50: 50,
  SAVE100: 100,
};

const CheckoutPage = () => {
  const items = useCartStore((s) => s.items);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const [showCoupon, setShowCoupon] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    division: '',
    city: '',
    note: '',
    payment: 'cod',
  });

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Delivery charge logic
  const shipping =
    form.division === 'Dhaka'
      ? 60
      : form.division
      ? 120
      : 0;

  const total = subtotal + shipping - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset city if division changes
    if (name === 'division') {
      setForm((f) => ({ ...f, division: value, city: '' }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // ✅ Apply Coupon
  const applyCoupon = () => {
    const value = COUPONS[coupon.toUpperCase()];
    if (value) {
      setDiscount(value);
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="checkout-page">
        <Container className="py-5 text-center">
          <div className="checkout-page__success">
            <p className="checkout-page__success-icon">✅</p>
            <h3>Order Placed Successfully!</h3>
            <p className="text-muted">
              Thank you, {form.name}! We'll call you at {form.phone}.
            </p>
            <Link to="/" className="checkout-page__back-btn">
              ← Back to Home
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <Container fluid="xl" className="py-4">
        <h2 className="checkout-page__title mb-4">Checkout</h2>

        <Row className="g-4">
          {/* FORM */}
          <Col xs={12} lg={7}>
            <div className="checkout-page__form-card">
              <h5>Delivery Information</h5>

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </Col>

                  <Col sm={6}>
                    <Form.Control
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      required
                    />
                  </Col>

                  <Col xs={12}>
                    <Form.Control
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Full Address"
                      required
                    />
                  </Col>

                  {/* ✅ Division */}
                  <Col sm={6}>
                    <Form.Select
                      name="division"
                      value={form.division}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Division</option>
                      {Object.keys(BD_LOCATIONS).map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </Form.Select>
                  </Col>

                  {/* ✅ City (Dynamic) */}
                  <Col sm={6}>
                    <Form.Select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      disabled={!form.division}
                    >
                      <option value="">Select City</option>
                      {form.division &&
                        BD_LOCATIONS[form.division].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                    </Form.Select>
                  </Col>

                  <Col xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      placeholder="Order Note"
                    />
                  </Col>
                </Row>

                {/* PAYMENT */}
               <h5 className="checkout-page__section-title mt-4">Payment Method</h5>

                <div className="payment-methods">
                  {[
                    { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    { value: 'bkash', label: 'bKash', icon: '📱' },
                    { value: 'nagad', label: 'Nagad', icon: '📲' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`payment-card ${
                        form.payment === method.value ? 'active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={form.payment === method.value}
                        onChange={handleChange}
                      />

                      <div className="payment-card__content">
                        <span className="payment-card__icon">{method.icon}</span>
                        <span className="payment-card__label">{method.label}</span>
                      </div>

                      <span className="payment-card__check">
                        {form.payment === method.value && '✔'}
                      </span>
                    </label>
                  ))}
                </div>

                <button className="checkout-page__submit-btn mt-4">
                  Place Order →
                </button>
              </Form>
            </div>
          </Col>

          {/* SUMMARY */}
          <Col xs={12} lg={5}>
            <div className="checkout-page__summary">
              <h5>Order Summary</h5>

              {items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Discount</span>
                <span>{formatPrice(coupon)}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>

              {discount > 0 && (
                <div className="d-flex justify-content-between text-success">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CheckoutPage;