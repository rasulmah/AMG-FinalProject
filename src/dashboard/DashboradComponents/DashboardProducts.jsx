import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProduct } from "../../tools/slicers/productSlice";
import DashboardProductCard from "./DashboardProductCard";
import '../../assets/scss/dashboard/_pagination.scss'
import AddProductModal from "./AddProductModal"; // Use correct modal
import StaticLang from "../../utils/StaticLang";

const DashboardProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(21); // Default to 10 items per page

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1180) setItemsPerPage(18);
      else if (width >= 1000) setItemsPerPage(15);
      else if (width >= 900) setItemsPerPage(12);
      else if (width >=800) setItemsPerPage(12);
      else if (width >= 700) setItemsPerPage(9);
      else if (width >= 560) setItemsPerPage(6);
      else setItemsPerPage(4); // Default to 4 for very small screens
    };

    updateItemsPerPage(); // Set initial value
    window.addEventListener("resize", updateItemsPerPage); // Listen for screen resize

    return () => window.removeEventListener("resize", updateItemsPerPage); // Cleanup
  }, []);

  const handleDeleteProduct = async (productId) => {
    await dispatch(deleteProduct(productId));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsAdding(false);
  };

  const handleAddProduct = () => {
    setIsAdding(true);
  };

  if (loading) return <p>Loading products...</p>;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice products for the current page
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="dashboard-products d-flex flex-column align-items-center">
      <h3 className="text-light h2 pb-2 text-center"><StaticLang en="Products" az="Məhsullar" /></h3>

      <div className="add-product">
        <button className="add-product-button" onClick={handleAddProduct}>
          <StaticLang en="Add product +" az="Məhsul Əlavə et +" />
        </button>
      </div>

      <div className="product-grid">
        {displayedProducts.map((product) => (
          <DashboardProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {(selectedProduct || isAdding) && (
        <AddProductModal product={selectedProduct} onClose={handleCloseModal} isNew={isAdding} />
      )}
    </div>
  );
};

export default DashboardProducts;




