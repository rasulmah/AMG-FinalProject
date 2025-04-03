/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../tools/slicers/productSlice';
import Product from './Product';
import { useLocation } from 'react-router-dom';
import "../assets/scss/pages/_products.scss";
import StaticLang from '../utils/StaticLang';

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const { products } = useSelector((store) => store.product);
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    collection: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = [...new Set(products?.map(product => product.category))];
  const sizes = [...new Set(products?.flatMap(product => product.sizes))];
  const colors = [...new Set(products?.flatMap(product => product.colors))];
  const collections = [...new Set(products?.map(product => product.collection_category || "Others"))];

  const categoryCounts = products?.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  const collectionCounts = products?.reduce((acc, product) => {
    const collectionName = product.collection_category || "Others";
    acc[collectionName] = (acc[collectionName] || 0) + 1;
    return acc;
  }, {});

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const DropdownFilter = ({ title, options, selected, onChange, countMap, isOpen, setOpenDropdown }) => {
    return (
      <div className="filter-dropdown">
        <button className="dropdown-header" onClick={() => setOpenDropdown(isOpen ? null : title)}>
          {title} <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
        {isOpen && (
          <div className="dropdown-content d-flex flex-column justify-content-between gap-1">
            <div>
              {options.map(option => (
                <div key={option}>
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={selected.includes(option)}
                      onChange={() => onChange(option)}
                    />
                    <span className="label-text">
                      {option} {countMap && `(${countMap[option]})`}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div className="filters-header d-flex justify-content-start align-items-start ">
              <button onClick={resetFilters} className="reset-btn-1">Reset Filters </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFilters(prev => ({
      ...prev,
      category: [category]
    }));
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: [],
      size: [],
      color: [],
      collection: []
    });
    setActiveCategory(null);
  };

  const filteredProducts = (products || [])
    .filter(product => {
      const productCollection = product.collection_category || "Others";

      const matchesFilters =
        (filters.category.length === 0 || filters.category.includes(product?.category)) &&
        (filters.size.length === 0 || (product?.sizes || []).some(size => filters.size.includes(size))) &&
        (filters.color.length === 0 || (product?.colors || []).some(color => filters.color.includes(color))) &&
        (filters.collection.length === 0 || filters.collection.includes(productCollection));

      const matchesSearch =
        !searchQuery || product?.title?.toLowerCase().includes(searchQuery);

      return matchesFilters && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'priceLowHigh') return (a?.price || 0) - (b?.price || 0);
      if (sortBy === 'priceHighLow') return (b?.price || 0) - (a?.price || 0);
      return 0;
    });

  return (
    <div className="products-container">
      <div className='text-light'>
        <div className="heading-for-products">
          <p className='tree'>HOME / PRODUCTS</p>
          <h2>{activeCategory || <StaticLang en="Products" az="Məhsullar" />}</h2>
          <p className='abc'><StaticLang en="Our new fanwear brings a refreshed energy, driven by our shared values of innovation and peak performance, with a stylish edge. Taking fanwear into the future, the collection features iconic team colours and comfortable, style-forward silhouettes. We’ve blended a sleek design with high-performance function across our DNA, Premium Sweat, and Woven collections. Style it up and wear your passion with pride." az="Yeni fanat geyimimiz, innovasiya və ən yüksək performans kimi ortaq dəyərlərimizdən qaynaqlanan, dəbli kənarı ilə təzələnmiş enerji gətirir. Fanat geyimlərini gələcəyə götürən kolleksiyada ikonik komanda rəngləri və rahat, üsluba uyğun siluetlər var. Biz DNT, Premium Sweat və Woven kolleksiyalarımızda yüksək performans funksiyası ilə parlaq dizaynı birləşdirdik. Onu üslublandırın və ehtirasınızı qürurla geyinin" /></p>
          <div className=' d-flex w-100 flex-column justify-content-center align-items-center'>
            <div className="categories-by-buttons d-flex gap-2 align-items-center flex-wrap justify-content-center">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="filters-sidebar">
        <div className='d-flex w-100 zz align-items-center'>
          <DropdownFilter
            title="Collection"
            options={collections}
            selected={filters.collection}
            onChange={(value) => handleFilterChange('collection', value)}
            countMap={collectionCounts}
            isOpen={openDropdown === "Collection"}
            setOpenDropdown={setOpenDropdown}
          />
          <DropdownFilter
            title="Category"
            options={categories}
            selected={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
            countMap={categoryCounts}
            isOpen={openDropdown === "Category"}
            setOpenDropdown={setOpenDropdown}
          />
          <DropdownFilter
            title="Size"
            options={sizes}
            selected={filters.size}
            onChange={(value) => handleFilterChange('size', value)}
            isOpen={openDropdown === "Size"}
            setOpenDropdown={setOpenDropdown}
          />
          <DropdownFilter
            title="Colour"
            options={colors}
            selected={filters.color}
            onChange={(value) => handleFilterChange('color', value)}
            isOpen={openDropdown === "Colour"}
            setOpenDropdown={setOpenDropdown}
          />
        </div>
        <div className='sort-by-cont d-flex align-items-center justify-content-end w-50 gap-3'>
          <span className='text-light gg'>Sort By:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products-list">
        <div className="products-header">
          <div className="filters-header d-flex justify-content-center align-items-center py-3">
            <div className='selected-filters'>
              <div className='d-flex gap-2'>
                {Object.entries(filters).flatMap(([filterType, values]) =>
                  values.map(value => (
                    <button
                      key={`${filterType}-${value}`}
                      className="selected-filter-btn"
                      onClick={() => handleRemoveFilter(filterType, value)}
                    >
                      {value} ✖
                    </button>
                  ))
                )}
              </div>
              <div>
                <button onClick={resetFilters} className="reset-btn">Clear Filters</button>
              </div>
            </div>
          </div>
          <div className='div-for-span px-4'>{filteredProducts.length} PRODUCTS</div>
        </div>

        <div className="products-grid-main">
          <div className="main-products">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
