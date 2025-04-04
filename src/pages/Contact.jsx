import 'react';
import '../assets/scss/pages/_contact.scss';
import SubscribeSec from '../components/SectionComponents/SubscribeSec';
import FeatureSlider from '../components/Sliders/FeatureSlider';
import StaticLang from '../utils/StaticLang';
import { useLang } from '../context/LangContext';

const Contact = () => {
  const { language } = useLang();

  return (
    <div className='contact-container'>
      <div className="contact-heading">
        <h2><StaticLang en="Contact Us" az="Bizimlə Əlaqə" /></h2>
        <hr />
      </div>

      <div className="contact-body">
        <section className="contact-first">
          <div className="contact-info">
            <h2>
              <StaticLang
                en="Not found the answer you were looking for? You can contact us via chat and email. Our customer service team is available on weekdays from 9am to 6pm GMT."
                az="Axtardığınız cavabı tapmadınız? Bizimlə çat və ya e-poçt vasitəsilə əlaqə saxlaya bilərsiniz. Müştəri xidməti komandamız həftəiçi günlər 09:00 - 18:00 GMT arası aktivdir."
              />
            </h2>
          </div>

          <div className="contact-card-container d-flex">
            <div className="contact-card d-flex flex-column justify-content-between">
              <div className="card-text">
                <StaticLang en="Email Us" az="Bizə E-poçt Yazın" />
              </div>
              <hr />
              <div className="card-info">
                <StaticLang
                  en="Send us an email and a member of our customer service team will get back to you - usually within 24 hours."
                  az="Bizə e-poçt göndərin və müştəri xidmətlərindən bir əməkdaşımız sizə adətən 24 saat ərzində cavab verəcək."
                />
              </div>
              <button className='card-button d-flex justify-content-between align-items-center'>
                <StaticLang en="Send Email" az="E-poçt Göndər" />
                <i className="fa-regular fa-paper-plane" />
              </button>
            </div>

            <div className="contact-card d-flex flex-column justify-content-between">
              <div className="card-text"><StaticLang en="Live Chat" az="Canlı Çat" /></div>
              <hr />
              <div className="card-info">
                <StaticLang
                  en="Need to speak to us right now? Start a conversation with a member of our customer service team. We’re here to help."
                  az="Bizimlə dərhal əlaqə qurmaq istəyirsiniz? Müştəri xidmətləri komandamızdan biri ilə söhbətə başlayın. Biz buradayıq ki, sizə kömək edək."
                />
              </div>
              <button className='card-button d-flex justify-content-between align-items-center'>
                <StaticLang en="Start Live Chat" az="Canlı Söhbətə Başla" />
                <i className="fa-regular fa-comment-dots"></i>
              </button>
            </div>

            <div className="contact-card d-flex flex-column justify-content-between">
              <div className="card-text"><StaticLang en="WhatsApp" az="WhatsApp" /></div>
              <hr />
              <div className="card-info">
                <StaticLang
                  en="Need support? Launch WhatsApp here to start a conversation with a member of our customer service team."
                  az="Dəstəyə ehtiyacınız var? WhatsApp vasitəsilə bizimlə əlaqə saxlayın."
                />
              </div>
              <button className='card-button d-flex justify-content-between align-items-center'>
                <StaticLang en="Launch WhatsApp" az="WhatsApp Aç" />
                <i className="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </section>

        <hr />

        <section className="contact-second">
          <div className="contact-form-container">
            <div className="contact-form-text">
              <StaticLang en="Send us a message" az="Bizə Mesaj Göndərin" />
            </div>

            <div className="contact-form-info-text">
              <p className='text-left'>
                <StaticLang
                  en="Our Customer Service team is available to answer any questions you may have on Monday to Friday between 9am and 6pm GMT. Please send us a message below and we will get back to you as soon as possible."
                  az="Müştəri Xidmətləri komandamız həftəiçi günlər 09:00-dan 18:00-a qədər suallarınızı cavablandırmaq üçün aktivdir. Aşağıdakı formadan istifadə edərək bizə mesaj göndərin, sizə tez bir zamanda geri dönəcəyik."
                />
              </p>
              <p>
                <StaticLang
                  en="Please note that if your order was placed prior to 8am GMT on the 2nd of March, and your order number starts with 4100, please reach out to info.mercedes@stichd.com to resolve your query."
                  az="Qeyd: Əgər sifarişiniz 2 Mart saat 08:00 GMT-dən əvvəl verilibsə və sifariş nömrəniz 4100 ilə başlayırsa, zəhmət olmasa info.mercedes@stichd.com ünvanına müraciət edin."
                />
              </p>
            </div>

            <form className="contact-form">
              <div className="form-row">
                <input type="text" placeholder={language === 'az' ? 'Ad' : 'First Name'} required />
                <input type="text" placeholder={language === 'az' ? 'Soyad' : 'Last Name'} required />
              </div>
              <div className="form-row">
                <input type="email" placeholder={language === 'az' ? 'E-poçt Ünvanı' : 'Email Address'} required />
                <input type="tel" placeholder={language === 'az' ? 'Telefon Nömrəsi' : 'Phone Number'} />
              </div>
              <div className="form-row">
                <input type="text" placeholder={language === 'az' ? 'Sifariş Nömrəsi' : 'Order Number'} />
                <select>
                  <option value="order">{language === 'az' ? 'Sifariş' : 'Order'}</option>
                  <option value="support">{language === 'az' ? 'Dəstək' : 'Support'}</option>
                  <option value="other">{language === 'az' ? 'Digər' : 'Other'}</option>
                </select>
              </div>
              <textarea placeholder={language === 'az' ? 'Mesaj' : 'Message'} required></textarea>
              <button type="submit">
                <StaticLang en="Submit" az="Göndər" />
              </button>
            </form>
          </div>

          <div className="subscribe d-flex justify-content-between align-items-center flex-column">
            <SubscribeSec />
          </div>
        </section>
      </div>

      <div className='pb-5 pt-5 bg-black'>
        <FeatureSlider />
      </div>
    </div>
  );
};

export default Contact;
