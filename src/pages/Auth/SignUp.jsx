import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../tools/slicers/authSlice';
import supabase from '../../utils/supabase';
import StaticLang from '../../utils/StaticLang';
import { useLang } from '../../context/LangContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLang();

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
      setErrorMessage(
        language === 'az' ? 'Qeydiyyat zamanı xəta baş verdi' : error.message
      );
      return;
    }

    dispatch(loginSuccess(data.user));
    alert(language === 'az'
      ? 'Qeydiyyat uğurla tamamlandı! Hesaba yönləndirilirsiniz...'
      : 'Signup successful! Redirecting to account...'
    );
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
                en="Sign up to continue to the Mercedes-AMG PETRONAS F1 Team shop."
                az="Mercedes-AMG PETRONAS F1 Team mağazasına davam etmək üçün qeydiyyatdan keçin."
              />
            </p>
          </div>

          <div className="form-base">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSignup}>
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
                  <StaticLang en="Sign Up" az="Qeydiyyat" />
                </button>
                <p className="text-light">
                  <StaticLang en="Already have an account?" az="Artıq hesabınız var?" />{' '}
                  <Link to="/login" className="link">
                    <StaticLang en="Log In" az="Daxil Ol" />
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

export default SignUp;
