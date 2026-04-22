import { useState } from "react";
import { Link } from "react-router-dom";
import AdminCards from "./AdminCards";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SimpleSiderAdmin from "../components/AdminSiders/SimpleSiderAdmin";

import category_icon from "../Images/category-icon.jpg";
import currency_icon from "../Images/currency-icon.png";
import product_icon from "../Images/product-icon.png";

function AdminPage({ history })
{
    const [isLogin] = useState(localStorage.getItem('jwt'));

    function handleCategoryClick()
    {
        history.push("/admin/category");
    }

    function handleCurrencyClick()
    {
        history.push("/admin/currency");
    }

    function handleProductClick()
    {
        history.push("/admin/product");
    }

    return isLogin ?
        <>
            <AdminHeader />

            <SimpleSiderAdmin />

            <div className="container">
                <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                    <AdminCards
                        image={category_icon}
                        text="This page holds all categories information and control"
                        title="Category"
                        handleClick={handleCategoryClick}
                    />
                    <AdminCards
                        image={currency_icon}
                        text="This page holds all currency information and control"
                        title="Currency"
                        handleClick={handleCurrencyClick}
                    />
                    <AdminCards
                        image={product_icon}
                        text="This page holds all products information and control"
                        title="Products"
                        handleClick={handleProductClick}
                    />

                </div>
            </div>
        </>
        :
        <>
            <SimpleSiderAdmin />
            <h1 style={{ textAlign: "center", fontFamily: "serif" }}>Please Login First</h1>
            <Link to="/auth/admin" style={{ color: "blue" }}>
                <h5 style={{ textAlign: "center" }}>SignIn Here!</h5>
            </Link>
        </>
}

export default AdminPage;