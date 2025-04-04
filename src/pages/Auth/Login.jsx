import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../tools/slicers/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../../utils/supabase';
import StaticLang from '../../utils/StaticLang';
import { useLang } from '../../context/LangContext';
import '../../assets/scss/pages/_login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLang();

  useEffect(() => {
    if (user) {
      if (user.email === 'rasuladmin@gmail.com') {
        navigate('/dashboard');
      } else {
        navigate('/account');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (email === 'rasuladmin@gmail.com' && password === 'admin0605') {
      const adminUser = { email, role: 'admin' };
      dispatch(loginSuccess(adminUser));
      navigate('/dashboard');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(
        language === 'az' ? 'Email və ya şifrə yanlışdır' : error.message
      );
      return;
    }

    dispatch(loginSuccess(data.user));
    navigate('/account');
  };

  return (
    <div className="login-form">
      <div className='login-container'>
        <div className="form-card">
          <div className="logo-container-form" />

          <div className="login-text">
            <h1>
              <StaticLang en="Welcome" az="Xoş gəlmisiniz" />
            </h1>
            <p>
              <StaticLang
                en="Log in to continue to the Mercedes-AMG PETRONAS F1 Team shop."
                az="Mercedes-AMG PETRONAS F1 Team mağazasına davam etmək üçün daxil olun."
              />
            </p>
          </div>

          <div className="form-base">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleLogin}>
              <div className="d-flex flex-column">
                <label className="form-label text-light">
                  <StaticLang en="Email" az="Email" />
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'az' ? 'Email ünvanı*' : 'Email address*'}
                  required
                />
              </div>

              <div className="d-flex flex-column">
                <label className="form-label text-light">
                  <StaticLang en="Password" az="Şifrə" />
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'az' ? 'şifrə*' : 'password*'}
                  required
                />
              </div>

              <div className="text-left d-flex flex-column gap-3">
                <button type="submit" className="w-100">
                  <StaticLang en="Login" az="Daxil ol" />
                </button>
                <p className="text-light">
                  <StaticLang
                    en="Don't have an account?"
                    az="Hesabınız yoxdur?"
                  />{' '}
                  <Link to="/signup" className="link">
                    <StaticLang en="Sign Up" az="Qeydiyyat" />
                  </Link>
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
