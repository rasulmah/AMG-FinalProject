// RouterConfig.jsx
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Products from '../pages/Products';
import FAQ from '../pages/FAQ';
import Account from '../pages/Auth/Account';
import AdminDashboard from '../dashboard/AdminDashboard';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import PrivateRoute from '../config/PivateRoute';
import AdminRoute from '../config/AdminRoute';
import Checkout from '../pages/Checkout';
import Basket from '../pages/Basket';
import Wishlist from '../pages/Wishlist';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetails from '../components/ProductsDetails';
import Loading from '../components/Loading'; 
import { useDispatch } from 'react-redux';
import { setLoading } from '../tools/slicers/productSlice'; 
import DashbordProductCard from '../dashboard/DashboradComponents//DashboardProductCard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to top when navigating to a new route
    window.scrollTo(0, 0);

    // Loading state logic for specific pages
    if (['/login', '/signup', '/account', '/dashboard', '/checkout'].includes(pathname)) {
      dispatch(setLoading(true));

      const timer = setTimeout(() => {
        dispatch(setLoading(false));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [pathname, dispatch]);

  return null;
};

const RouterConfig = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Loading /> 
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        
        <Route path='/products/:id' element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protect checkout and account routes */}
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />

        {/* Protect dashboard and its subroutes */}
        <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/edit-products" element={<AdminRoute><DashbordProductCard /></AdminRoute>} />

        <Route path='/faq' element={<FAQ />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default RouterConfig;

