/* eslint-disable react/prop-types */
import { useState } from 'react';
import swal from 'sweetalert2';
import '../../assets/scss/dashboard/_dashcard.scss';

const DashboardProductCard = ({ product, onEdit, onDelete }) => {
  const { title, img } = product;
  const [showFullTitle, setShowFullTitle] = useState(false);

  const handleTitleClick = () => {
    setShowFullTitle(!showFullTitle);
  };

  // Handle delete confirmation and action
  const handleDelete = async (productId) => {
    const result = await swal.fire({
      title: 'Are you sure you want to delete this product?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      // Trigger delete action from parent component
      onDelete(productId);
      swal.fire('Deleted!', 'Product has been deleted.', 'success');
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
          title={title} // optional, shows full text on hover
        >
          {showFullTitle ? title : title.length > 15 ? title.slice(0, 15) + '...' : title}
        </p>
        <div className="editor-buttons">
          <button className='edit-btn' onClick={() => onEdit(product)}>Edit</button>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event (modal open) when clicking delete
              handleDelete(product.id); // Trigger delete confirmation
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductCard;




