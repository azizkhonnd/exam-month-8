import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearProduct, fetchProductsByType } from '../../redux/slices/productSlice';
import { RootState, AppDispatch } from '../../redux/store';
import SuspenseComponent from '../../utils';
import { convertPrice } from '../../utils/CurrencyUtil';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { addProductToLikes, removeProductFromLikes } from '../../redux/slices/likedProductsSlice';
import './SingleProduct.scss';

const placeholderImage = 'https://via.placeholder.com/150';

const SingleProduct = () => {
    const { product_id } = useParams<{ product_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading, error } = useSelector((state: RootState) => state.products);
    const { productsByType, loadingByType } = useSelector((state: RootState) => state.products);
    const likedProducts = useSelector((state: RootState) => state.likedProducts.likedProducts);
    const currency = useSelector((state: RootState) => state.currency.currentCurrency);

    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductById(product_id));
        }

        dispatch(fetchProductsByType('all'));

        return () => {
            dispatch(clearProduct());
        };
    }, [product_id, dispatch]);

    ;

    if (loading) {
        return (
            <div className="loading-container">
                <SuspenseComponent />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    const highRatingProducts = productsByType['all']?.filter((p) => p.rating >= 4.5) || [];

    const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {
        event.stopPropagation();
        if (likedProducts.includes(productId)) {
            dispatch(removeProductFromLikes(productId));
        } else {
            dispatch(addProductToLikes(productId));
        }
    };


    return (
        <div className='container'>
            <div className='line'></div>
            <div className="single-product-page">
                <div className="single-product">
                    <div>
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-type">{product.type}</p>
                        <p className="product-rating">★★★★★ {product.rating}</p>
                    </div>
                    <div className="product-details">
                        <img src={product.imageUrl || placeholderImage} alt={product.name} className="product-image-small" />
                    </div>
                    <div className='product__info'>
                        <button className="like-button-small" onClick={(event) => handleLikeClick(event, product.id)}>
                            {likedProducts.includes(product.id) ? (
                                <AiFillHeart size={25} color="black" />
                            ) : (
                                <AiOutlineHeart size={25} color="black" />
                            )}
                        </button>
                        <p className="product-price">{convertPrice(product.price, currency)} {currency}</p>
                        <p className="product-code">код товара: {product.id}</p>
                        <div className='buy__btn'>
                            <button className="add-to-cart-button">Купить</button>
                        </div>
                    </div>
                </div>
                <div className='product__description-container'>
                    <p className="product-description">{product.description || 'No description available'}</p>
                </div>

                {highRatingProducts.length > 0 && (
                    <div className="high-rating-products">
                        <h2>Recommended High Rating Products</h2>
                        {loadingByType['all'] ? (
                            <div className="loading-container">
                                <SuspenseComponent />
                            </div>
                        ) : (
                            <div className="recommended-products-grid">
                                {highRatingProducts.map((prod) => (
                                    <div className="card" key={prod.id}>
                                        <img
                                            src={prod.imageUrl || placeholderImage}
                                            alt={prod.name}
                                            className="card-image"
                                        />
                                        <button
                                            className="like-button"
                                            onClick={(event) => handleLikeClick(event, prod.id)}
                                        >
                                            {likedProducts.includes(prod.id) ? (
                                                <AiFillHeart size={25} color="black" />
                                            ) : (
                                                <AiOutlineHeart size={25} color="black" />
                                            )}
                                        </button>
                                        <div className="card-info">
                                            <h3 className="card-title-category">{prod.name}</h3>
                                            <p className="card-price">{convertPrice(prod.price, currency)} {currency}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProduct;
