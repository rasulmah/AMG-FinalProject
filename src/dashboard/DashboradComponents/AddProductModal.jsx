/* eslint-disable react/prop-types */
import { useState } from "react";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../tools/slicers/productSlice";
import supabase from "../../utils/supabase";
import { useLang } from "../../context/LangContext";
import "../../assets/scss/dashboard/_modal.scss";
import StaticLang from "../../utils/StaticLang";

const AddProductModal = ({ product, onClose, isNew }) => {
  const dispatch = useDispatch();
  const { language } = useLang();

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
    const { title, img, imghover, description, colors, images, sizes, category, trending, price } = updatedProduct;
    const colorArray = colors.split(",").map((color) => color.trim());
    const imageArray = images.split(",").map((img) => img.trim());
    const sizeArray = sizes.split(",").map((size) => size.trim());

    if (!title || !img || !description) {
      swal.fire({
        icon: "error",
        title: language === "az" ? "Xəta!" : "Error!",
        text: language === "az" ? "Zəhmət olmasa bütün tələb olunan sahələri doldurun." : "Please fill all required fields.",
      });
      return;
    }

    if (isNew) {
      const { data, error } = await supabase
        .from("products")
        .insert([{ title, img, imghover, description, category, trending, price, colors: colorArray, images: imageArray, sizes: sizeArray }])
        .select();

      if (error) {
        swal.fire({
          icon: "error",
          title: language === "az" ? "Xəta!" : "Error!",
          text: error.message
        });
      } else {
        swal.fire({
          icon: "success",
          title: language === "az" ? "Uğurla əlavə olundu!" : "Success!",
          text: language === "az" ? "Məhsul uğurla əlavə edildi!" : "Product added successfully!",
        }).then(() => {
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
        swal.fire({
          icon: "error",
          title: language === "az" ? "Xəta!" : "Error!",
          text: error.message
        });
      } else {
        swal.fire({
          icon: "success",
          title: language === "az" ? "Uğurla yeniləndi!" : "Success!",
          text: language === "az" ? "Məhsul uğurla yeniləndi!" : "Product updated successfully!",
        }).then(() => {
          window.location.reload();
        });

        dispatch(editProduct(data[0]));
        onClose();
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <i className="fa-regular fa-circle-xmark" />
          </button>
        </div>

        <div className="modal-body d-flex flex-column justify-content-between">
          <h3>{isNew ? (language === "az" ? "Məhsul əlavə et" : "Add Product") : (language === "az" ? "Məhsulu redaktə et" : "Edit Product")}</h3>

          <div className="sides-body d-flex gap-4">
            {/* Left Side */}
            <div className="left-side d-flex flex-column gap-2">
              <div className="form-group">
                <label htmlFor="title"><i className="fa-solid fa-heading"></i><StaticLang en="Title" az="Başlıq" />  </label>
                <input type="text" id="title" name="title" value={updatedProduct.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">
                  <i className="fa-solid fa-list"></i>{" "}
                  <StaticLang en="Category" az="Kateqoriya" />
                </label>
                <input type="text" id="category" name="category" value={updatedProduct.category} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="colors">
                  <i className="fa-solid fa-palette"></i>{" "}
                  <StaticLang
                    en="Colors (comma separated)"
                    az="Rənglər (vergüllə ayırın)"
                  />
                </label>

                <input type="text" id="colors" name="colors" value={updatedProduct.colors} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="trending">
                  <i className="fa-solid fa-money-bill-trend-up"></i>{" "}
                  <StaticLang en="Trending" az="Trenddə" />{" "}
                  <span>
                    (<StaticLang en="true or false" az="true və ya false" />)
                  </span>
                </label>

                <input type="text" id="trending" name="trending" value={updatedProduct.trending} onChange={handleChange} />
              </div>
              <div className="group-some d-flex gap-2">
                <div className="form-group">
                  <label htmlFor="sizes">
                    <i className="fa-solid fa-maximize"></i>{" "}
                    <StaticLang en="Sizes" az="Ölçülər" />{" "}
                    <span>
                      (<StaticLang en="comma separated" az="vergüllə ayırın" />)
                    </span>
                  </label>

                  <input type="text" id="sizes" name="sizes" value={updatedProduct.sizes} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="price">
                    <i className="fa-solid fa-dollar-sign"></i>{" "}
                    <StaticLang en="Price" az="Qiymət" />
                  </label>

                  <input type="text" id="price" name="price" value={updatedProduct.price} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  <i className="fa-solid fa-circle-info"></i>{" "}
                  <StaticLang en="Description" az="Təsvir" />
                </label>

                <textarea id="description" name="description" value={updatedProduct.description} onChange={handleChange} />
              </div>
            </div>

            {/* Right Side */}
            <div className="right-side d-flex flex-column gap-2">
              <div className="form-group">
                <label htmlFor="img">
                  <i className="fa-solid fa-image"></i>{" "}
                  <StaticLang en="Image URL" az="Şəkil URL-si" />
                </label>

                <textarea id="img" name="img" value={updatedProduct.img} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="imghover">
                  <i className="fa-solid fa-photo-film"></i>{" "}
                  <StaticLang en="Hover Image URL" az="Hover Şəkil URL-si" />
                </label>

                <textarea id="imghover" name="imghover" value={updatedProduct.imghover} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="images">
                  <i className="fa-regular fa-images"></i>{" "}
                  <StaticLang en="Images" az="Şəkillər" />{" "}
                  <span>
                    (<StaticLang en="comma separated" az="vergüllə ayırın" />)
                  </span>
                </label>
                <textarea id="images" name="images" value={updatedProduct.images} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              {language === "az" ? "Ləğv et" : "Cancel"}
            </button>
            <button className="done-btn" onClick={handleDoneClick}>
              {language === "az" ? "Təsdiqlə" : "Done"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
