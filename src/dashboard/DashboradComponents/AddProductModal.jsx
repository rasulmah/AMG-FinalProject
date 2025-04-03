/* eslint-disable react/prop-types */
import { useState } from "react";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../tools/slicers/productSlice";
import supabase from "../../utils/supabase";
import "../../assets/scss/dashboard/_modal.scss";

const AddProductModal = ({ product, onClose, isNew }) => {
  const dispatch = useDispatch();
  
  const [updatedProduct, setUpdatedProduct] = useState({
    title: product?.title || "",
    img: product?.img || "",
    imghover: product?.imghover || "",
    description: product?.description || "",
    colors: product?.colors?.join(", ") || "",
    images: product?.images?.join(", ") || "",
    category: product?.category || "",
    price: product?.price || "",
    trending: product?.trending || "",
    sizes: product?.sizes?.join(", ") || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDoneClick = async () => {
    const { title, img, imghover, description, colors, images, sizes, category,trending, price  } = updatedProduct;
    const colorArray = colors.split(",").map((color) => color.trim());
    const imageArray = images.split(",").map((img) => img.trim());
    const sizeArray = sizes.split(",").map((size)=> size.trim());

    if (!title || !img || !description) {
      swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }

    if (isNew) {
      const { data, error } = await supabase
        .from("products")
        .insert([{ title, img, imghover, description,category, trending, price,  colors: colorArray, images: imageArray, sizes: sizeArray }])
        .select();

      if (error) {
        swal.fire("Error!", error.message, "error");
      } else {
          swal.fire('Success!', 'Product added successfully!', 'success').then(() => {
               window.location.reload();
             });
        dispatch(addProduct(data[0]));
        onClose();
      }
    } else {
      const { data, error } = await supabase
        .from("products")
        .update({ title, img, imghover, description, colors: colorArray, images: imageArray, sizes: sizeArray })
        .eq("id", product.id)
        .select();

      if (error) {
        swal.fire("Error!", error.message, "error");
      } else {
          swal.fire('Success!', 'Product added successfully!', 'success').then(() => {
               window.location.reload();
             });
        dispatch(editProduct(data[0]));
        onClose();
      }
    }
  };

  return (
    <div className="modal-overlay" /* onClick={onClose} */>
      <div className="modal-content " onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <i className="fa-regular fa-circle-xmark" />
          </button>
        </div>
        <div className="modal-body  d-flex flex-column justify-content-between">
          <h3>{isNew ? "Add Product" : "Edit Product"}</h3>

        
          <div className="sides-body d-flex gap-4">

            <div className="left-side d-flex flex-column gap-2">
                <div className="form-group">
                  <label htmlFor="title"><i className="fa-solid fa-heading"></i>Title</label>
                  <input type="text" id="title" name="title" value={updatedProduct.title} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category"><i className="fa-solid fa-list"></i>Category</label>
                  <input type="text" id="category" name="category" value={updatedProduct.category} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="colors"><i className="fa-solid fa-palette"></i>Colors (comma separated)</label>
                  <input type="text" id="colors" name="colors" value={updatedProduct.colors} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="trending"><i className="fa-solid fa-money-bill-trend-up"></i>Trending: <span>type `true` or `false`</span></label>
                  <input type="text" id="trending" name="trending" value={updatedProduct.trending} onChange={handleChange} />
                </div>

                <div className="group-some d-flex gap-2">
                <div className="form-group">
                  <label htmlFor="sizes"><i className="fa-solid fa-maximize"></i>Sizes: <span>(Comma separated)</span></label>
                  <input type="text" id="sizes" name="sizes" value={updatedProduct.sizes} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="price"><i className="fa-solid fa-dollar-sign"></i>Price</label>
                  <input type="text" id="price" name="price" value={updatedProduct.price} onChange={handleChange} />
                </div>
                </div>

                


                <div className="form-group">
                  <label htmlFor="description"><i className="fa-solid fa-circle-info"></i>Description</label>
                  <textarea id="description" name="description" value={updatedProduct.description} onChange={handleChange} />
                </div>
            </div>


            <div className="right-side d-flex flex-column gap-2">
            <div className="form-group">
            <label htmlFor="img"><i className="fa-solid fa-image"></i>Image URL</label>
            <textarea id="img" name="img" value={updatedProduct.img} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="imghover"><i className="fa-solid fa-photo-film"></i>Image Hover URL</label>
            <textarea type="text" id="imghover" name="imghover" value={updatedProduct.imghover} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="images"><i className="fa-regular fa-images"></i>Images <span>(comma separated URLs)</span></label>
            <textarea type="text" id="images" name="images" value={updatedProduct.images} onChange={handleChange} />
          </div>
          
            </div>
          </div>

          

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="done-btn" onClick={handleDoneClick}>Done</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

