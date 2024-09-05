import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { RootState, AppDispatch } from '../../redux/store';
import ProductCard from '../card/Card';
import { Spin } from 'antd';
import './ProductList.scss';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <div>Error loading products: {error}</div>;
    }

    return (
        <div className="container product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
