import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByType } from "../../redux/slices/productSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { Spin } from 'antd';
import { convertPrice } from '../../utils/CurrencyUtil';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { addProductToLikes, removeProductFromLikes } from '../../redux/slices/likedProductsSlice';
import './Categories.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import { BsCartXFill } from "react-icons/bs";

const Categories = () => {
    const { product_type } = useParams<{ product_type: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [carouselIndex, setCarouselIndex] = useState<number>(0);

    const productsByType = useSelector((state: RootState) => state.products.productsByType);
    const productsByBrand = useSelector((state: RootState) => state.products.productsByBrand);
    const loadingByType = useSelector((state: RootState) => state.products.loadingByType);
    const loadingByBrand = useSelector((state: RootState) => state.products.loadingByBrand);
    const error = useSelector((state: RootState) => state.products.error);
    const likedProducts = useSelector((state: RootState) => state.likedProducts.likedProducts);
    const currency = useSelector((state: RootState) => state.currency.currentCurrency);

    useEffect(() => {
        if (product_type) {
            dispatch(fetchProductsByType(product_type));
        }
    }, [product_type, dispatch]);

    useEffect(() => {
        const savedIndex = localStorage.getItem('carouselIndex');
        if (savedIndex) {
            setCarouselIndex(Number(savedIndex));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('carouselIndex', carouselIndex.toString());
    }, [carouselIndex]);

    const products = Object.keys(productsByBrand).length > 0
        ? Object.values(productsByBrand).flat()
        : (productsByType[product_type || ''] || []);

    const loading = Object.keys(productsByBrand).length > 0
        ? Object.values(loadingByBrand).some(isLoading => isLoading)
        : loadingByType[product_type || ''];

    const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

    const handleCardClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {
        event.stopPropagation();
        if (likedProducts.includes(productId)) {
            dispatch(removeProductFromLikes(productId));
        } else {
            dispatch(addProductToLikes(productId));
        }
    };

    return (
        <div className="categories__wrapper">
            <Sidebar />
            <div className="categories__content container">
                <div className="carousel__container"></div>
                <div className="products__grid">
                    {loading ? (
                        <div className="loading__container">
                            <Spin size="large" />
                        </div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : sortedProducts.length === 0 ? (
                        <div className="no-products__container">
                            <p><BsCartXFill size={50} /></p>
                            <p className="no-products__text">Товары не найдены</p>
                        </div>
                    ) : (
                        sortedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="product__card"
                                onClick={() => handleCardClick(product.id)}
                            >
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    className="product__image"
                                />
                                {product.rating >= 4.5 && <span className="product__hit-label">Hit</span>}
                                <button
                                    className="product__like-button"
                                    onClick={(event) => handleLikeClick(event, product.id)}
                                >
                                    {likedProducts.includes(product.id) ? (
                                        <AiFillHeart size={25} color="black" />
                                    ) : (
                                        <AiOutlineHeart size={25} color="black" />
                                    )}
                                </button>
                                <div className="product__info">
                                    <h3 className="product__title">{product.name}</h3>
                                    <p className="product__rating">★★★★★ {product.rating}</p>
                                    <p className="product__brand">{product.brand}</p>
                                    <p className="product__price">{convertPrice(product.price, currency)} {currency}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;
