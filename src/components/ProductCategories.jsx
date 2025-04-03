
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../tools/slicers/categoryBannersSlice';
import FeaturedColCard from './Cards/FeaturedColCard';
import FeaturedColSlider from './Sliders/FeaturedColSlider';
import '../assets/scss/components/cards/_featuredColCard.scss'
import '../assets/scss/components/sliders/_featuredcolSlider.scss'
import '../assets/scss/pages/_home.scss'


const ProductCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
     <div className="gap-5 ">
       {/* ✅ Display only the first 3 categories */}
       {categories?.slice(0, 3).map((category) => ( 
         <div key={category.id} className="d-flex flex-column align-items-center gap-5">
           <h2 className='text-light'>{category.category}</h2>
           <div className='featured-body d-flex justify-content-start align-items-start'>
             <FeaturedColCard img={category.img} title={category.category} desc={category.desc} />
             <FeaturedColSlider categoryName={category.category} />
           </div>
         </div>
       ))}
     </div>
   );
 };

export default ProductCategories;
