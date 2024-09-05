import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByBrand, fetchProducts } from '../../redux/slices/productSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './Sidebar.scss';

const Sidebar = () => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const brands = products.length > 0
        ? [...new Set(products.map(product => product.brand))].filter(Boolean)
        : [];

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prevBrands => {
            const updatedBrands = prevBrands.includes(brand)
                ? prevBrands.filter(b => b !== brand)
                : [...prevBrands, brand];

            if (updatedBrands.length > 0) {
                dispatch(fetchProductsByBrand(updatedBrands.join(',')));
            } else {
                dispatch(fetchProducts());
            }

            return updatedBrands;
        });
    };

    return (
        <div className="container sidebar">
            <ul className="brand-list container">
                {brands.length > 0 ? (
                    brands.map((brand, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={brand}
                                    onChange={() => handleBrandChange(brand)}
                                    checked={selectedBrands.includes(brand)}
                                />
                                {brand}
                            </label>
                        </li>
                    ))
                ) : (
                    <p>Бренды не найдены</p>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
