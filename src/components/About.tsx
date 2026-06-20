import React from 'react';

const AboutComponent = () => {
  return (
    <div> 
        <section className='about' style={{backgroundImage: "url(af5.jpg)"}} data-aos="fade-down">
            <div className='abcn' data-aos="fade-up">
                <h2 className='head' data-aos="fade-right">About us</h2>
                <p data-aos="fade-right">Welcome to Crown & Carat, where luxury meets craftsmanship. Our collection of exquisite rings is designed to reflect elegance, sophistication, and timeless beauty. Every piece is meticulously crafted with the finest materials, ensuring that each ring tells a story of unparalleled quality and style. At Crown & Carat, we are committed to creating pieces that not only enhance your beauty but also celebrate the moments that matter most. Explore our signature collection and find the perfect symbol of your unique personality and taste.</p>
            </div>
        </section>
    </div>
  );
};

export default AboutComponent;
