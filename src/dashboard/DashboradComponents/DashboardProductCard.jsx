/* eslint-disable react/prop-types */
import { useState } from 'react';
import swal from 'sweetalert2';
import '../../assets/scss/dashboard/_dashcard.scss';
import StaticLang from '../../utils/StaticLang';
import { useLang } from '../../context/LangContext';

const DashboardProductCard = ({ product, onEdit, onDelete }) => {
  const { title, img } = product;
  const [showFullTitle, setShowFullTitle] = useState(false);
  const { language } = useLang(); // get current lang

  const handleTitleClick = () => {
    setShowFullTitle(!showFullTitle);
  };

  // Handle delete confirmation and action
  const handleDelete = async (productId) => {
    const result = await swal.fire({
      title: language === 'az' 
        ? 'Bu məhsulu silmək istədiyinizə əminsiniz?' 
        : 'Are you sure you want to delete this product?',
      text: language === 'az' 
        ? 'Bu əməliyyat geri qaytarıla bilməz.' 
        : 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: language === 'az' ? 'Bəli, sil' : 'Yes, delete it!',
      cancelButtonText: language === 'az' ? 'Ləğv et' : 'Cancel',
    });

    if (result.isConfirmed) {
      onDelete(productId);
      swal.fire({
        title: language === 'az' ? 'Silindi!' : 'Deleted!',
        text: language === 'az' 
          ? 'Məhsul uğurla silindi.' 
          : 'Product has been deleted.',
        icon: 'success',
      });
    }
  };

  return (
    <div className="dash-card-container d-flex flex-column align-items-center">
      <div className="d-img-container">
        <img src={img} alt="" className="dash-img" />
      </div>
      <div className="text-and-buttons d-flex flex-column justify-content-between">
        <p
          className={`d-prod-title ${showFullTitle ? 'full-title' : ''}`}
          onClick={handleTitleClick}
          title={title}
        >
          {showFullTitle ? title : title.length > 15 ? title.slice(0, 15) + '...' : title}
        </p>
        <div className="editor-buttons">
          <button className="edit-btn" onClick={() => onEdit(product)}>
            <StaticLang en="Edit" az="Redaktə" />
          </button>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product.id);
            }}
          >
            <StaticLang en="Delete" az="Sil" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductCard;
