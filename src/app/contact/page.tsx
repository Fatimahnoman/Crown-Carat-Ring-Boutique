import React from 'react'

const Contact = () => {
  return (
    <div>
      <section className='conf'  data-aos="fade-down">
        <h2 className='headf'>
          Contact us
        </h2>
        <form action="https://formsubmit.co/fatimahnoman452@gmail.com" method="POST">
          <input type="text" name="name" placeholder='Enter your Name' required />
          <input type="email" name="email" placeholder='Enter your Email' required/>
          <input type="text" name="phone" placeholder='Enter your Phone No' />
          <textarea name="message" placeholder='Your Message' rows={4} required></textarea>

          {/* FormSubmit settings */}
          <input type="hidden" name="_subject" value="New Message from Crown & Carat!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="http://localhost:3000" />

          <button type='submit' data-aos="fade-up">Send Message</button>
        </form>
      </section>
    </div>
  )
}

export default Contact