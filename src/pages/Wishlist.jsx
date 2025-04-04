import "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../tools/slicers/wishlistSlice";
import "../assets/scss/pages/_wishlist.scss";
import SubscribeSec from "../components/SectionComponents/SubscribeSec";
import FeatureSlider from "../components/Sliders/FeatureSlider";
import WishlistCard from "../components/Cards/WishlistCard";
import { Link } from "react-router-dom";
import StaticLang from "../utils/StaticLang";

const Wishlist = () => {
  const wishlistProducts = useSelector((state) => state.wishlist.wishlistProducts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-container">
      <div>
        <div className="heading-wishlist text-center d-flex flex-column justify-content-center align-items-center gap-2">
          <h2 className="wishlist-text">
            <StaticLang en="Love It? Add it to My Wishlist" az="Bəyəndin? İstək siyahına əlavə et" />
          </h2>
          <p className="text-center small-text">
            <StaticLang en="Want it? Add to the wishlist" az="İstəyirsən? Siyahıya əlavə et" />
          </p>
          {!user && (
            <Link to={"/login"} className="wishlist-log-in-button">
              <StaticLang en="LOG IN / SIGN UP" az="DAXİL OL / QEYDİYYAT" />
            </Link>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <p className="text-center text-light">
            <StaticLang en="Your wishlist is empty." az="İstək siyahınız boşdur." />
          </p>
        ) : (
          <div className="wishlist-cards-container">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="product-container-wishlist">
                <button
                  className="button-cancel-wish"
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  aria-label="Remove from wishlist"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <WishlistCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="subscribe d-flex justify-content-between align-items-center flex-column">
        <SubscribeSec />
      </section>

      <div className="about-store-delivery-payment">
        <FeatureSlider />
      </div>
    </div>
  );
};

export default Wishlist;
