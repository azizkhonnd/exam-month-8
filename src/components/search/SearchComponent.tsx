import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../redux/slices/productSlice';
import { RootState, AppDispatch } from '../../redux/store'; 
import './Search.scss';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch: AppDispatch = useDispatch(); 
    const navigate = useNavigate();
    const searchResults = useSelector((state: RootState) => state.products.searchResults);
    const loading = useSelector((state: RootState) => state.products.loading);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(searchProducts(query.trim()));
        }
    };

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="search__container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                />
                <button type="submit">
                    <BiSearch size={20} />
                </button>
            </form>
            {loading && <p>Loading...</p>}
            <div className="search__results">
                {searchResults.map(product => (
                    <div 
                        key={product.id} 
                        className="search__result" 
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img src={product.imageUrl} alt={product.name} />
                        <span>{product.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
