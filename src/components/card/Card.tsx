import React from 'react';
import { Product } from '../../redux/slices/productSlice';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToLikes, removeProductFromLikes } from '../../redux/slices/likedProductsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils/CurrencyUtil';
import './Card.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const likedProducts = useSelector((state: RootState) => state.likedProducts.likedProducts);
  const currency = useSelector((state: RootState) => state.currency.currentCurrency);

  const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {
    event.stopPropagation();
    if (likedProducts.includes(productId)) {
      dispatch(removeProductFromLikes(productId));
    } else {
      dispatch(addProductToLikes(productId));
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://via.placeholder.com/150';
  };

  return (
    <div className="card" onClick={() => handleCardClick(product.id)}>
      <img
        src={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.name}
        className="card-image"
        onError={handleImageError}
        loading="lazy"
      />
      <button className="like-button" onClick={(event) => handleLikeClick(event, product.id)}>
        {likedProducts.includes(product.id) ? (
          <AiFillHeart size={25} color="black" />
        ) : (
          <AiOutlineHeart size={25} color="black" />
        )}
      </button>
      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-type">{product.type}</p>
        <p className="card-rating">★★★★★ {product.rating}</p>
        <p className="card-price">
          {convertPrice(product.price, currency)} {currency}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
