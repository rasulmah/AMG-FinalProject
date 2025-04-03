/* eslint-disable react/no-unescaped-entities */
import  'react'
import '../assets/scss/pages/_faq.scss'
import { Accordion } from 'react-bootstrap'
const FAQ = () => {
  return (
    <div className='faq-container'>

      <section>
            <div className="left-faq">
            <img className="img-fluid rounded" loading="lazy" src="https://purepng.com/public/uploads/large/51506279807py9khwbwpshea5scm2q4q5edaaku996nntddwty7jwtfdlz2uewvkc6bk3jko9shdkkzf9nelnn0q9tyrticjz8tx49hjveuy44a.png" alt="How can we help you?" />
            </div>



            <div className="right-faq">
              <div className="faq-heading">
                <h3>How can we help you?</h3>
                <p>We hope you have found an answer to your question. If you need any help, please search your query on our Support Center or contact us via email.</p>
              </div>
              <div className="accoridon-faq-container">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>How Do I Change Billing Information?</Accordion.Header>
                    <Accordion.Body>
                    To change your billing information, please follow these steps:

                    Go to our website and sign in to your account.
                    Click on your profile picture in the top right corner of the page and select "Account Settings."
                    Under the "Billing Information" section, click on "Edit."
                    Make your changes and click on "Save."
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>How Does Payment System Work?</Accordion.Header>
                    <Accordion.Body>
                    A payment system is a way to transfer money from one person or organization to another. It is a complex process that involves many different parties, including banks, credit card companies, and merchants.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>How Do I Cancel My Account?</Accordion.Header>
                    <Accordion.Body>
                    To cancel your account, please follow these steps:

                    Go to our website and sign in to your account.
                    Click on your profile picture in the top right corner of the page and select "Account Settings."
                    Scroll to the bottom of the page and click on "Cancel Account."
                    Enter your password and click on "Cancel Account."
                    </Accordion.Body>
                </Accordion.Item>
               </Accordion>
              </div>
            </div>
      </section>

    </div>
  )
}

export default FAQ