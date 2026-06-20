"use client";
import React from 'react';
import Link from 'next/link';
import { GiDiamondRing } from 'react-icons/gi';

const ThankYou = () => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#090d1a',
      color: '#e2e8f0',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        maxWidth: '550px',
        width: '100%',
        backgroundColor: '#151f32',
        border: '1px solid #c5a85c',
        borderRadius: '8px',
        padding: '50px 40px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Animated Ring Icon */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(197, 168, 92, 0.1)',
          color: '#c5a85c',
          marginBottom: '30px'
        }}>
          <GiDiamondRing size={45} style={{ animation: 'pulse 2s infinite' }} />
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          color: '#c5a85c',
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Thank You!
        </h1>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#cbd5e1',
          marginBottom: '30px'
        }}>
          Your order has been successfully placed. A confirmation details request has been sent to our desk. We are crafting your timeless piece with absolute perfection.
        </p>

        {/* Special one-liner discount to buy again */}
        <div style={{
          backgroundColor: '#090d1a',
          border: '1px dashed rgba(197, 168, 92, 0.4)',
          borderRadius: '6px',
          padding: '20px',
          marginBottom: '40px'
        }}>
          <p style={{
            fontSize: '1rem',
            color: '#c5a85c',
            margin: 0,
            fontWeight: '600',
            fontStyle: 'italic',
            lineHeight: '1.5'
          }}>
            "To celebrate your elegance, use code <span style={{ color: '#ffffff', letterSpacing: '1px', textDecoration: 'underline' }}>ROYAL10</span> for 10% off on your next purchase with us!"
          </p>
        </div>

        <Link href="/" style={{
          display: 'inline-block',
          backgroundColor: '#c5a85c',
          color: '#090d1a',
          padding: '14px 35px',
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(197, 168, 92, 0.3)'
        }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
