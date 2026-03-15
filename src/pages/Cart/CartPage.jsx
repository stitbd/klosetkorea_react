import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../utils';
import './CartPage.scss';

const CartPage = () => {
  const { items, removeFromCart, updateQty, clearCart } = useCartStore();
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  if (items.length === 0) return (
    <main className="cart-page">
      <Container className="py-5 text-center">
        <div className="cart-page__empty">
          <p className="cart-page__empty-icon">🛒</p>
          <h4>Your cart is empty</h4>
          <p className="text-muted">Looks like you haven't added anything yet.</p>
          <Link to="/" className="cart-page__continue-btn">Continue Shopping</Link>
        </div>
      </Container>
    </main>
  );

  return (
    <main className="cart-page">
      <Container fluid="xl" className="py-4">
        <h2 className="cart-page__title mb-4">Shopping Cart</h2>
        <Row className="g-4">
          <Col xs={12} lg={8}>
            <div className="cart-page__table-wrap">
              <Table responsive className="cart-page__table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image || PLACEHOLDER_IMG}
                            alt={item.name}
                            className="cart-page__item-img"
                          />
                          <div>
                            <p className="cart-page__item-name mb-0">{item.name}</p>
                            {item.sku && <p className="cart-page__item-sku mb-0">SKU: {item.sku}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <span className="price-current">{formatPrice(item.price)}</span>
                      </td>
                      <td className="align-middle">
                        <div className="cart-page__qty-ctrl">
                          <button onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeFromCart(item.id)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td className="align-middle">
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                      </td>
                      <td className="align-middle">
                        <button
                          className="cart-page__remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove"
                        >✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <Link to="/" className="cart-page__continue-btn">← Continue Shopping</Link>
              <button className="cart-page__clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </Col>

          {/* Summary */}
          <Col xs={12} lg={4}>
            <div className="cart-page__summary">
              <h5 className="cart-page__summary-title">Order Summary</h5>
              <div className="cart-page__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="cart-page__summary-row">
                <span>Shipping</span>
                <span className="text-success">{total >= 1000 ? 'Free' : formatPrice(60)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--total">
                <span>Total</span>
                <span>{formatPrice(total < 1000 ? total + 60 : total)}</span>
              </div>
              <Link to="/checkout" className="cart-page__checkout-btn">
                Proceed to Checkout →
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CartPage;
