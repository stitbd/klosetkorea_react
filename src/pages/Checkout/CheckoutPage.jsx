import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Spinner, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG, API_BASE_URL } from '../../utils';
import { setAuth, getAuth } from '../../utils/auth';
import axios from 'axios';
import './CheckoutPage.scss';

// ── API endpoints ─────────────────────────────────────────────────────────────
const CHECKOUT_API    = `${API_BASE_URL}/checkout`;
const UPDATE_SHIP_API = `${API_BASE_URL}/update-shipping`;
const ORDER_SAVE_API  = `${API_BASE_URL}/order-save`;
const INVOICE_API     = `${API_BASE_URL}/orders/invoice`;
const SETTINGS_API    = `${API_BASE_URL}/general-settings`;
const PROFILE_API     = `${API_BASE_URL}/customer/profile`;
const ADDRESS_API     = `${API_BASE_URL}/address`;
// CHANGE 1: GET_DISTRICT_API — fetches districts by division_id
// GET /api/get-district?id=<division_id>  →  { success, data: { "1": "Dhaka", ... } }
const GET_DISTRICT_API = `${API_BASE_URL}/get-district`;

// ── Payment methods ───────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { value: 'Cash On Delivery', label: 'Cash on Delivery', icon: '💵' },
  { value: 'bKash',            label: 'bKash',            icon: '📱' },
  { value: 'Nagad',            label: 'Nagad',            icon: '📲' },
  { value: 'Card',             label: 'Card',             icon: '💳' },
];

// ── Eye icons ─────────────────────────────────────────────────────────────────
const EyeOpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeClosedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ── Blank customer form ───────────────────────────────────────────────────────
const BLANK_CUSTOMER = { name: '', phone: '', customerAddress: '' };

// ══════════════════════════════════════════════════════════════════════════════
//  CheckoutPage
// ══════════════════════════════════════════════════════════════════════════════
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart, couponData, clearCouponData } = useCartStore();

  // ── Auth state ────────────────────────────────────────────────────────────
  const [isLoggedIn,   setIsLoggedIn]   = useState(false);
  const [sessionToken, setSessionToken] = useState(null);

  // ── Login modal ───────────────────────────────────────────────────────────
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData,      setLoginData]      = useState({ phone: '', password: '' });
  const [showPass,       setShowPass]       = useState(false);
  const [rememberMe,     setRememberMe]     = useState(false);
  const [loginLoading,   setLoginLoading]   = useState(false);
  const [loginError,     setLoginError]     = useState('');
  const [loginSuccess,   setLoginSuccess]   = useState('');

  // ── Coupon / pricing ──────────────────────────────────────────────────────
  const cartSubtotal   = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const couponSubtotal = couponData?.subtotal  ?? cartSubtotal;
  const couponDiscount = couponData?.discount  ?? 0;
  const appliedCoupon  = couponData?.coupon    ?? null;
  const couponId       = couponData?.coupon_id ?? null;

  // ── Shipping ──────────────────────────────────────────────────────────────
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipId,  setSelectedShipId]  = useState('');
  const [shippingAmount,  setShippingAmount]  = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [fetchingOptions, setFetchingOptions] = useState(true);

  // ── Saved addresses ───────────────────────────────────────────────────────
  const [savedAddresses,      setSavedAddresses]      = useState([]);
  const [selectedAddressId,   setSelectedAddressId]   = useState('');
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // CHANGE 2: Renamed area→district, added division states
  // OLD: districts[], areas[], selectedDistrict, selectedAreaId
  // NEW: divisions[], districts[], selectedDivisionId, selectedDivisionName, selectedDistrict
  const [divisions,           setDivisions]           = useState([]);
  const [districts,           setDistricts]           = useState([]);
  const [selectedDivisionId,  setSelectedDivisionId]  = useState('');
  const [selectedDivisionName,setSelectedDivisionName]= useState('');
  const [selectedDistrict,    setSelectedDistrict]    = useState('');
  const [loadingAddress,      setLoadingAddress]      = useState(false);
  const [loadingDistricts,    setLoadingDistricts]    = useState(false);

  // ── Customer info ─────────────────────────────────────────────────────────
  const [customerForm,      setCustomerForm]      = useState(BLANK_CUSTOMER);
  const [sameAsCustomer,    setSameAsCustomer]    = useState(false);
  const [deliveryAddress,   setDeliveryAddress]   = useState('');

  // ── Subscribe ─────────────────────────────────────────────────────────────
  const [subscribeEmail,  setSubscribeEmail]  = useState('');
  const [subscribeToNews, setSubscribeToNews] = useState(false);

  // ── Other ─────────────────────────────────────────────────────────────────
  const [note,       setNote]       = useState('');
  const [payment,    setPayment]    = useState('Cash On Delivery');
  const [agreed,     setAgreed]     = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isPlacing,  setIsPlacing]  = useState(false);

  // ── Order success state ───────────────────────────────────────────────────
  const [placedOrderData, setPlacedOrderData] = useState(null);

  const grandTotal = couponSubtotal - couponDiscount + shippingAmount;

  // ── Resolve active token ──────────────────────────────────────────────────
  const getActiveToken = useCallback(() => {
    if (sessionToken) return sessionToken;
    const { token } = getAuth();
    return token ?? null;
  }, [sessionToken]);

  // ── Fill customer form from profile API ──────────────────────────────────
  // NOTE: customerAddress is NOT set here — set by fetchAddressData from default_address
  const fillFromProfile = useCallback(async (token) => {
    if (!token) return;
    try {
      const res  = await fetch(PROFILE_API, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        const p = data.data;
        setCustomerForm((prev) => ({
          ...prev,
          name:  p.name  || prev.name,
          phone: p.phone || prev.phone,
        }));
      }
    } catch (err) {
      console.error('Profile API error:', err);
    }
  }, []);

  // CHANGE 3: fetchAddressData — now loads divisions (not districts+areas).
  // Also fills Customer Address from default_address as "address, district, division"
  // for logged-in. Works for both guest (divisions only) and logged-in.
  const fetchAddressData = useCallback(async (token) => {
    setLoadingAddress(true);
    try {
      const headers = { Accept: 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res  = await fetch(ADDRESS_API, { headers });
      const data = await res.json();
      if (data.status && data.data) {
        const { divisions: div, default_address } = data.data;

        // Always set divisions (guest + logged-in)
        if (Array.isArray(div)) setDivisions(div);

        // Logged-in only: fill Customer Address from default_address
        // Format: "address, district, division"
        if (token && default_address) {
          const parts = [
            default_address.address,
            default_address.district,
            default_address.division,
          ].filter(Boolean);
          if (parts.length > 0) {
            setCustomerForm((prev) => ({
              ...prev,
              customerAddress: parts.join(', '),
            }));
          }
        }
      }
    } catch (err) {
      console.error('Address API error:', err);
    } finally {
      setLoadingAddress(false);
    }
  }, []);

  // CHANGE 4: fetchDistrictsByDivision — replaces old fetchAreasByDistrict.
  // Called when Division dropdown changes (guest + logged-in).
  // GET /api/get-district?id=<division_id>
  // Response: { success, data: { "1": "Dhaka", "2": "Faridpur", ... } }
  const fetchDistrictsByDivision = useCallback(async (divisionId) => {
    if (!divisionId) { setDistricts([]); setSelectedDistrict(''); return; }
    setLoadingDistricts(true);
    setSelectedDistrict('');
    try {
      const res  = await fetch(`${GET_DISTRICT_API}?id=${encodeURIComponent(divisionId)}`);
      const data = await res.json();
      if (data.success && data.data) {
        // Convert { "1": "Dhaka", "2": "Faridpur" } → [{ id: "1", name: "Dhaka" }, ...]
        const list = Object.entries(data.data).map(([id, name]) => ({
          id: String(id),
          name: String(name),
        }));
        setDistricts(list);
      } else {
        setDistricts([]);
      }
    } catch (err) {
      console.error('Get districts by division error:', err);
      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  }, []);

  // ── Fetch checkout API — shipping options + saved addresses ───────────────
  const fetchCheckoutData = useCallback(async (token) => {
    setFetchingOptions(true);
    try {
      const headers = { Accept: 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res  = await fetch(CHECKOUT_API, { headers });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.shippingcharge)) setShippingOptions(data.shippingcharge);
        if (token && Array.isArray(data.allAddresses)) setSavedAddresses(data.allAddresses);
      }
    } catch (err) {
      console.error('Checkout API error:', err);
    } finally {
      setFetchingOptions(false);
    }
  }, []);

  // ── On mount ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const { token, isAuthenticated } = getAuth();
    if (isAuthenticated && token) {
      setIsLoggedIn(true);
      setSessionToken(token);
      fillFromProfile(token);
      fetchCheckoutData(token);
      fetchAddressData(token);
    } else {
      fetchCheckoutData(null);
      fetchAddressData(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync delivery address when "same as customer" checked ────────────────
  useEffect(() => {
    if (sameAsCustomer) {
      setDeliveryAddress(customerForm.customerAddress);
      setFormErrors((p) => ({ ...p, deliveryAddress: '' }));
    }
  }, [sameAsCustomer, customerForm.customerAddress]);

  // ── Shipping select ───────────────────────────────────────────────────────
  const handleShippingSelect = useCallback(async (shipId) => {
    setSelectedShipId(shipId);
    if (!shipId) { setShippingAmount(0); return; }
    setLoadingShipping(true);
    try {
      const token   = getActiveToken();
      const headers = { Accept: 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res  = await fetch(`${UPDATE_SHIP_API}?area_id=${shipId}`, { method: 'POST', headers });
      const data = await res.json();
      if (data.success) setShippingAmount(Number(data.shipping_amount ?? 0));
    } catch (err) {
      console.error('Shipping amount error:', err);
    } finally {
      setLoadingShipping(false);
    }
  }, [getActiveToken]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((f) => ({ ...f, [name]: value }));
    if (formErrors[name]) setFormErrors((p) => ({ ...p, [name]: '' }));
  };

  // ── Handle saved address selection ───────────────────────────────────────
  const handleSavedAddressSelect = (addr) => {
    setSelectedAddressId(String(addr.id));
    setDeliveryAddress(addr.address);
    setSameAsCustomer(false);
    setShowAddressDropdown(false);
    if (formErrors.deliveryAddress) setFormErrors((p) => ({ ...p, deliveryAddress: '' }));
    const matchingShip = shippingOptions.find((o) => String(o.id) === String(addr.area_id));
    if (matchingShip) handleShippingSelect(String(matchingShip.id));
  };

  // ── Login submit ──────────────────────────────────────────────────────────
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    if (!loginData.phone.trim())    { setLoginError('Please enter your phone number.'); return; }
    if (!loginData.password.trim()) { setLoginError('Please enter your password.');    return; }

    setLoginLoading(true);
    try {
      const API      = import.meta.env.VITE_API_URL;
      const formData = new FormData();
      formData.append('phone',    loginData.phone.trim());
      formData.append('password', loginData.password);

      const res = await axios.post(`${API}/customer/login`, formData, {
        headers: { Accept: 'application/json' },
      });

      if (res.data.success) {
        const { token: newToken, data } = res.data;
        const userData = {
          id: data.id, name: data.name, phone: data.phone,
          email: data.email, address: data.address,
          district: data.district, area: data.area, slug: data.slug,
        };

        setAuth(newToken, userData, rememberMe);
        useCartStore.setState({ token: newToken, auth: { token: newToken, ...userData }, user: userData });
        setSessionToken(newToken);
        setIsLoggedIn(true);
        setLoginSuccess('Login successful!');

        // Reset division/district on login
        setSelectedDivisionId('');
        setSelectedDivisionName('');
        setSelectedDistrict('');
        setDistricts([]);

        setTimeout(() => { setShowLoginModal(false); setLoginSuccess(''); }, 800);

        await fillFromProfile(newToken);
        await fetchCheckoutData(newToken);
        await fetchAddressData(newToken);

      } else {
        setLoginError(res.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 422) {
        setLoginError('Invalid phone number or password.');
      } else if (err.response?.data?.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError('Something went wrong. Please try again.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const openLoginModal = () => {
    setLoginData({ phone: '', password: '' });
    setShowPass(false);
    setRememberMe(false);
    setLoginError('');
    setLoginSuccess('');
    setShowLoginModal(true);
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!customerForm.name.trim())  errors.name  = 'Full name is required';
    if (!customerForm.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^01[3-9]\d{8}$/.test(customerForm.phone.trim()))
      errors.phone = 'Enter a valid Bangladeshi phone number';

    if (isLoggedIn && !customerForm.customerAddress.trim()) {
      errors.customerAddress = 'Customer address is required';
    }

    if (!sameAsCustomer && !deliveryAddress.trim()) errors.deliveryAddress = 'Delivery address is required';
    if (!selectedShipId) errors.shipping = 'Please select a delivery area';
    if (!agreed)         errors.agreed   = 'You must agree to the terms and conditions';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ─────────────────────────────────────────────
  // Place Order
  // ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isPlacing) return;

    setIsPlacing(true);

    const finalDeliveryAddress = sameAsCustomer
      ? customerForm.customerAddress
      : deliveryAddress;

    const token = isLoggedIn ? getActiveToken() : null;

    try {
      // CHANGE 5: payload now sends "division" (name string) instead of "area" (id).
      // "area" field removed, "division" field added.
      const payload = {
        name: customerForm.name.trim(),
        phone: customerForm.phone.trim(),
        address: finalDeliveryAddress.trim(),

        shipping_area: Number(selectedShipId),
        ...(selectedDivisionName ? { division: selectedDivisionName } : {}),
        ...(selectedDistrict     ? { district: selectedDistrict }     : {}),
        payment_method: payment,

        subtotal: Number(couponSubtotal),
        discount: Number(couponDiscount),
        shippingfee: Number(shippingAmount),

        ...(couponId       ? { coupon_id:   couponId }                    : {}),
        ...(appliedCoupon  ? { coupon_code: appliedCoupon }               : {}),
        ...(subscribeToNews && subscribeEmail.trim()
                           ? { subscribe_email: subscribeEmail.trim() }   : {}),

        cartItems: items.map((item) => ({
          slug: item.slug ?? item.name,
          image: item.image ?? '',
          purchase_price: Number(item.purchase_price ?? item.price ?? 0),

          old_price: Number(item.originalPrice ?? item.price ?? 0),
          new_price: Number(item.price ?? 0),

          product_discount: Number(item.product_discount ?? 0),

          product_size:
            item.variant?.size?.sizeName ??
            item.variant?.sizeName ??
            null,

          product_size_id:
            item.variant?.size?.id ??
            item.variant?.size_id ??
            null,

          product_color:
            item.variant?.color?.colorName ??
            item.variant?.colorName ??
            null,

          product_color_id:
            item.variant?.color?.id ??
            item.variant?.color_id ??
            null,

          pro_unit: item.pro_unit ?? null,
          product_id: Number(item.id),
          qty: Number(item.quantity),

          item_discount:
            couponDiscount > 0 && couponSubtotal > 0
              ? Math.round(
                  ((item.price * item.quantity) / couponSubtotal) *
                    couponDiscount
                )
              : 0,

              ...(appliedCoupon ? { applied_coupon: appliedCoupon } : {}),
        })),
      };

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(ORDER_SAVE_API, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response from server.");
      }

      console.log("Order-save response:", JSON.stringify(data)); // debug — remove after fix

      const isSuccess =
        data.status === true ||
        data.status === "true" ||
        data.status === 1 ||
        !!(data.data && data.data.id);

      if (isSuccess) {
        clearCart();
        clearCouponData?.();

        setPlacedOrderData({
          ...data.data,
          _isLoggedIn: isLoggedIn,
          _customerName: customerForm.name.trim(),
          _customerPhone: customerForm.phone.trim(),
          _customerAddress: isLoggedIn ? customerForm.customerAddress.trim() : null,
          _deliveryAddress: finalDeliveryAddress.trim(),
          _selectedDivision: selectedDivisionName || null,
          _selectedDistrict: selectedDistrict || null,
          _paymentMethod: payment,
          _couponCode: appliedCoupon ?? "",
          _couponDiscount: Number(couponDiscount),
          _subtotal: Number(couponSubtotal),
          _shippingAmount: Number(shippingAmount),
        });
      } else {
        console.error("Order failed response:", JSON.stringify(data));
        let msg = 'Order placement failed. Please try again.';
        if (data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
          msg = Object.values(data.errors).flat().join(', ');
        } else if (data.message) {
          msg = data.message;
        } else if (data.error) {
          msg = data.error;
        }
        alert(msg);
      }
    } catch (error) {
      console.error("Order Save Error:", error?.message || error);
      alert(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  // ── Guards ────────────────────────────────────────────────────────────────
  if (placedOrderData) {
    return <InvoicePage orderData={placedOrderData} token={getActiveToken()} />;
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <Container className="py-5 text-center">
          <div className="checkout-page__empty">
            <p style={{ fontSize: '3rem' }}>🛒</p>
            <h4>Your cart is empty</h4>
            <Link to="/" className="checkout-page__back-btn mt-3 d-inline-block">← Continue Shopping</Link>
          </div>
        </Container>
      </main>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <main className="checkout-page">
      <Container fluid="xl" className="py-4">
        <h2 className="checkout-page__title mb-4">Checkout</h2>

        <Row className="g-4">

          {/* ════ LEFT: Delivery Form ════ */}
          <Col xs={12} lg={7}>
            <div className="checkout-page__form-card">

              {/* Contact header + Login button */}
              <Row className="g-3 align-items-center">
                <Col xs={6}>
                  <h5 className="checkout-page__form-title mb-3 mt-4">Contact</h5>
                </Col>
                <Col xs={6} className="text-end">
                  {isLoggedIn ? (
                    <span className="checkout-page__logged-badge">✅ Logged in</span>
                  ) : (
                    <button type="button" className="checkout-page__login-btn" onClick={openLoginModal}>
                      Login
                    </button>
                  )}
                </Col>
              </Row>

              {/* Subscribe email */}
              <Form noValidate autoComplete="off">
                <Row className="g-3">
                  <Col xs={12}>
                    <Form.Control
                      name="subscribe_email"
                      type="email"
                      placeholder="Write your email here to receive news and offers"
                      className="checkout-page__input"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      disabled={isPlacing || !subscribeToNews}
                      autoComplete="email"
                    />
                  </Col>
                  <Col xs={12}>
                    <div className="checkout-page__delivery-address-header">
                      <label className="checkout-page__same-check-label">
                        <input
                          type="checkbox"
                          checked={subscribeToNews}
                          onChange={(e) => setSubscribeToNews(e.target.checked)}
                          disabled={isPlacing}
                        />
                        <span>Email me with news and offers</span>
                      </label>
                    </div>
                  </Col>
                </Row>
              </Form>

              <h5 className="checkout-page__form-title mb-3 mt-4">Delivery Information</h5>

              <Form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Row className="g-3">

                  {/* Name */}
                  <Col sm={6}>
                    <Form.Control
                      name="name"
                      value={customerForm.name}
                      onChange={handleCustomerChange}
                      placeholder="Full Name *"
                      required
                      isInvalid={!!formErrors.name}
                      disabled={isPlacing}
                      className="checkout-page__input"
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
                  </Col>

                  {/* Phone */}
                  <Col sm={6}>
                    <Form.Control
                      name="phone"
                      value={customerForm.phone}
                      onChange={handleCustomerChange}
                      placeholder="Phone Number *"
                      type="tel"
                      required
                      isInvalid={!!formErrors.phone}
                      disabled={isPlacing}
                      className="checkout-page__input"
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
                  </Col>

                  {/* Customer Address — only shown when logged in */}
                  {isLoggedIn && (
                    <Col xs={12}>
                      <Form.Label className="checkout-page__field-label">
                        Customer Address <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        name="customerAddress"
                        value={customerForm.customerAddress}
                        onChange={handleCustomerChange}
                        placeholder="Your home / permanent address *"
                        required
                        isInvalid={!!formErrors.customerAddress}
                        disabled={isPlacing}
                        className="checkout-page__input"
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.customerAddress}</Form.Control.Feedback>
                    </Col>
                  )}

                  {/* Delivery Address */}
                  <Col xs={12}>
                    <div className="checkout-page__delivery-address-header">
                      <Form.Label className="checkout-page__field-label mb-0">
                        Delivery Address <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        {/* Saved addresses dropdown — only for logged-in */}
                        {isLoggedIn && savedAddresses.length > 0 && (
                          <div style={{ position: 'relative' }}>
                            <button
                              type="button"
                              className="checkout-page__office-toggle-btn"
                              style={{ padding: '4px 12px', fontSize: '0.8rem', border: '1.5px solid #c8102e', color: '#c8102e', background: '#fff5f5', borderRadius: '6px', width: 'auto' }}
                              onClick={() => setShowAddressDropdown((v) => !v)}
                              disabled={isPlacing || sameAsCustomer}
                            >
                              📍 Saved Addresses <span style={{ marginLeft: '2px', fontSize: '0.7em' }}>▼</span>
                            </button>
                            {showAddressDropdown && (
                              <div className="checkout-page__address-dropdown">
                                {savedAddresses.map((addr) => (
                                  <button
                                    key={addr.id}
                                    type="button"
                                    className={`checkout-page__address-option${String(selectedAddressId) === String(addr.id) ? ' checkout-page__address-option--active' : ''}`}
                                    onClick={() => handleSavedAddressSelect(addr)}
                                  >
                                    <span className="checkout-page__address-option-title">{addr.address_title}</span>
                                    <span className="checkout-page__address-option-text">{addr.address} — {addr.district}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        {/* Same as Customer Address — only for logged-in */}
                        {isLoggedIn && (
                          <label className="checkout-page__same-check-label">
                            <input
                              type="checkbox"
                              checked={sameAsCustomer}
                              onChange={(e) => {
                                setSameAsCustomer(e.target.checked);
                                if (e.target.checked) {
                                  setSelectedAddressId('');
                                  setFormErrors((p) => ({ ...p, deliveryAddress: '' }));
                                }
                              }}
                              disabled={isPlacing}
                            />
                            <span>Same as Customer Address</span>
                          </label>
                        )}
                      </div>
                    </div>
                    <Form.Control
                      value={sameAsCustomer ? customerForm.customerAddress : deliveryAddress}
                      onChange={(e) => {
                        if (!sameAsCustomer) {
                          setDeliveryAddress(e.target.value);
                          setSelectedAddressId('');
                          if (formErrors.deliveryAddress) setFormErrors((p) => ({ ...p, deliveryAddress: '' }));
                        }
                      }}
                      placeholder="Delivery address (where to ship) *"
                      disabled={(isLoggedIn && sameAsCustomer) || isPlacing}
                      isInvalid={!!formErrors.deliveryAddress}
                      className={`checkout-page__input${(isLoggedIn && sameAsCustomer) ? ' checkout-page__input--disabled' : ''}`}
                      autoComplete="off"
                    />
                    {formErrors.deliveryAddress && (
                      <div className="invalid-feedback d-block">{formErrors.deliveryAddress}</div>
                    )}
                  </Col>

                  {/* CHANGE 7: Division dropdown — replaces old "District" dropdown.
                      Visible always (guest + logged-in), hidden when sameAsCustomer.
                      On change: calls fetchDistrictsByDivision(division.id) */}
                  {!sameAsCustomer && (
                    <Col sm={6}>
                      <Form.Label className="checkout-page__field-label">Division</Form.Label>
                      {loadingAddress ? (
                        <div className="d-flex align-items-center gap-2 text-muted" style={{ padding: '10px 0' }}>
                          <Spinner size="sm" /> Loading...
                        </div>
                      ) : (
                        <Form.Select
                          value={selectedDivisionId}
                          onChange={(e) => {
                            const divId   = e.target.value;
                            const divObj  = divisions.find((d) => String(d.id) === String(divId));
                            const divName = divObj?.name ?? '';
                            setSelectedDivisionId(divId);
                            setSelectedDivisionName(divName);
                            // Fetch districts for this division
                            fetchDistrictsByDivision(divId);
                          }}
                          disabled={isPlacing}
                          className="checkout-page__input"
                        >
                          <option value="">Select Division</option>
                          {divisions.map((d) => (
                            <option key={d.id} value={String(d.id)}>{d.name}</option>
                          ))}
                        </Form.Select>
                      )}
                    </Col>
                  )}

                  {/* CHANGE 8: District dropdown — loads after Division is selected.
                      Replaces old "Area" dropdown. Hidden when sameAsCustomer. */}
                  {!sameAsCustomer && (
                    <Col sm={6}>
                      <Form.Label className="checkout-page__field-label">District</Form.Label>
                      {loadingDistricts ? (
                        <div className="d-flex align-items-center gap-2 text-muted" style={{ padding: '10px 0' }}>
                          <Spinner size="sm" /> Loading...
                        </div>
                      ) : (
                        <Form.Select
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          disabled={isPlacing || !selectedDivisionId}
                          className="checkout-page__input"
                        >
                          <option value="">
                            {selectedDivisionId ? 'Select District' : 'Select Division first'}
                          </option>
                          {districts.map((d) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </Form.Select>
                      )}
                    </Col>
                  )}

                  {/* Delivery Area (Shipping fee selector) */}
                  <Col xs={12}>
                    <Form.Label className="checkout-page__field-label">
                      Delivery Area <span className="text-danger">*</span>
                    </Form.Label>
                    {fetchingOptions ? (
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <Spinner size="sm" /> Loading delivery options...
                      </div>
                    ) : (
                      <Form.Select
                        value={selectedShipId}
                        onChange={(e) => handleShippingSelect(e.target.value)}
                        required
                        isInvalid={!!formErrors.shipping}
                        disabled={isPlacing}
                        className="checkout-page__input"
                      >
                        <option value="">Select Delivery Area *</option>
                        {shippingOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                        ))}
                      </Form.Select>
                    )}
                    {formErrors.shipping && (
                      <div className="invalid-feedback d-block">{formErrors.shipping}</div>
                    )}
                  </Col>

                  {/* Order Note */}
                  <Col xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Order Note (optional)"
                      disabled={isPlacing}
                      className="checkout-page__input"
                      autoComplete="off"
                    />
                  </Col>
                </Row>

                {/* Payment Method */}
                <h5 className="checkout-page__section-title mt-4">Payment Method</h5>
                <div className="payment-methods">
                  {PAYMENT_METHODS.map((m) => (
                    <label key={m.value} className={`payment-card ${payment === m.value ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={m.value}
                        checked={payment === m.value}
                        onChange={(e) => setPayment(e.target.value)}
                        disabled={isPlacing}
                      />
                      <div className="payment-card__content">
                        <span className="payment-card__icon">{m.icon}</span>
                        <span className="payment-card__label">{m.label}</span>
                      </div>
                      <span className="payment-card__check">{payment === m.value && '✔'}</span>
                    </label>
                  ))}
                </div>

                {/* Terms */}
                <Form.Group className="checkout-page__agreement mt-3">
                  <Form.Check
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (formErrors.agreed) setFormErrors((p) => ({ ...p, agreed: '' }));
                    }}
                    required
                    isInvalid={!!formErrors.agreed}
                    disabled={isPlacing}
                    label={
                      <>
                        I have read and agree to the{' '}
                        <Link to="/terms-conditions" target="_blank" className="checkout-page__policy-link">Terms &amp; Conditions</Link>,{' '}
                        <Link to="/returns"          target="_blank" className="checkout-page__policy-link">Refund Policy</Link> and{' '}
                        <Link to="/privacy-policy"   target="_blank" className="checkout-page__policy-link">Privacy Policy</Link>.
                      </>
                    }
                  />
                  {formErrors.agreed && (
                    <div className="invalid-feedback d-block">{formErrors.agreed}</div>
                  )}
                </Form.Group>

                {/* Submit */}
                <button
                  className="checkout-page__submit-btn mt-4"
                  type="submit"
                  disabled={isPlacing || !agreed || !selectedShipId}
                >
                  {isPlacing
                    ? <><Spinner size="sm" className="me-2" />Placing Order...</>
                    : 'Place Order →'
                  }
                </button>
              </Form>
            </div>
          </Col>

          {/* ════ RIGHT: Order Summary ════ */}
          <Col xs={12} lg={5}>
            <div className="checkout-page__summary">
              <h5>Order Summary</h5>
              <div className="checkout-page__items-list">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant?.id ?? 'nv'}`} className="checkout-page__summary-item">
                    <div className="d-flex align-items-center gap-2 flex-1 min-w-0">
                      <img
                        src={item.image || PLACEHOLDER_IMG}
                        alt={item.name}
                        className="checkout-page__item-thumb"
                        onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                      />
                      <div className="min-w-0">
                        <p className="checkout-page__item-name mb-0 text-truncate">{item.name}</p>
                        {item.variant && (
                          <p className="checkout-page__item-variant mb-0">
                            {[item.variant?.color?.colorName, item.variant?.size?.sizeName].filter(Boolean).join(' / ')}
                          </p>
                        )}
                        <p className="checkout-page__item-qty mb-0">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="checkout-page__item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="checkout-page__price-row">
                <span>Subtotal</span><span>{formatPrice(couponSubtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="checkout-page__price-row invoice-doc__total-row--discount">
                  <span>Coupon {appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="checkout-page__price-row">
                <span>Delivery Charge</span>
                <span>
                  {loadingShipping
                    ? <Spinner size="sm" />
                    : selectedShipId
                      ? formatPrice(shippingAmount)
                      : <span className="text-muted" style={{ fontSize: '0.82rem' }}>—</span>
                  }
                </span>
              </div>
              <hr />
              <div className="checkout-page__price-row checkout-page__price-row--grand">
                <span>Total</span><span>{formatPrice(grandTotal)}</span>
              </div>
              {!selectedShipId && (
                <p className="text-muted mt-1" style={{ fontSize: '0.78rem' }}>
                  * Delivery Charge will be added after area selection
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* ── Login Modal ── */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
        backdrop="static"
        className="login-popup-modal"
      >
        <Modal.Header closeButton className="login-popup-modal__header">
          <Modal.Title className="login-popup-modal__title">Login to My Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="login-popup-modal__body">
          {loginError && (
            <div className="login-popup-modal__alert login-popup-modal__alert--error" role="alert">
              {loginError}
            </div>
          )}
          {loginSuccess && (
            <div className="login-popup-modal__alert login-popup-modal__alert--success" role="alert">
              {loginSuccess}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} noValidate autoComplete="off">
            <div className="login-popup-modal__field">
              <label className="login-popup-modal__label">Mobile Number</label>
              <input
                type="tel"
                placeholder="e.g. 01886 899103"
                className="login-popup-modal__input"
                value={loginData.phone}
                onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                disabled={loginLoading}
                autoComplete="off"
              />
            </div>

            <div className="login-popup-modal__field">
              <label className="login-popup-modal__label">Password</label>
              <div className="login-popup-modal__input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Write your password"
                  className="login-popup-modal__input"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  disabled={loginLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="login-popup-modal__eye"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  disabled={loginLoading}
                >
                  {showPass ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </div>

            <div className="login-popup-modal__remember">
              <label className="login-popup-modal__remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loginLoading}
                />
                <span> Remember me</span>
              </label>
            </div>

            <button type="submit" className="login-popup-modal__btn" disabled={loginLoading}>
              {loginLoading
                ? <span className="login-popup-modal__spinner" aria-label="Logging in…" />
                : 'Login'
              }
            </button>

            <div className="login-popup-modal__forgot">
              <Link to="/forgot-password" onClick={() => setShowLoginModal(false)}>Forgot Password?</Link>
            </div>
          </form>

          <div className="login-popup-modal__meta">
            <span>New customer?</span>
            <Link to="/register" onClick={() => setShowLoginModal(false)}> Create your account</Link>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  InvoicePage
// ══════════════════════════════════════════════════════════════════════════════
export const InvoicePage = ({ orderData, token }) => {
  const navigate = useNavigate();

  const [invoice,  setInvoice]  = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const orderId = orderData?.id;

  const isLoggedInOrder = orderData?._isLoggedIn ?? !!orderData?.customer?.id;

  useEffect(() => {
    if (!orderId) { setError('Order ID not found.'); setLoading(false); return; }

    const load = async () => {
      try {
        const headers = { Accept: 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const [invRes, setRes] = await Promise.all([
          fetch(`${INVOICE_API}?id=${orderId}`, { headers }),
          fetch(SETTINGS_API, { headers: { Accept: 'application/json' } }),
        ]);

        const invData = await invRes.json();
        const setData = await setRes.json();

        if ((invData.status || invData.success) && invData.data) {
          setInvoice(invData.data);
        } else {
          setInvoice(orderData);
        }

        if (setData.success && setData.data?.data) {
          setSettings({ ...setData.data.data, contact: setData.data.contact });
        }
      } catch {
        setInvoice(orderData);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orderId, token, orderData]);

  useEffect(() => {
    if (!invoice) return;
    const timer = setTimeout(() => navigate('/'), 30000);
    return () => clearTimeout(timer);
  }, [invoice, navigate]);

  if (loading) {
    return (
      <main className="checkout-page invoice-page">
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#c8102e' }} />
          <p className="mt-3 text-muted">Generating your invoice...</p>
        </Container>
      </main>
    );
  }

  if (error && !invoice) {
    return (
      <main className="checkout-page invoice-page">
        <Container className="py-5 text-center">
          <p className="text-danger">{error}</p>
          <Link to="/" className="checkout-page__back-btn mt-3 d-inline-block">← Continue Shopping</Link>
        </Container>
      </main>
    );
  }

  const { orderdetails = [] } = invoice;

  const orderDate = invoice.created_at
    ? new Date(invoice.created_at).toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric' });

  const hasSnapshot = orderData?._subtotal !== undefined;

  const subtotalAmt = Number(invoice.amount ?? orderData?._subtotal ?? 0);

  const discountAmt = Number(invoice.coupon_discount ?? orderData?._couponDiscount ?? 0);
  
  const shippingAmt = Number(invoice.shipping_charge ?? orderData?._shippingAmount ?? 0);
  
  const grandAmt    = Number(invoice.final_amount ?? (subtotalAmt - discountAmt + shippingAmt));
  
  const paidAmt     = Number(invoice.paid_amount ?? 0);
  const dueAmt      = Number(invoice.due_amount ?? (grandAmt - paidAmt));

  const paymentMethod = invoice.payment?.payment_method
    ?? invoice.payment_method
    ?? orderData?._paymentMethod
    ?? 'Cash On Delivery';

  const customerName = orderData?._customerName
    || invoice.shipping?.name
    || invoice.customer?.name
    || invoice.name
    || 'Customer';

  const customerPhone = orderData?._customerPhone
    || invoice.shipping?.phone
    || invoice.customer?.phone
    || invoice.phone
    || '—';

  // Customer Address:
  // _customerAddress snapshot was already built as "address, district, division" at order time.
  // Use it directly — do NOT append district/division again (they're already included).
  // Only build from invoice API when viewing an old invoice without a snapshot.
  const customerAddressDisplay = orderData?._customerAddress
    ? orderData._customerAddress
    : (() => {
        const raw      = invoice.customer?.address || null;
        const district = invoice.customer?.district || null;
        const division = invoice.customer?.division?.name || null;
        return raw ? [raw, district, division].filter(Boolean).join(', ') : null;
      })();

  // CHANGE 10: Shipping/Delivery Address — "address, district, division" from invoice API
  // invoice.shipping has: address, district, division (string)
  const shipAddrRaw  = orderData?._deliveryAddress || invoice.shipping?.address || invoice.address || '—';
  const shipDistrict = orderData?._selectedDistrict || invoice.shipping?.district || null;
  const shipDivision = orderData?._selectedDivision || invoice.shipping?.division  || null;
  const shippingAddressDisplay = [shipAddrRaw, shipDistrict, shipDivision].filter(Boolean).join(', ') || '—';

  const couponCode = orderData?._couponCode || invoice.coupon_code || null;

  const siteName    = settings?.name                                        || 'Kloset Korea';
  const siteAddress = settings?.contact?.address                            || '83 Bir Uttem, C R Dotto Road. Haiterpool Dhaka-1205, Bangladesh';
  const sitePhone   = settings?.contact?.hotline || settings?.contact?.phone || '+88 0177763 5373';
  const siteEmail   = settings?.contact?.hotmail || settings?.contact?.email || 'info@klosetbd.com';
  const logoPath    = settings?.dark_logo        || settings?.white_logo    || null;
  const logoUrl     = logoPath ? `https://admin.klosetbd.com/${logoPath}`  : null;

  const invoiceNo = invoice.invoice_id ?? orderId;

  const showCustomerAddress = isLoggedInOrder && !!customerAddressDisplay;
  const addressesAreSame    = showCustomerAddress &&
    customerAddressDisplay.trim().toLowerCase() === shippingAddressDisplay.trim().toLowerCase();

  return (
    <main className="checkout-page invoice-page">

      <div className="invoice-action-bar no-print">
        <Container fluid="xl">
          <div className="invoice-action-bar__inner">
            <div className="invoice-action-bar__left">
              <span className="invoice-action-bar__badge">✅ Order Placed Successfully!</span>
              <span className="invoice-action-bar__subtext">
                Invoice #{invoiceNo} · {orderDate}
              </span>
            </div>
            <div className="invoice-action-bar__btns">
              <button className="inv-btn inv-btn--print" onClick={() => window.print()}>🖨️ Print Invoice</button>
              <button className="inv-btn inv-btn--pdf"   onClick={() => window.print()}>📄 Download PDF</button>
              <Link to="/" className="inv-btn inv-btn--continue">🛒 Continue Shopping</Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-4 invoice-print-container" id="invoice-root">
        <div className="invoice-doc">

          <div className="invoice-doc__header">
            <div className="invoice-doc__brand">
              {logoUrl
                ? <img src={logoUrl} alt={siteName} className="invoice-doc__logo" />
                : <h2 className="invoice-doc__brand-name">Kloset Korea</h2>
              }
              <div className="invoice-doc__brand-info">
                <p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#000" style={{ marginRight: '6px' }}>
                    <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
                  </svg>
                  {sitePhone}
                </p>
                <p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#000" style={{ marginRight: '6px' }}>
                    <path d="M20 4H4a2 2 0 00-2 2v.01l10 6.99 10-6.99V6a2 2 0 00-2-2zm0 4.24l-8 5.6-8-5.6V18a2 2 0 002 2h12a2 2 0 002-2V8.24z"/>
                  </svg>
                  {siteEmail}
                </p>
                <p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#000" style={{ marginRight: '6px' }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"/>
                  </svg>
                  {siteAddress}
                </p>
              </div>
            </div>
            <div className="invoice-doc__meta">
              <h1 className="invoice-doc__title">INVOICE</h1>
              <table className="invoice-doc__meta-table">
                <tbody>
                  <tr><td>Invoice No:</td><td><strong>#{invoiceNo}</strong></td></tr>
                  <tr><td>Date:</td>      <td><strong>{orderDate}</strong></td></tr>
                  <tr><td>Payment:</td>   <td><strong>{paymentMethod}</strong></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="invoice-doc__divider" />

          <div className="invoice-doc__parties">
            {!showCustomerAddress ? (
              /* GUEST: Delivery Info only — address + district + division */
              <div className="invoice-doc__bill-to">
                <h6 className="invoice-doc__section-label">Delivery Info</h6>
                <p className="invoice-doc__customer-name">{customerName}</p>
                <p>{customerPhone}</p>
                <p>{shippingAddressDisplay}</p>
                {couponCode && (
                  <p className="invoice-doc__coupon-tag">🏷️ Coupon: <strong>{couponCode}</strong></p>
                )}
              </div>
            ) : addressesAreSame ? (
              /* LOGGED-IN, same address */
              <div className="invoice-doc__bill-to">
                <h6 className="invoice-doc__section-label">Customer Info</h6>
                <p className="invoice-doc__customer-name">{customerName}</p>
                <p>{customerPhone}</p>
                <p>{customerAddressDisplay}</p>
                {couponCode && (
                  <p className="invoice-doc__coupon-tag">🏷️ Coupon: <strong>{couponCode}</strong></p>
                )}
              </div>
            ) : (
              /* LOGGED-IN, different addresses */
              <div className="invoice-doc__parties-cols" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div className="invoice-doc__bill-to">
                  <h6 className="invoice-doc__section-label">Customer Info</h6>
                  <p className="invoice-doc__customer-name">{customerName}</p>
                  <p>{customerPhone}</p>
                  <p>{customerAddressDisplay}</p>
                  {couponCode && (
                    <p className="invoice-doc__coupon-tag">🏷️ Coupon: <strong>{couponCode}</strong></p>
                  )}
                </div>
                <div className="invoice-doc__ship-to">
                  <h6 className="invoice-doc__section-label">Shipping Address</h6>
                  <p className="invoice-doc__customer-name">{customerName}</p>
                  <p>{customerPhone}</p>
                  <p>{shippingAddressDisplay}</p>
                </div>
              </div>
            )}
          </div>

          <hr className="invoice-doc__divider" />

          <div className="invoice-doc__items-wrap">
            <table className="invoice-doc__items-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th className="text-center">Size</th>
                  <th className="text-center">Color</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Unit Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderdetails.map((d, idx) => {
                  const unitPrice = Number(d.sale_price ?? d.new_price ?? 0);
                  const qty       = Number(d.qty ?? 1);
                  const raw       = d.product_name || d.name || d.product?.name || '';
                  const isSlug    = /^[a-z0-9]+(-[a-z0-9]+)*-\d+$/.test(raw);
                  const productName = isSlug
                    ? (d.product?.name || raw)
                    : (raw || `Product #${d.product_id}`);
                  return (
                    <tr key={d.id ?? idx}>
                      <td>{idx + 1}</td>
                      <td className="invoice-doc__product-name">{productName}</td>
                      <td className="text-center">{d.product_size  || d.size  || '—'}</td>
                      <td className="text-center">{d.product_color || d.color || '—'}</td>
                      <td className="text-center">{qty}</td>
                      <td className="text-end">{formatPrice(unitPrice)}</td>
                      <td className="text-end"><strong>{formatPrice(unitPrice * qty)}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="invoice-doc__totals">
            <div className="invoice-doc__totals-rows">
              <div className="invoice-doc__total-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalAmt)}</span>
              </div>
              {discountAmt > 0 && (
                <div className="invoice-doc__total-row invoice-doc__total-row--discount">
                  <span>Discount{couponCode ? ` (${couponCode})` : ''}</span>
                  <span>-{formatPrice(discountAmt)}</span>
                </div>
              )}
              <div className="invoice-doc__total-row">
                <span>Delivery Charge</span>
                <span>{formatPrice(shippingAmt)}</span>
              </div>
              <div className="invoice-doc__total-row invoice-doc__total-row--grand">
              <span>Total</span>
              <span>{formatPrice(grandAmt)}</span>
            </div>
            <div className="invoice-doc__total-row invoice-doc__total-row--paid">
              <span>Paid Amount</span>
              <span>{formatPrice(paidAmt)}</span>
            </div>
            <div className="invoice-doc__total-row invoice-doc__total-row--due">
              <span>Due Amount</span>
              <span>{formatPrice(dueAmt)}</span>
            </div>
            </div>
          </div>

          <div className="invoice-doc__footer">
            <div className="invoice-doc__footer-thanks">
              <p>Thank you for shopping with <strong>Kloset Korea</strong>!</p>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
};

export default CheckoutPage;