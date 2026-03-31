import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './RegisterPage.scss';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with your actual register API call
      // await api.register(formData);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to sign in or home after successful register
      navigate('/signin'); 
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pdp">
      <Container fluid="xl" className="py-3">
      
        {/* ── Breadcrumb + Back ── */}
        <div className="pdp__topbar d-flex align-items-center justify-content-between mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pdp__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Register</li>
            </ol>
          </nav>
                    <Link to="/" className="pdp__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back To Home
          </Link>
        </div>
        

        <div className="register-page__header">
          <h2 className="register-page__title">Create account</h2>
          <p className="register-page__subtitle">Please fill in your details to register</p>
        </div>

        <Row className="g-4 justify-content-center">
          <Col xs={12} lg={6}>
            <div className="register-page__form-card">
              
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  {/* Full Name */}
                  <Col xs={12}>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </Col>

                  {/* Mobile Number */}
                  <Col xs={12}>
                    <Form.Control
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      pattern="[0-9]{10,15}"
                      required
                    />
                  </Col>

                  {/* Email */}
                  <Col xs={12}>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                    />
                  </Col>

                  {/* Password */}
                  <Col xs={12}>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password (min. 6 characters)"
                      minLength={6}
                      required
                    />
                  </Col>

                  {/* Submit Button */}
                  <Col xs={12}>
                    <button 
                      type="submit" 
                      className="register-page__submit-btn mt-3 w-100"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default RegisterPage;