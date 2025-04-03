import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../tools/slicers/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../../utils/supabase';
import Swal from 'sweetalert2';  
import '../../assets/scss/pages/_account.scss';

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out? All your wishlist and basket data will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
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
    <>
      <div className="account-container">
        <div className="account-card">
          <h2 className="text-light text-center">Account</h2>
          {user ? (
            <div className="text-center">
              <p className="mb-3 text-light">Welcome to your account <span className='email-text'>{user.email}</span> </p>
              <button onClick={handleLogout} className="">Logout</button>
            </div>
          ) : (
            <div className="text-center">
              <p>Please log in to view your account.</p>
              <Link to="/login" className="btn btn-primary w-100">Go to Login</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;

