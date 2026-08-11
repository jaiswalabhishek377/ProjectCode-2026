import React from "react";
import { Link, useParams } from "react-router-dom";

const CategoryPage = () => {
    const { category } = useParams();

    return (
        <div className="py-12 space-y-6 text-center">
            <h2 className="font-heading text-3xl font-extrabold text-white capitalize">
                {category ? `${category} Collection` : "Category Products"}
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
                Full Category product filter view will connect dynamically to backend `/api/products/category/:category` in Section 11!
            </p>
            <Link to="/" className="inline-flex px-6 py-2.5 rounded-xl btn-primary text-xs font-bold">
                Return to Storefront
            </Link>
        </div>
    );
};

export default CategoryPage;
