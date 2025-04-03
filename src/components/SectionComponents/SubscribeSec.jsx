import 'react'

import '../../assets/scss/components/_subscribeSec.scss'

const SubscribeSec = () => {
  return (
    <div className='subs-container d-flex flex-column align-items-center '>
    <h2 className="Newsletter-Title">Be a part of the Team</h2>
      <p className="Newsletter-Text">Sign up for the latest store news, launches and exclusive offers</p>

      <div className="Newsletter-Form d-flex flex-column align-items-center">
        <form className='form'>
          <input type="email" name="" id="" placeholder='Enter your email adress'/>
          <button className='d-flex justify-content-center align-items-center'><svg xmlns="http://www.w3.org/2000/svg" width={93} height={19} viewBox="0 0 93 19" fill="none"><path d="M3.939 16.104C5.85 16.104 7.267 15.168 7.267 13.517C7.267 10.098 1.911 11.541 1.911 9.214C1.911 8.343 2.652 7.797 3.874 7.797C5.096 7.797 5.889 8.46 5.993 9.487H7.085C6.955 7.849 5.694 6.796 3.874 6.796C2.054 6.796 0.793 7.771 0.793 9.214C0.793 12.464 6.123 11.177 6.123 13.517C6.123 14.622 5.2 15.103 3.939 15.103C2.522 15.103 1.69 14.284 1.573 13.023H0.481C0.598 14.882 1.898 16.104 3.939 16.104ZM10.628 16H11.746V6.9H10.628V16ZM19.5052 16.104C20.8572 16.104 21.9882 15.415 22.4042 14.414V16H23.4442V12.88C23.4442 11.84 22.4952 11.32 21.8322 11.32H19.5702V12.282H21.6242C22.0662 12.282 22.3392 12.555 22.3392 12.971C22.3392 14.284 21.0132 15.129 19.5182 15.129C17.6462 15.129 16.2682 13.803 16.2682 11.45C16.2682 9.084 17.6462 7.797 19.5312 7.797C20.9352 7.797 22.0662 8.616 22.2742 9.773H23.4572C23.2492 8.031 21.6112 6.796 19.5312 6.796C17.2692 6.796 15.1372 8.343 15.1372 11.45C15.1372 14.557 17.2562 16.104 19.5052 16.104ZM26.9826 16H28.1006V8.616L32.7806 16H34.0546V6.9H32.9366V14.31L28.2566 6.9H26.9826V16ZM46.1199 16.104C48.1869 16.104 49.5649 14.869 49.5649 12.88V6.9H48.4729V12.932C48.4729 14.271 47.5369 15.103 46.1199 15.103C44.7159 15.103 43.7799 14.271 43.7799 12.932V6.9H42.6879V12.88C42.6879 14.869 44.0659 16.104 46.1199 16.104ZM53.3807 16H54.4987V12.282H56.8127C58.6067 12.282 59.7117 11.19 59.7117 9.591C59.7117 7.992 58.6067 6.9 56.8127 6.9H53.3807V16ZM54.4987 11.294V7.888H56.8127C58.0867 7.888 58.5677 8.694 58.5677 9.591C58.5677 10.488 58.0867 11.294 56.8127 11.294H54.4987Z" fill="#0B0B0B" /><path fillRule="evenodd" clipRule="evenodd" d="M92 1L76 10.2632L81.0526 11.9474L82.7368 17L83.5789 12.7895L89.4737 15.3158L92 1V1Z" stroke="#0B0B0B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M83.5791 12.7895L92.0001 1L81.0527 11.9474" stroke="#0B0B0B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M82.7363 16.9993L85.2626 13.6309" stroke="#0B0B0B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
 </button>
        </form>

        <p className='form-text'>By signing up you agree to our Terms & Conditions. You can unsubscribe at anytime you wish.</p>
      </div>
    </div>
  )
}

export default SubscribeSec