import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './ContactPage.scss';
import { API_BASE_URL } from '../../utils';

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.01l-2.2 2.21z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 4 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

const Spinner = () => <span className="cp-spinner" />;

// ── Main Component ─────────────────────────────────────────────────────────────
const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [focused, setFocused] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/contact`)
      .then((res) => {
        if (res.data?.success && res.data?.data) {
          setContactInfo(res.data.data);
        }
      })
      .catch(() => {
        setContactInfo({
          hotline: '+88 0177763 5373',
          email: 'info@klosetbd.com',
          address: '83 Bir Uttem, C R Dotto Road. Haiterpool Dhaka-1205, Bangladesh',
          businessHours: 'Sat-Thu: 10 AM - 9 PM, Fri: 2 PM - 9 PM'
        });
      })
      .finally(() => setInfoLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (alert) setAlert(null);
  };

  const handleFocus = (name) => setFocused((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocused((prev) => ({ ...prev, [name]: false }));

  const validate = () => {
    const { name, phone, email, subject, message } = form;
    if (!name.trim() || !phone.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setAlert({ type: 'error', text: 'Please fill in all required fields.' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAlert({ type: 'error', text: 'Please enter a valid email address.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v.trim()));

      const res = await axios.post(`${API_BASE_URL}/contact-message`, fd);
      const data = res.data;

      if (data?.success) {
        setAlert({
          type: 'success',
          text: data.message || "Message sent successfully! We'll be in touch soon.",
        });
        setForm({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        setAlert({ type: 'error', text: data?.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Network error. Please check your connection and try again.';
      setAlert({ type: 'error', text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pdp">
      <Container fluid="xl" className="py-4">
        {/* Breadcrumb + Back */}
        <div className="pdp__topbar d-flex align-items-center justify-content-between mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pdp__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Contact Us</li>
            </ol>
          </nav>
          <Link to="/" className="pdp__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back To Home
          </Link>
        </div>

        {/* Contact Content */}
        <div className="contact-page">
          {/* Header */}
          <div className="contact-header text-center mb-2">
            <p className="contact-eyebrow">Get in touch</p>
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="contact-divider mx-auto" />
          </div>

          {/* Grid */}
          <div className="contact-grid">
            {/* Left Column - Info Cards */}
            <div className="contact-info-column">
              {/* Visit Us */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <MapPinIcon />
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-title">Visit Us</h3>
                  <p className="contact-info-text">
                    {infoLoading ? 'Loading...' : (contactInfo?.address || 'BA - 64/3 South Badda, Dhaka - 1212')}
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <PhoneIcon />
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-title">Call Us</h3>
                  <p className="contact-info-text">
                    {infoLoading ? 'Loading...' : (contactInfo?.hotline || '+8801805759147')}
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <EmailIcon />
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-title">Email Us</h3>
                  <p className="contact-info-text">
                    {infoLoading ? 'Loading...' : (contactInfo?.email || 'allion.plus.agt@gmail.com')}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <ClockIcon />
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-title">Business Hours</h3>
                  <p className="contact-info-text">
                    {infoLoading ? 'Loading...' : (contactInfo?.businessHours || 'Sat-Thu: 10 AM - 9 PM\nFri: 2 PM - 9 PM')}
                  </p>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="contact-info-card">
                <div className="contact-info-content">
                  <h3 className="contact-info-title mb-3">Connect With Us</h3>
                  <div className="social-links">
                    <a href="#" className="social-link facebook" aria-label="Facebook">
                      <FacebookIcon />
                    </a>
                    <a href="#" className="social-link whatsapp" aria-label="WhatsApp">
                      <WhatsAppIcon />
                    </a>
                    <a href="#" className="social-link email" aria-label="Email">
                      <MailIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <div className="contact-form-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="contact-form-title">Send a Message</h2>
                  <p className="contact-form-subtitle">We typically respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">NAME <span className="required">*</span></label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      className={`form-input${focused.name ? ' focused' : ''}`}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PHONE</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                      className={`form-input${focused.phone ? ' focused' : ''}`}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">EMAIL <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className={`form-input${focused.email ? ' focused' : ''}`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">SUBJECT <span className="required">*</span></label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={() => handleBlur('subject')}
                    className={`form-input${focused.subject ? ' focused' : ''}`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">MESSAGE <span className="required">*</span></label>
                  <textarea
                    name="message"
                    placeholder="Tell us the details..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    className={`form-textarea${focused.message ? ' focused' : ''}`}
                    rows="3"
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {alert && (
                  <div className={`alert alert--${alert.type}`}>
                    {alert.type === 'success' ? <CheckIcon /> : <AlertIcon />}
                    <span>{alert.text}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ContactPage;