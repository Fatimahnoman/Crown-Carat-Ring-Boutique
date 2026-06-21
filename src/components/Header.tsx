"use client";
import { GiDiamondRing } from "react-icons/gi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Link from "next/link";
import React from 'react';
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="header">
      <h1 className="log" data-aos="zoom-in-right">
        <GiDiamondRing style={{ fontSize: "25px" }} /> Crown &amp; Carat
      </h1>
      <nav className="nav" data-aos="zoom-in-left">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/ring">Rings</Link>
        <Link href="/contact">Contact us</Link>
        <div
          className="cart-icon-container"
          onClick={() => setIsCartOpen(true)}
          title="View Cart"
        >
          <PiShoppingCartSimpleFill style={{ fontSize: "25px", color: "#c5a85c" }} />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;