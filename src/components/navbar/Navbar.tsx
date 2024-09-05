import React, { useState, useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { Badge, Select, Modal } from 'antd';
import SuspenseComponent from '../../utils';
import './Navbar.scss';
import SiteLogo from './assets/siteLogo.svg';
import { setCurrency } from '../../redux/slices/currencySlice';
import { CurrencyType } from '../../redux/slices/currencySlice';
import Uzb from './assets/uzb.svg';
import Rus from './assets/rus.svg';
import United from './assets/united-states.svg';
import { searchProducts } from '../../redux/slices/productSlice';
import { Product } from '../../redux/slices/productSlice';

const { Option } = Select;

const Navbar: React.FC = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const likedProductsCount = useSelector((state: RootState) => state.likedProducts.likedProducts.length);
    const currency = useSelector((state: RootState) => state.currency.currentCurrency);
    const searchResults = useSelector((state: RootState) => state.products.searchResults);
    const loading = useSelector((state: RootState) => state.products.loading);

    useEffect(() => {
        if (searchQuery.length >= 3) {
            dispatch(searchProducts(searchQuery));
            setHasSearched(true);
        } else {
            dispatch(searchProducts(''));
            setHasSearched(false);
        }
    }, [searchQuery, dispatch]);

    const isActive = (path: string) => location.pathname === path;

    const handleCurrencyChange = (value: CurrencyType) => {
        dispatch(setCurrency(value));
    };

    const showSearchModal = () => {
        setSearchVisible(true);
    };

    const handleCancel = () => {
        setSearchVisible(false);
        setSearchQuery('');
        setShowAll(false);
        setHasSearched(false);
        dispatch(searchProducts(''));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setShowAll(false);
    };

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
        handleCancel();
    };

    const handleShowMore = () => {
        setShowAll(true);
    };

    const productsToShow = showAll ? searchResults : searchResults.slice(0, 4);
    const showMoreButton = hasSearched && searchResults.length > 4;

    return (
        <div className="navbar__container">
            <div className='container'>
                <section className='navbar'>
                    <div>
                        <Link className='nav__link' to='#'>Бесплатная доставка!</Link>
                    </div>
                    <div className='nav__links'>
                        <Link className='nav__link-main' to='#'>Акции</Link>
                        <Link className='nav__link' to='#'>Доставка и Оплата</Link>
                        <Link className='nav__link' to='#'>О магазине</Link>
                    </div>
                    <div>
                        <Link className='nav__link' to='#'>★ Beauty Club</Link>
                    </div>
                </section>
                <div className='line'></div>
                <section className="navbar__content">
                    <div>
                        <button className="navbar__search" onClick={showSearchModal}>
                            <BiSearch size={30} />
                        </button>
                        <Modal
                            visible={searchVisible}
                            onCancel={handleCancel}
                            footer={null}
                            className="search-modal"
                            width="100%"
                        >
                            <input
                                type="text"
                                placeholder="Более 173 000 товаров"
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="line-navbar"></div>
                            <div className="search-results-container">
                                {searchQuery.length >= 1 && loading && <SuspenseComponent />}
                                {searchQuery.length >= 1 && !loading ? (
                                    searchResults.length > 0 ? (
                                        <div className="search-results">
                                            {productsToShow.map((product: Product) => (
                                                <div
                                                    key={product.id}
                                                    className="search-result"
                                                    onClick={() => handleProductClick(product.id)}
                                                >
                                                    <img src={product.imageUrl} alt={product.name} />
                                                    <div className="search-result-info">
                                                        <div className="search-result-price-container">
                                                            <span className="search-result-name">{product.name}</span>
                                                            <span className="search-result-price">${product.price}</span>
                                                        </div>
                                                        <span className="search-result-rating">★★★★★{product.rating}</span>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    ) : (
                                        <p className="not-found">Product not found</p>
                                    )
                                ) : (
                                    <p className="not-found">Извините, но вы ничего не ввели</p>
                                )}
                                {showMoreButton && !showAll && (
                                    <div className='show-more'>
                                        <button onClick={handleShowMore} className="show-more-button">
                                            Показать больше
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Modal>
                    </div>
                    <div className="navbar__logo">
                        <Link to='/'>
                            <img src={SiteLogo} alt="site logo" width={180} height={80} />
                        </Link>
                    </div>
                    <div className="navbar__icons">
                        <div>
                            <Link to='#'><AiOutlineUser size={30} color="#000" /></Link>
                        </div>
                        <div>
                            <Link to='/liked-products'>
                                <Badge count={likedProductsCount} className="badge">
                                    <BsHandbag size={30} color="#000" />
                                </Badge>
                            </Link>
                        </div>
                        <div>
                            <Select value={currency} onChange={handleCurrencyChange} className="currency-select">
                                <Option value="USD">
                                    <img src={United} alt="United States" />
                                    USD
                                </Option>
                                <Option value="RUB">
                                    <img src={Rus} alt="Russia" />
                                    RUB
                                </Option>
                                <Option value="UZS">
                                    <img src={Uzb} alt="Uzbekistan" />
                                    UZS
                                </Option>
                            </Select>
                        </div>
                    </div>
                </section>
                <section className="navbar__links__section">
                    <div className="navbar__links__content">
                        <Link className={`navbar__link__category ${isActive('/categories/lipstick') ? 'active' : ''}`} to='/categories/lipstick'>Lipstick</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/nail_polish') ? 'active' : ''}`} to='/categories/nail_polish'>Nail Polish</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/mascara') ? 'active' : ''}`} to='/categories/mascara'>Mascara</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/lip_liner') ? 'active' : ''}`} to='/categories/lip_liner'>Lip Liner</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/foundation') ? 'active' : ''}`} to='/categories/foundation'>Foundation</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/eyeshadow') ? 'active' : ''}`} to='/categories/eyeshadow'>Eyeshadow</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/eyeliner') ? 'active' : ''}`} to='/categories/eyeliner'>Eyeliner</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/eyebrow') ? 'active' : ''}`} to='/categories/eyebrow'>Eyebrow</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/bronzer') ? 'active' : ''}`} to='/categories/bronzer'>Bronzer</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/blush') ? 'active' : ''}`} to='/categories/blush'>Blush</Link>
                        <Link className={`navbar__link__category ${isActive('/categories/brands') ? 'active' : ''}`} to='/categories/brands'>Brands</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Navbar;
