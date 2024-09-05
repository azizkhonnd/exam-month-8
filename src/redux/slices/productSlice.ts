/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    type: string;
    rating: number;
    brand: string;
    description?: string;
}

interface ProductState {
    products: Product[];
    product: Product | null;
    productsByType: Record<string, Product[]>;
    productsByBrand: Record<string, Product[]>;
    searchResults: Product[];
    loading: boolean;
    loadingByType: Record<string, boolean>;
    loadingByBrand: Record<string, boolean>;
    error: string | null;
    cartItems: Product[];
}

const initialState: ProductState = {
    products: [],
    product: null,
    productsByType: {},
    productsByBrand: {},
    searchResults: [],
    loading: false,
    loadingByType: {},
    loadingByBrand: {},
    error: null,
    cartItems: [],
};

// Async thunks
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
    const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
    return response.data.slice(0, 100).map((product: any) => ({
        id: product.id,
        imageUrl: product.image_link,
        name: product.name,
        price: parseFloat(product.price) || 0,
        type: product.product_type || 'Unknown',
        rating: product.rating || 0,
        brand: product.brand || 'Unknown',
    }));
});

export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (productId) => {
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`);
        const product = response.data;
        return {
            id: product.id,
            imageUrl: product.image_link,
            name: product.name,
            price: parseFloat(product.price) || 0,
            type: product.product_type || 'Unknown',
            rating: product.rating || 0,
            brand: product.brand || 'Unknown',
            description: product.description || '',
        };
    }
);

export const fetchProductsByType = createAsyncThunk<Product[], string>(
    'products/fetchProductsByType',
    async (type) => {
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`);
        return response.data.map((product: any) => ({
            id: product.id,
            imageUrl: product.image_link,
            name: product.name,
            price: parseFloat(product.price) || 0,
            type: product.product_type || 'Unknown',
            rating: product.rating || 0,
            brand: product.brand || 'Unknown',
        }));
    }
);

export const fetchProductsByBrand = createAsyncThunk<Product[], string>(
    'products/fetchProductsByBrand',
    async (brand) => {
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`);
        return response.data.map((product: any) => ({
            id: product.id,
            imageUrl: product.image_link,
            name: product.name,
            price: parseFloat(product.price) || 0,
            type: product.product_type || 'Unknown',
            rating: product.rating || 0,
            brand: product.brand || 'Unknown',
        }));
    }
);

export const searchProducts = createAsyncThunk<Product[], string>(
    'products/searchProducts',
    async (query) => {
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?search=${query}`);
        return response.data.map((product: any) => ({
            id: product.id,
            imageUrl: product.image_link,
            name: product.name,
            price: parseFloat(product.price) || 0,
            type: product.product_type || 'Unknown',
            rating: product.rating || 0,
            brand: product.brand || 'Unknown',
        }));
    }
);

// Slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            state.cartItems.push(action.payload);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearProduct(state) {
            state.product = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching products';
            })

            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.product = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching product';
            })

            .addCase(fetchProductsByType.pending, (state, action) => {
                state.loadingByType[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(fetchProductsByType.fulfilled, (state, action) => {
                state.productsByType[action.meta.arg] = action.payload;
                state.loadingByType[action.meta.arg] = false;
            })
            .addCase(fetchProductsByType.rejected, (state, action) => {
                state.loadingByType[action.meta.arg] = false;
                state.error = action.error.message || 'Error fetching products by type';
            })

            .addCase(fetchProductsByBrand.pending, (state, action) => {
                state.loadingByBrand[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
                state.productsByBrand[action.meta.arg] = action.payload;
                state.loadingByBrand[action.meta.arg] = false;
            })
            .addCase(fetchProductsByBrand.rejected, (state, action) => {
                state.loadingByBrand[action.meta.arg] = false;
                state.error = action.error.message || 'Error fetching products by brand';
            })

            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.searchResults = action.payload;
                state.loading = false;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error searching products';
            });
    },
});

export const { addToCart, removeFromCart, clearProduct } = productSlice.actions;
export default productSlice.reducer;
