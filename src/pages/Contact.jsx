import 'react';
import '../assets/scss/pages/_contact.scss';
import SubscribeSec from '../components/SectionComponents/SubscribeSec';
import FeatureSlider from '../components/Sliders/FeatureSlider';

const Contact = () => {
  return (
    <div className='contact-container'>
      <div className="contact-heading">
        <h2>Contact Us</h2>
        <hr />
      </div>

      <div className="contact-body">
        <section className="contact-first">
          <div className="contact-info">
            <h2>
              Not found the answer you were looking for? You can contact us via chat and email. Our customer service team is available on weekdays from 9am to 6pm GMT.
            </h2>
          </div>
          <div className="contact-card-container d-flex">
            <div className="contact-card d-flex flex-column justify-content-between">
              <div className="card-text">Email Us</div>
              <hr />
              <div className="card-info">
                Send us an email and a member of our customer service team will get back to you - usually within 24 hours.
              </div>
              <button className='card-button d-flex justify-content-between align-items-center'>
                Send Email <i className="fa-regular fa-paper-plane" />
              </button>
            </div>

            <div className="contact-card d-flex flex-column justify-content-between">
              <div className="card-text">Live Chat</div>
              <hr />
              <div className="card-info">
                Need to speak to us right now? Start a conversation with a member of our customer service team. We’re here to help.
              </div>
              <button className='card-button d-flex justify-content-between align-items-center'>
                Start Live Chat <i className="fa-regular fa-comment-dots"></i>
              </button>
            </div>

            <div className="contact-card d-flex flex-column justify-content-between">
              <div className="card-text">WhatsApp</div>
              <hr />
              <div className="card-info">
                Need support? Launch WhatsApp here to start a conversation with a member of our customer service team.
              </div>
              <button className='card-button d-flex justify-content-between align-items-center'>
                Launch WhatsApp <i className="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </section>
        <hr />
        <section className="contact-second">
          <div className="contact-form-container">
            <div className="contact-form-text">Send us a message</div>
            <div className="contact-form-info-text">
              <p className='text-left'>Our Customer Service team is available to answer any questions you may have on Monday to Friday between 9am and 6pm GMT. Please send us a message below and we will get back to you as soon as possible.</p>
              <p>Please note that if your order was placed prior to 8am GMT on the 2nd of March, and your order number starts with 4100, please reach out to info.mercedes@stichd.com to resolve your query.</p>
            </div>
            <form className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className="form-row">
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Order Number" />
                <select>
                  <option value="order">Order</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="subscribe d-flex justify-content-between align-items-center flex-column"> <SubscribeSec></SubscribeSec></div>
         

        </section>
        
      </div>
      <div className='pb-5 pt-5 bg-black'><FeatureSlider /></div>
    </div>
  );
};

export default Contact;
