import '../assets/scss/layout/_header.scss'
import '../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket } from '../tools/slicers/basketSlice';
import { getAllProducts } from '../tools/slicers/productSlice';
import StaticLang from '../utils/StaticLang';
import { useLang } from '../context/LangContext';


const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { language } = useLang();

    const placeholderforheader = language === 'az' ? 'Məhsul axtar...' : 'Search for products...';

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);



  const { products: allProducts } = useSelector((store) => store.product);
const { products: basketProducts } = useSelector((store) => store.basket); 
const { wishlistProducts } = useSelector((store) => store.wishlist);
const { user } = useSelector((store) => store.auth);

useEffect(() => {
  dispatch(getAllProducts());
  dispatch(calculateBasket());
}, [dispatch]);

const filteredProducts = allProducts
  ?.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .slice(0, 4);

// Submit search to view all matching products
const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (searchTerm.trim()) {
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setShowSuggestions(false);
  }
};

// Close suggestions on click outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);



  const getUserNavLinkSideMenu = () => {
    if (user) {
      return user.role === 'admin' ? (
        <Badge>
        <NavLink to='/dashboard' onClick={closeMenu} className="side-icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <i className="fa-solid text-light fa-screwdriver-wrench" />
        </button> <span className='side-icon-text'><StaticLang en="Editor" az="Admin" /></span> 
        </NavLink>
        </Badge>
      ) : (
        <Badge>
        <NavLink to='/account' onClick={closeMenu} className="side-icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M9.48 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3.434 12.008A3.5 3.5 0 0 1 6.79 9.5h5.427a3.5 3.5 0 0 1 3.365 2.539l1.378 4.824-.961.274-1.379-4.824a2.5 2.5 0 0 0-2.403-1.813H6.79a2.5 2.5 0 0 0-2.397 1.791l-1.434 4.85L2 16.859l1.434-4.85Z" clipRule="evenodd" /></svg>
        </button> <span className='side-icon-text'><StaticLang en="Account" az="Hesab" /></span> 
        </NavLink>
        </Badge>
      );
    }
    return <Badge><NavLink to='/login' onClick={closeMenu} className="side-icon-link">
    <button className="menu-icon d-flex justify-content-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M9.48 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3.434 12.008A3.5 3.5 0 0 1 6.79 9.5h5.427a3.5 3.5 0 0 1 3.365 2.539l1.378 4.824-.961.274-1.379-4.824a2.5 2.5 0 0 0-2.403-1.813H6.79a2.5 2.5 0 0 0-2.397 1.791l-1.434 4.85L2 16.859l1.434-4.85Z" clipRule="evenodd" /></svg>
    </button> <span className='side-icon-text'><StaticLang en="Log In" az="Giriş" /></span> 
    </NavLink></Badge>;
  };

  const getUserNavLink = () => {
    if (user) {
      return user.role === 'admin' ? (
        <NavLink to='/dashboard' className="icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <i className="fa-solid fa-screwdriver-wrench" />
        </button>
        </NavLink>
      ) : (
        <NavLink to='/account' className="icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M9.48 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3.434 12.008A3.5 3.5 0 0 1 6.79 9.5h5.427a3.5 3.5 0 0 1 3.365 2.539l1.378 4.824-.961.274-1.379-4.824a2.5 2.5 0 0 0-2.403-1.813H6.79a2.5 2.5 0 0 0-2.397 1.791l-1.434 4.85L2 16.859l1.434-4.85Z" clipRule="evenodd" /></svg>
        </button>
        </NavLink>
      );
    }
    return <NavLink to='/login' className="icon-link">
    <button className="menu-icon d-flex justify-content-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M9.48 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3.434 12.008A3.5 3.5 0 0 1 6.79 9.5h5.427a3.5 3.5 0 0 1 3.365 2.539l1.378 4.824-.961.274-1.379-4.824a2.5 2.5 0 0 0-2.403-1.813H6.79a2.5 2.5 0 0 0-2.397 1.791l-1.434 4.85L2 16.859l1.434-4.85Z" clipRule="evenodd" /></svg>
    </button>
    </NavLink>;
  };



 

  

  useEffect(()=>{
    dispatch(calculateBasket())
  }, [dispatch])
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) { 
        setVisible(true);
        return;
      }

      if (currentScrollY > prevScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);
  





  
  return (
    <>
    <header className={`header ${!visible ? 'header-hidden' : ''}`}>

      


    <div className="logo-container">
      <div className="logo">
        <Link to='/' className='logo-link'><img src="https://shop-int.mercedesamgf1.com/cdn/shop/files/logo.png?v=1674137725&width=360" alt="logo" /></Link>
      </div>
      </div>
      <nav className='nav d-flex align-items-center justify-content-center'>
        <ul className='navbar d-flex align-items-center'>
          <li className='navbar-item'>
            <NavLink to='/' className='navbar-link'><StaticLang en="Home" az="Ana Səhifə" /></NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/about' className='navbar-link'><StaticLang en="About" az="Haqqımızda" /></NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/products' className='navbar-link'><StaticLang en="Products" az="Məhsullar" /></NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/contact' className='navbar-link'><StaticLang en="Contact" az="Əlaqə" /></NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/FAQ' className='navbar-link'><StaticLang en="FAQ" az="FAQ" /></NavLink>
          </li>
        </ul>
      </nav>


      <div className="menu-container  d-flex justify-content-between align-items-center">

      <div className="form-container">
        <form action="" className="form d-flex align-items-center"  ref={searchRef}  onSubmit={handleSearchSubmit}>
        
        <input
              type="text"
              className="search-bar"
              placeholder={placeholderforheader}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
            />
        <button className='search-icon-btn d-flex align-items-center justify-content-center'><svg className="iconSearch" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="m12.854 12.146 4.5 4.5-.707.708-4.5-4.5.707-.707Z" clipRule="evenodd" /></svg></button>  
  
        </form>
        
      
      </div>

      <div className="menu-icons d-flex justify-content-between align-items-center gap-4">

        <Badge badgeContent={wishlistProducts.length}>
        <NavLink to='/wishlist' className="icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path className="ico-Wishlist_Middle" fill="transparent" fillRule="evenodd" d="M.5 6.143a4.643 4.643 0 0 1 8.214-2.965 4.643 4.643 0 0 1 8.214 2.965c0 1.282-.566 2.398-1.36 3.283-.822.918-2.536 2.687-4.044 4.226a609.753 609.753 0 0 1-2.455 2.49.5.5 0 0 1-.71 0 717.66 717.66 0 0 1-2.455-2.49c-1.508-1.54-3.221-3.308-4.044-4.226C1.066 8.54.5 7.425.5 6.143Z" clipRule="evenodd" /><path className="ico-Wishlist_Outer" fill="currentColor" fillRule="evenodd" d="M5.143 2A4.143 4.143 0 0 0 1 6.143c0 1.127.497 2.129 1.232 2.949.814.908 2.52 2.668 4.03 4.21a611.137 611.137 0 0 0 2.452 2.488 637.037 637.037 0 0 0 2.453-2.488c1.51-1.542 3.215-3.302 4.03-4.21.735-.82 1.232-1.822 1.232-2.95a4.143 4.143 0 0 0-7.33-2.645.5.5 0 0 1-.77 0A4.13 4.13 0 0 0 5.144 2Zm3.571 14.5-.354.352-.228-.229a566.813 566.813 0 0 1-2.585-2.622c-1.505-1.536-3.227-3.313-4.06-4.241C.637 8.81 0 7.58 0 6.143a5.143 5.143 0 0 1 8.714-3.7 5.143 5.143 0 0 1 8.714 3.7c0 1.437-.635 2.666-1.487 3.617-.832.928-2.554 2.705-4.06 4.241a602.406 602.406 0 0 1-2.585 2.623l-.227.228-.355-.352Zm0 0 .355.352a.5.5 0 0 1-.71 0l.355-.352Z" clipRule="evenodd" /></svg>
        </button>
        </NavLink>
        </Badge>


        <Badge  badgeContent={basketProducts.length}>
        <NavLink to='/basket' className="icon-link">
        
        <button className="menu-icon d-flex justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M13.186 6.5H4.76a2 2 0 0 0-1.993 1.834l-.68 8.166h13.82l-.729-8.177A2 2 0 0 0 13.186 6.5Zm2.989 1.734A3 3 0 0 0 13.186 5.5H4.76a3 3 0 0 0-2.99 2.75L1 17.5h16l-.825-9.266Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M9 2.5A2.5 2.5 0 0 0 6.5 5v3.5h-1V5a3.5 3.5 0 1 1 7 0v3.5h-1V5A2.5 2.5 0 0 0 9 2.5Z" clipRule="evenodd" /></svg>
        </button>
        
        
        </NavLink>
        </Badge>

         {getUserNavLink()}

        <button onClick={openMenu} id='open-btn' className="menu-icon  d-flex justify-content-center">
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" d="M1 2h16v1H1zM1 16h16v1H1zM1 9h16v1H1z" /></svg>

        </button>



      </div>

      </div>
       


      
    </header>
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <div className='top-section'>
        <button className="close-btn" onClick={closeMenu}>
        <svg className='text-light' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M15.789 16.498 1.646 2.355l.708-.707 14.142 14.143-.707.707Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M16.496 2.354 2.354 16.496l-.708-.707L15.79 1.647l.707.707Z" clipRule="evenodd" /></svg>

        </button>
        
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}>
            <StaticLang en="Home" az="Ana Səhifə" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
            <StaticLang en="About" az="Haqqımızda" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu}>
            <StaticLang en="Products" az="Məhsullar" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
            <StaticLang en="Contact" az="Əlaqə" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/FAQ" onClick={closeMenu}>
            <StaticLang en="FAQ" az="FAQ" />
            </NavLink>
          </li>
        </ul>
          <div className="form-container">
          <form action="" className="form d-flex align-items-center" ref={searchRef}  onSubmit={handleSearchSubmit}>
          <input
  type="text"
  className="search-bar"
  placeholder={placeholderforheader}
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  }}
/>
          <button className='search-icon-btn d-flex align-items-center justify-content-center'><svg className="iconSearch" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="m12.854 12.146 4.5 4.5-.707.708-4.5-4.5.707-.707Z" clipRule="evenodd" /></svg></button>  
          </form>
          {showSuggestions && filteredProducts.length > 0 && (
  <div className="sidebar-search-suggestions">
    {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="suggestion-link"
                onMouseDown={() => {
                  navigate(`/products/${product.id}`);
                  setSearchTerm('');
                  setShowSuggestions(false);
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background 0.2s",
                }}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="suggestion-image"
                  style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "15px" }}
                />
                <span>{product.title}</span>
              </div>
            ))}
  </div>
)}
          

          </div>
          </div>
          
        
      <div className="sidebar-menuIcons d-flex justify-content-center gap-5 align-items-center">
        <Badge badgeContent={wishlistProducts.length}>
        <NavLink to='/wishlist' onClick={closeMenu} className="side-icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path className="ico-Wishlist_Middle" fill="transparent" fillRule="evenodd" d="M.5 6.143a4.643 4.643 0 0 1 8.214-2.965 4.643 4.643 0 0 1 8.214 2.965c0 1.282-.566 2.398-1.36 3.283-.822.918-2.536 2.687-4.044 4.226a609.753 609.753 0 0 1-2.455 2.49.5.5 0 0 1-.71 0 717.66 717.66 0 0 1-2.455-2.49c-1.508-1.54-3.221-3.308-4.044-4.226C1.066 8.54.5 7.425.5 6.143Z" clipRule="evenodd" /><path className="ico-Wishlist_Outer" fill="currentColor" fillRule="evenodd" d="M5.143 2A4.143 4.143 0 0 0 1 6.143c0 1.127.497 2.129 1.232 2.949.814.908 2.52 2.668 4.03 4.21a611.137 611.137 0 0 0 2.452 2.488 637.037 637.037 0 0 0 2.453-2.488c1.51-1.542 3.215-3.302 4.03-4.21.735-.82 1.232-1.822 1.232-2.95a4.143 4.143 0 0 0-7.33-2.645.5.5 0 0 1-.77 0A4.13 4.13 0 0 0 5.144 2Zm3.571 14.5-.354.352-.228-.229a566.813 566.813 0 0 1-2.585-2.622c-1.505-1.536-3.227-3.313-4.06-4.241C.637 8.81 0 7.58 0 6.143a5.143 5.143 0 0 1 8.714-3.7 5.143 5.143 0 0 1 8.714 3.7c0 1.437-.635 2.666-1.487 3.617-.832.928-2.554 2.705-4.06 4.241a602.406 602.406 0 0 1-2.585 2.623l-.227.228-.355-.352Zm0 0 .355.352a.5.5 0 0 1-.71 0l.355-.352Z" clipRule="evenodd" /></svg>
        </button> <span className='side-icon-text'><StaticLang en="Wishlist" az="Favorilər" /></span> 
        </NavLink>
        </Badge>
        
        <Badge  badgeContent={basketProducts.length}>
        <NavLink to='/basket' onClick={closeMenu} className="side-icon-link">
        <button className="menu-icon d-flex justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="currentColor" fillRule="evenodd" d="M13.186 6.5H4.76a2 2 0 0 0-1.993 1.834l-.68 8.166h13.82l-.729-8.177A2 2 0 0 0 13.186 6.5Zm2.989 1.734A3 3 0 0 0 13.186 5.5H4.76a3 3 0 0 0-2.99 2.75L1 17.5h16l-.825-9.266Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M9 2.5A2.5 2.5 0 0 0 6.5 5v3.5h-1V5a3.5 3.5 0 1 1 7 0v3.5h-1V5A2.5 2.5 0 0 0 9 2.5Z" clipRule="evenodd" /></svg>
        </button> <span className='side-icon-text'><StaticLang en="Basket" az="Səbət" /></span>  
        </NavLink>
        </Badge>



        {getUserNavLinkSideMenu()}
        
        
        </div>
      </div>

      <div className="searchbar-con">
        {showSuggestions && filteredProducts.length > 0 && (
          <div className="search-suggestions">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="suggestion-link"
                onMouseDown={() => {
                  navigate(`/products/${product.id}`);
                  setSearchTerm('');
                  setShowSuggestions(false);
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background 0.2s",
                }}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="suggestion-image"
                  style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "15px" }}
                />
                <span>{product.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>


      {isOpen && <div className="overlay" onClick={closeMenu}></div>}

    


    </>

  );
};

export default Header;
