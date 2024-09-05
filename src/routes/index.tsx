import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
const Home = lazy(() => import('./home/Home'));
const Categories = lazy(() => import('./categories/Categories'));
const SingleProduct = lazy(() => import('./single-product/SingleProduct'));
const LikedProducts = lazy(() => import('./liked-products/LikedProducts'));

const RouteController = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {useRoutes([
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/categories/:product_type",
                    element: <Categories />,
                },
                {
                    path: "/product/:product_id",
                    element: <SingleProduct />,
                },
                {
                    path: '/liked-products',
                    element: <LikedProducts />,
                }
            ])}
        </Suspense>
    );
};

export default RouteController;

