import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../tools/slicers/authSlice';
import supabase from '../../utils/supabase';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMessage(error.message);
      return;
    }


    dispatch(loginSuccess(data.user));
    alert('Signup successful! Redirecting to account...');
    navigate('/account');
  };

  return (
    <div className="login-form">
    <div className='login-container'>
    <div className="form-card" >

        <div className="logo-container-form">
        </div>
        <div className="login-text">
          <h1>Welcome</h1>
          <p>Sign up to continue to the Mercedes-AMG PETRONAS F1 Team shop.</p>
        </div>

        <div className="form-base">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSignup}>
          <div className="d-flex flex-column">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address*"
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password*"
              required
            />
          </div>
          <div className="text-left d-flex flex-column gap-3">
          <button type="submit" className="w-100">Sign Up</button>
          <p className='text-light'>Already have an account? <Link to="/login" className="link">Log In</Link></p>
        </div> 
          
        </form>
        
        
        </div>

      </div>
    </div>
    </div>
  );
};

export default SignUp;


