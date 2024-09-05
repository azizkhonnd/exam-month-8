import { MdRemoveShoppingCart } from "react-icons/md"; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProductById, Product } from '../../redux/slices/productSlice';
import ProductCard from '../../components/card/Card'; 
import { Spin, Alert } from 'antd';
import './LikedProducts.scss'

const LikedProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const likedProductIds = useSelector((state: RootState) => state.likedProducts.likedProducts);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      setLoadingProducts(true);
      setErrorLoading(null);
      try {
        const fetchedProducts: Product[] = [];
        for (const id of likedProductIds) {
          const responseAction = await dispatch(fetchProductById(id));
          if (fetchProductById.fulfilled.match(responseAction)) {
            fetchedProducts.push(responseAction.payload);
          } else {
            console.error(`Failed to fetch product with ID: ${id}`);
          }
        }
        setLikedProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        setErrorLoading('Failed to load liked products.');
      } finally {
        setLoadingProducts(false);
      }
    };
    
    if (likedProductIds.length > 0) {
      fetchLikedProducts();
    } else {
      setLikedProducts([]);
    }
  }, [dispatch, likedProductIds]);

  if (loadingProducts) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (errorLoading) {
    return (
      <Alert
        message="Error"
        description={errorLoading}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="liked-products-page container">
      {likedProducts.length === 0 ? (
        <div className="no-liked-products">
          <MdRemoveShoppingCart size={100} />
          <p>No liked products yet!</p>
        </div>
      ) : (
        <div className="products-grid">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProductsPage;
