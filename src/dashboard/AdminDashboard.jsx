import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesData } from '../tools/slicers/dashboardSlice'; 
import { logout } from '../tools/slicers/authSlice';
import supabase from '../utils/supabase';
import '../assets/scss/dashboard/_dashboard.scss'
import DashbordProducts from './DashboradComponents/DashboardProducts';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  totalSales, totalRevenue, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchSalesData());
  }, [dispatch]);

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
      navigate('/login');
 
      window.location.reload(); 

      
      
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger py-4">
        <h3>Error: {error}</h3>
      </div>
    );
  }

  return (
    <div className='dashboard-container'>

      <div className="header-container">
      <div className="dashboard-header d-flex justify-content-between align-items-center">
      <div className="logo d-flex justfiy-content-center align-items-center gap-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png" alt="" />
        <Link to={'/'} className='h3'>Dashboard</Link>
      </div>
      <div className="dashboard-menu">
        <ul className='d-flex'>
          <li className='d-menu-item'><a href="#dashboard-stats">Stats</a></li>
          <li className='d-menu-item'><a href="#dashboard-products">Products</a></li>
          <li onClick={handleLogout} className='d-menu-item'><button className=''>Log out</button></li>
        </ul>
      </div>
    </div>
      </div>
   


    <section id="dashboard-stats">
      <div className="stats-container d-flex flex-column align-items-center">
        <h2 className="text-center">Statistics</h2>

              <div className="stats-card-container  gap-3">
              <div className="stats-card d-flex flex-column gap-4">
                <div className="income-photo"><i className="fa-solid fa-coins" /></div>
                <p className="d-text">Total Sales: {totalSales}</p>
              </div>

              <div className="stats-card d-flex flex-column gap-4">
                <div className="revenue-photo"><i className="fa-solid fa-chart-pie" /></div>
                <p className="d-text">Total Revenue: ${totalRevenue.toFixed(2)}</p>
              </div>
              </div>
        <button className='stats-button'>Enter Data</button>

              

      </div>
    </section>

    <section className="" id="dashboard-products">
        <DashbordProducts></DashbordProducts>
    </section>
    
    </div>
  );
};

export default AdminDashboard;
