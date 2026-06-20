"use client";
import { GiDiamondRing } from "react-icons/gi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Link from "next/link";
import React from 'react';
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { cart, setIsCartOpen } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
   
  return (
     <header className="header">
        <h1 className="log" data-aos="zoom-in-right">
          <GiDiamondRing style={{fontSize:"32px", color: "#c5a85c"}}/> Crown & Carat
        </h1>
        <nav className="nav" data-aos="zoom-in-left">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/ring">Rings</Link>
            <Link href="/contact">Contact us</Link>
            <div 
              style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
              onClick={() => setIsCartOpen(true)}
              title="Open Cart"
            >
              <PiShoppingCartSimpleFill style={{ fontSize: "28px", color: "#c5a85c" }} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {itemCount}
                </span>
              )}
            </div>
         </nav>
     </header>
  )
}

export default Header