import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../tools/slicers/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../../utils/supabase';
import Swal from 'sweetalert2';
import '../../assets/scss/pages/_account.scss';
import StaticLang from '../../utils/StaticLang';
import { useLang } from '../../context/LangContext';

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLang();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: language === 'az' ? 'Əminsiniz?' : 'Are you sure?',
      text: language === 'az'
        ? 'Çıxış etmək istədiyinizə əminsiniz? Bütün istək siyahınız və səbət məlumatlarınız silinəcək.'
        : 'Do you really want to log out? All your wishlist and basket data will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: language === 'az' ? 'Bəli, çıxış et' : 'Yes, log me out!',
      cancelButtonText: language === 'az' ? 'Ləğv et' : 'Cancel',
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      dispatch(logout());
      localStorage.clear();
      window.location.reload();
      navigate('/login');
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="text-light text-center">
          <StaticLang en="Account" az="Hesab" />
        </h2>

        {user ? (
          <div className="text-center">
            <p className="mb-3 text-light">
              <StaticLang en="Welcome to your account" az="Hesabınıza xoş gəlmisiniz" />{' '}
              <span className="email-text">{user.email}</span>
            </p>
            <button onClick={handleLogout} className="">
              <StaticLang en="Logout" az="Çıxış" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p>
              <StaticLang en="Please log in to view your account." az="Hesabınızı görmək üçün daxil olun." />
            </p>
            <Link to="/login" className="">
              <StaticLang en="Go to Login" az="Daxil Ol" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;


