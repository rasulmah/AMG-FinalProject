import 'react';
import '../assets/scss/pages/_faq.scss';
import { Accordion } from 'react-bootstrap';
import StaticLang from '../utils/StaticLang';

const FAQ = () => {
  return (
    <div className='faq-container'>
      <section>
        <div className="left-faq">
          <img
            className="img-fluid rounded"
            loading="lazy"
            src="https://purepng.com/public/uploads/large/51506279807py9khwbwpshea5scm2q4q5edaaku996nntddwty7jwtfdlz2uewvkc6bk3jko9shdkkzf9nelnn0q9tyrticjz8tx49hjveuy44a.png"
            alt="How can we help you?"
          />
        </div>

        <div className="right-faq">
          <div className="faq-heading">
            <h3>
              <StaticLang en="How can we help you?" az="Sizə necə kömək edə bilərik?" />
            </h3>
            <p>
              <StaticLang
                en="We hope you have found an answer to your question. If you need any help, please search your query on our Support Center or contact us via email."
                az="Ümid edirik ki, sualınıza cavab tapa bildiniz. Əgər kömək lazım olsa, Dəstək Mərkəzində axtarış edin və ya bizə e-poçt vasitəsilə müraciət edin."
              />
            </p>
          </div>

          <div className="accoridon-faq-container">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <StaticLang
                    en="How Do I Change Billing Information?"
                    az="Ödəniş Məlumatlarını Necə Dəyişə Bilərəm?"
                  />
                </Accordion.Header>
                <Accordion.Body>
                  <StaticLang
                    en={`To change your billing information, please follow these steps:

1. Go to our website and sign in to your account.
2. Click on your profile picture in the top right corner of the page and select "Account Settings."
3. Under the "Billing Information" section, click on "Edit."
4. Make your changes and click on "Save."`}
                    az={`Ödəniş məlumatlarınızı dəyişmək üçün bu addımları izləyin:

1. Saytımıza daxil olun və hesabınıza daxil olun.
2. Səhifənin sağ yuxarı küncündə profil şəklinizə klikləyin və "Hesab Ayarları"nı seçin.
3. "Ödəniş Məlumatları" bölməsində "Redaktə et" klikləyin.
4. Dəyişiklikləri edin və "Yadda saxla" düyməsini klikləyin.`}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <StaticLang
                    en="How Does Payment System Work?"
                    az="Ödəniş Sistemi Necə İşləyir?"
                  />
                </Accordion.Header>
                <Accordion.Body>
                  <StaticLang
                    en="A payment system is a way to transfer money from one person or organization to another. It is a complex process that involves many different parties, including banks, credit card companies, and merchants."
                    az="Ödəniş sistemi bir şəxsdən və ya təşkilatdan digərinə pul köçürməyin bir yoludur. Bu, banklar, kredit kartı şirkətləri və satıcılar kimi bir çox tərəfi əhatə edən mürəkkəb bir prosesdir."
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <StaticLang
                    en="How Do I Cancel My Account?"
                    az="Hesabımı Necə Ləğv Edə Bilərəm?"
                  />
                </Accordion.Header>
                <Accordion.Body>
                  <StaticLang
                    en={`To cancel your account, please follow these steps:

1. Go to our website and sign in to your account.
2. Click on your profile picture in the top right corner of the page and select "Account Settings."
3. Scroll to the bottom of the page and click on "Cancel Account."
4. Enter your password and click on "Cancel Account."`}
                    az={`Hesabınızı ləğv etmək üçün bu addımları izləyin:

1. Saytımıza daxil olun və hesabınıza daxil olun.
2. Səhifənin sağ yuxarı küncündə profil şəklinizə klikləyin və "Hesab Ayarları"nı seçin.
3. Səhifənin sonuna qədər sürüşdürün və "Hesabı Ləğv Et" seçimini klikləyin.
4. Şifrənizi daxil edin və "Hesabı Ləğv Et" düyməsini klikləyin.`}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
