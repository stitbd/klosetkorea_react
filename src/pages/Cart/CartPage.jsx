// CartPage.jsx
import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../utils';
import './CartPage.scss';

// ✅ Coupon Configuration (In production, fetch from API)
const COUPONS = {
  SAVE50: { type: 'fixed', value: 50 },
  SAVE100: { type: 'fixed', value: 100 },
  SAVE10PCT: { type: 'percent', value: 10 },
  SAVE20PCT: { type: 'percent', value: 20 },
};

const CartPage = () => {
  const { items, removeFromCart, updateQty, clearCart } = useCartStore();
  
  // ✅ Coupon State Management
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // ✅ Price Calculations (memoized for performance)
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!appliedCoupon || !COUPONS[appliedCoupon]) return 0;
    
    const coupon = COUPONS[appliedCoupon];
    if (coupon.type === 'fixed') {
      return Math.min(coupon.value, subtotal);
    }
    if (coupon.type === 'percent') {
      return (subtotal * coupon.value) / 100;
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  // ✅ Total = Subtotal - Discount (No Shipping)
  const total = useMemo(() => {
    return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  // ✅ Apply Coupon Handler
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setIsApplying(true);
    setCouponError('');

    // Simulate API delay (remove in production)
    setTimeout(() => {
      if (COUPONS[code]) {
        setAppliedCoupon(code);
        setCouponError('');
        setCouponCode('');
        setShowCoupon(false);
      } else {
        setAppliedCoupon(null);
        setCouponError('Invalid or expired coupon code');
      }
      setIsApplying(false);
    }, 300);
  };

  // ✅ Remove Applied Coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    setCouponCode('');
  };

  // ✅ Handle Quantity Change with Validation
  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) {
      removeFromCart(item.id);
    } else if (newQty <= 99) {
      updateQty(item.id, newQty);
    }
  };

  // ✅ Empty Cart View
  if (items.length === 0) {
    return (
      <main className="cart-page">
        <Container className="py-5 text-center">
          <div className="cart-page__empty">
            <p className="cart-page__empty-icon" aria-hidden="true">🛒</p>
            <h4>Your cart is empty</h4>
            <p className="text-muted mb-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/" className="cart-page__continue-btn">
              ← Continue Shopping
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  // ✅ Cart Items View
  return (
    <main className="cart-page" role="main">
      <Container fluid="xl" className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="cart-page__title">Shopping Cart</h2>
          <span className="text-muted small">
            {items.reduce((acc, item) => acc + item.quantity, 0)} item(s)
          </span>
        </div>
        
        <Row className="g-4">
          {/* ========================================
              Cart Items Column (Left)
              ======================================== */}
          <Col xs={12} lg={8}>
            <div className="cart-page__table-wrap">
              <Table responsive className="cart-page__table" role="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col" className="text-end">Price</th>
                    <th scope="col" className="text-center">Qty</th>
                    <th scope="col" className="text-end">Total</th>
                    <th scope="col" className="text-center" aria-label="Actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const itemTotal = item.price * item.quantity;
                    
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.image || PLACEHOLDER_IMG}
                              alt={item.name}
                              className="cart-page__item-img"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = PLACEHOLDER_IMG;
                              }}
                            />
                            <div className="min-w-0">
                              <p className="cart-page__item-name mb-0 text-truncate" title={item.name}>
                                {item.name}
                              </p>
                              {item.sku && (
                                <p className="cart-page__item-sku mb-0">
                                  SKU: {item.sku}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        <td className="align-middle text-end">
                          <span className="cart-page__price">
                            {formatPrice(item.price)}
                          </span>
                        </td>
                        
                        <td className="align-middle text-center">
                          <div className="cart-page__qty-ctrl" role="group" aria-label={`Quantity for ${item.name}`}>
                            <button 
                              onClick={() => handleQtyChange(item, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span aria-live="polite">{item.quantity}</span>
                            <button 
                              onClick={() => handleQtyChange(item, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              disabled={item.quantity >= 99}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        
                        <td className="align-middle text-end">
                          <strong className="cart-page__price">
                            {formatPrice(itemTotal)}
                          </strong>
                        </td>
                        
                        <td className="align-middle text-center">
                          <button
                            className="cart-page__remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Cart Actions */}
            <div className="d-flex flex-wrap justify-content-between gap-2 mt-3">
              <Link to="/" className="cart-page__continue-btn">
                ← Continue Shopping
              </Link>
              <button 
                className="cart-page__clear-btn" 
                onClick={clearCart}
                type="button"
              >
                Clear Cart
              </button>
            </div>
          </Col>

          {/* ========================================
              Order Summary Column (Right - Sticky)
              ======================================== */}
          <Col xs={12} lg={4}>
            <div className="cart-page__summary">
              
              {/* ✅ Coupon Section */}
              <div className="coupon-box" aria-labelledby="coupon-heading">
                <div className="coupon-box__header" id="coupon-heading">
                  <span>Have a coupon?</span>{' '}
                  <button
                    type="button"
                    className="coupon-toggle"
                    onClick={() => setShowCoupon((prev) => !prev)}
                    aria-expanded={showCoupon}
                    aria-controls="coupon-form"
                  >
                    {showCoupon ? 'Hide Code' : 'Click Here To Enter Your Code'}
                  </button>
                </div>

                {/* Coupon Input Form */}
                {(showCoupon || appliedCoupon) && (
                  <div id="coupon-form" className="coupon-box__body">
                    {appliedCoupon ? (
                      <>
                        <Form.Control
                          className="coupon-input"
                          value={`${appliedCoupon} ✓`}
                          readOnly
                          disabled
                          aria-label="Applied coupon code"
                        />
                        <button
                          type="button"
                          className="coupon-btn"
                          onClick={removeCoupon}
                          style={{ background: '#6c757d' }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <Form.Control
                          className="coupon-input"
                          placeholder="Enter code (e.g. SAVE50)"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            if (couponError) setCouponError('');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isApplying) {
                              e.preventDefault();
                              applyCoupon();
                            }
                          }}
                          isInvalid={!!couponError}
                          disabled={isApplying}
                          aria-label="Coupon code input"
                        />
                        <button
                          type="button"
                          className="coupon-btn"
                          onClick={applyCoupon}
                          disabled={isApplying || !couponCode.trim()}
                          aria-busy={isApplying}
                        >
                          {isApplying ? 'Applying...' : 'Apply'}
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Feedback Messages */}
                {couponError && (
                  <p className="coupon-error mb-0" role="alert" aria-live="assertive">
                    ⚠️ {couponError}
                  </p>
                )}
                
                {appliedCoupon && COUPONS[appliedCoupon] && (
                  <p className="coupon-success mb-0" role="status" aria-live="polite">
                    ✅ {appliedCoupon} applied! Saved {formatPrice(discount)}
                  </p>
                )}
              </div>

              <hr className="my-3" />
              
              {/* ✅ Order Summary Breakdown (No Shipping) */}
              <h5 className="cart-page__summary-title">Order Summary</h5>
              
              <div className="cart-page__summary-row">
                <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="text-end">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="cart-page__summary-row text-success">
                  <span>Discount ({appliedCoupon})</span>
                  <span className="text-end">-{formatPrice(discount)}</span>
                </div>
              )}

              {/* Total Row */}
              <div className="cart-page__summary-row cart-page__summary-row--total">
                <span>Total (BDT)</span>
                <span className="text-end fs-5">{formatPrice(total)}</span>
              </div>
              
              {/* Checkout Button */}
              <Link 
                to="/checkout" 
                className="cart-page__checkout-btn"
                onClick={() => {
                  // Optional: Track checkout initiation
                  console.log('Checkout initiated:', { subtotal, discount, total });
                }}
              >
                Proceed to Checkout →
              </Link>
              
              {/* Trust Badges / Security Note */}
              <p className="text-center text-muted small mt-3 mb-0">
                🔒 Secure checkout • Free returns
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CartPage;