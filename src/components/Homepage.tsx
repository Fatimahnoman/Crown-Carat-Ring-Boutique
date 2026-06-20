"use client";
import React from 'react';

const Homepage = () => {
  const handleShopNow = () => {
    const ringsSection = document.getElementById('rings');
    if (ringsSection) {
      ringsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
        <section className='hero' style={{backgroundImage: "url(/rf3.jpg)",  }}  > 
          <div data-aos="zoom-in-up">
            <h1 className='hed'>
                Welcome to
            </h1>
            <h2>
            Crown & Carat
            </h2>
            <p className='p1'>Discover timeless elegance with our exquisite collection</p>
            <p className='p1'>of rings, crafted to celebrate your unique moments.</p>
            <p className='p1'></p>
            <button onClick={handleShopNow}>Shop Now</button>
          </div>
        </section>
    </div>
  );
};

export default Homepage;