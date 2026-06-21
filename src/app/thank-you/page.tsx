import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed | Crown & Carat',
  description: 'Thank you for your order. We will contact you shortly.',
};

export default function ThankYouPage() {
  return (
    <div className="thankyou-page">
      <div className="thankyou-card" data-aos="zoom-in">
        <div className="thankyou-icon">💍</div>
        <h1 className="thankyou-title">Thank You!</h1>
        <p className="thankyou-subtitle">Your Order Has Been Placed</p>
        <p className="thankyou-msg">
          We have received your order and our team will contact you shortly to
          confirm the details and arrange delivery.
        </p>
        <div className="thankyou-divider" />
        <p className="thankyou-note">
          📧 A confirmation has been sent to the store.
        </p>
        <Link href="/" className="thankyou-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
