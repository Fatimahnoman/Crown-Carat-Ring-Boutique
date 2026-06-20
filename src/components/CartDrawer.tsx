"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { PiXBold, PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';

const CartDrawer = () => {
  const { cart, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);
  
  // Checkout details state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Format order details for FormSubmit email
  const formattedOrderDetails = cart
    .map((item, index) => `${index + 1}. ${item.name} - Qty: ${item.quantity} - Price: $${(item.price * item.quantity).toLocaleString()}`)
    .join('\n') + `\n\n-----------------------------\nTotal Order Value: $${totalAmount.toLocaleString()}`;

  const handleSubmitOrder = (e: React.FormEvent) => {
    // FormSubmit will naturally process this form submit, we just let it submit
    // But we clear the cart in localStorage after a slight delay so it resets
    setTimeout(() => {
      clearCart();
      setCheckoutMode(false);
      setIsCartOpen(false);
    }, 1000);
  };

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <div className="cart-header">
          <h2>Your Selection</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <PiXBold size={24} />
          </button>
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button className="shop-btn" onClick={() => setIsCartOpen(false)}>
              Discover Rings
            </button>
          </div>
        ) : !checkoutMode ? (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toLocaleString()}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        <PiMinusBold size={12} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <PiPlusBold size={12} />
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <PiTrashBold size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="cart-footer">
              <div className="total-row">
                <span>Total:</span>
                <span className="total-amount">${totalAmount.toLocaleString()}</span>
              </div>
              <button className="checkout-btn" onClick={() => setCheckoutMode(true)}>
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          /* Checkout Form */
          <div className="checkout-container">
            <h3>Delivery Details</h3>
            <button className="back-btn" onClick={() => setCheckoutMode(false)}>
              &larr; Back to Cart
            </button>

            <form 
              action="https://formsubmit.co/fatimahnoman452@gmail.com" 
              method="POST"
              onSubmit={handleSubmitOrder}
              className="checkout-form"
            >
              {/* FormSubmit configs */}
              <input type="hidden" name="_subject" value={`New Order Request from ${name}`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="http://localhost:3000/thank-you" />
              
              {/* Packed Order Details for Email */}
              <input type="hidden" name="Order_Details" value={formattedOrderDetails} />

              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="Client_Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Enter your name" 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="Client_Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Enter your email" 
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="Client_Phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  placeholder="Enter your phone number" 
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea 
                  name="Shipping_Address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                  rows={3} 
                  placeholder="Enter complete shipping address"
                ></textarea>
              </div>

              <div className="order-summary-box">
                <h4>Order Total: ${totalAmount.toLocaleString()}</h4>
                <p>Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>

              <button type="submit" className="place-order-btn">
                Confirm & Place Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
