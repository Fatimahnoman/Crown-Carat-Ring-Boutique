"use client";
import React, { useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [address, setAddress] = useState('');

  // Hidden form ref — we'll fill it and submit to FormSubmit
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  const totalItems = cart.reduce((t, i) => t + i.quantity, 0);

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep('cart'), 400);
  };

  // Build readable order text
  const buildOrderText = () =>
    cart
      .map(
        i =>
          `${i.name} x${i.quantity} @ PKR ${i.price.toLocaleString()} = PKR ${(
            i.price * i.quantity
          ).toLocaleString()}`
      )
      .join(' | ');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hiddenFormRef.current || cart.length === 0) return;

    // Fill hidden form fields
    const form = hiddenFormRef.current;
    (form.querySelector('[name="Customer_Name"]') as HTMLInputElement).value   = name;
    (form.querySelector('[name="Customer_Email"]') as HTMLInputElement).value  = email;
    (form.querySelector('[name="Customer_Phone"]') as HTMLInputElement).value  = phone;
    (form.querySelector('[name="Delivery_Address"]') as HTMLInputElement).value = address;
    (form.querySelector('[name="Order_Items"]') as HTMLInputElement).value     = buildOrderText();
    (form.querySelector('[name="Total_Amount"]') as HTMLInputElement).value    = `PKR ${cartTotal.toLocaleString()}`;
    (form.querySelector('[name="Order_Time"]') as HTMLInputElement).value      = new Date().toLocaleString(
      'en-PK',
      { timeZone: 'Asia/Karachi' }
    );

    clearCart(); // clear before redirect
    form.submit();
  };

  return (
    <>
      {/* Hidden FormSubmit form — submits & redirects to /thank-you */}
      <form
        ref={hiddenFormRef}
        action="https://formsubmit.co/fatimahnoman452@gmail.com"
        method="POST"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="_subject"  value="🛒 New Order - Crown & Carat!" />
        <input type="hidden" name="_captcha"  value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next"     value="http://localhost:3000/thank-you" />
        <input type="hidden" name="Customer_Name"    defaultValue="" />
        <input type="hidden" name="Customer_Email"   defaultValue="" />
        <input type="hidden" name="Customer_Phone"   defaultValue="" />
        <input type="hidden" name="Delivery_Address" defaultValue="" />
        <input type="hidden" name="Order_Items"      defaultValue="" />
        <input type="hidden" name="Total_Amount"     defaultValue="" />
        <input type="hidden" name="Order_Time"       defaultValue="" />
      </form>

      {/* Backdrop */}
      <div
        className={`cart-backdrop${isCartOpen ? ' open' : ''}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`cart-drawer${isCartOpen ? ' open' : ''}`}>

        {/* ── HEADER ── */}
        <div className="cart-header">
          <h2>
            {step === 'cart'
              ? `🛒 Cart (${totalItems} item${totalItems !== 1 ? 's' : ''})`
              : '📋 Checkout'}
          </h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        {/* ── BODY ── */}
        <div className="cart-body">

          {/* Empty Cart */}
          {step === 'cart' && cart.length === 0 && (
            <div className="cart-empty">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💍</div>
              <p>Your cart is empty.</p>
              <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#4a5568' }}>
                Browse our rings and add your favourites!
              </p>
            </div>
          )}

          {/* Cart Items */}
          {step === 'cart' && cart.length > 0 && (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div className="cart-item-price">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >−</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove"
                  >🗑</button>
                </div>
              ))}
            </>
          )}

          {/* Checkout Form */}
          {step === 'checkout' && (
            <form
              onSubmit={handlePlaceOrder}
              className="checkout-form-drawer"
            >
              <h3 style={{ color: '#c5a85c', marginBottom: '14px', fontSize: '1rem' }}>
                Delivery Details
              </h3>

              <input
                type="text"
                placeholder="Your Full Name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <textarea
                placeholder="Delivery Address *"
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />

              {/* Order summary */}
              <div className="order-summary-box">
                <h4>Order Summary</h4>
                {cart.map(i => (
                  <div key={i.id} className="order-summary-row">
                    <span>{i.name} × {i.quantity}</span>
                    <span>PKR {(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="order-summary-total">
                  <span>Total</span>
                  <span>PKR {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Buttons INSIDE form */}
              <button type="submit" className="place-order-btn">
                ✅ Place Order
              </button>
              <button
                type="button"
                className="back-btn"
                style={{ marginTop: '10px' }}
                onClick={() => setStep('cart')}
              >
                ← Back to Cart
              </button>
            </form>
          )}
        </div>

        {/* ── FOOTER — cart step only ── */}
        {step === 'cart' && cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total:</span>
              <span className="cart-total-value">
                PKR {cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              className="place-order-btn"
              onClick={() => setStep('checkout')}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
