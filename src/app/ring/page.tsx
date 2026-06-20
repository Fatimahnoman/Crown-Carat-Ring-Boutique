"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';

const Ring = () => {
  const { addToCart } = useCart();

  const RingPic = [
    { id: 1, name: 'Lunar Elegance', price: 35000, image: '/r1.jpg' },
    { id: 2, name: 'Ethereal Gleam', price: 30000, image: '/r12.jpg' },
    { id: 3, name: 'Arctic Glow', price: 45000, image: '/r7.png' },
    { id: 4, name: 'Silver Whisper', price: 29000, image: '/r13.webp' },
    { id: 5, name: 'Moonlit Charm', price: 43000, image: '/r10.jpg' },
    { id: 6, name: 'Crystal Mirage', price: 65000, image: '/r9.jpg' },
    { id: 7, name: 'Golden Radiance', price: 40000, image: '/r5.webp' },
    { id: 8, name: 'Silver Symphony', price: 56000, image: '/r4.jpg' },
    { id: 9, name: 'Starlit Grace', price: 20000, image: '/r14.jpg' },
    { id: 10, name: 'Regal Shine', price: 14000, image: '/r6.webp' },
    { id: 11, name: 'Starry Elegance', price: 49000, image: '/r15.avif' },
    { id: 12, name: 'Crystal Dewdrop', price: 61000, image: '/r16.jpg' },
  ];  

  return (
    <div id="rings" data-aos="fade-down">
      <div className="ringes">
        {RingPic.map((rings) => (
          <div key={rings.id} className="ringcard" data-aos="flip-up">
            <img src={rings.image} alt={rings.name} />
            <h3>{rings.name}</h3>
            <div>${rings.price.toLocaleString()}</div>
            <button onClick={() => addToCart(rings)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ring;
