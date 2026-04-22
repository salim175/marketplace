import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AdminPage from './Pages/AdminPage';
import AdminLogin from './Pages/AdminLogin';

import AdminCategories from './Pages/CategoriesAdmin/AdminCategories';
import AddCategory from './Pages/CategoriesAdmin/AddCategory';
import CategoryDetails from './Pages/CategoriesAdmin/AdminCategoryDetails';
import EditCategory from './Pages/CategoriesAdmin/AdminCategoryEdit';

import AdminCurrency from './Pages/CurrencyAdmin/AdminCurrency';
import AddCurrency from './Pages/CurrencyAdmin/AddCurrency';
import CurrencyDetails from './Pages/CurrencyAdmin/AdminCurrencyDetails';
import EditCurrency from './Pages/CurrencyAdmin/AdminCurrencyEdit';

import AdminProduct from './Pages/ProductsAdmin/AdminProduct';

import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import AddProduct from './Pages/CreateSell';
import Details from './Pages/Details';
import EditProduct from './Pages/EditProduct';
import Logout from './Pages/Logout';
import Error404 from './Pages/Error404';
import Footer from './components/Footer/Footer';

toast.configure();
function App()
{
  return (
    <>
      <Switch>
        <Route path="/auth/admin" exact component={AdminLogin} />
        <Route path="/admin" exact component={AdminPage} />

        <Route path="/admin/category" exact component={AdminCategories} />
        <Route path="/admin/addNewCategory" exact component={AddCategory} />
        <Route path="/admin/categoryDetails" exact component={CategoryDetails} />
        <Route path="/admin/categoryEdit" exact component={EditCategory} />

        <Route path="/admin/currency" exact component={AdminCurrency} />
        <Route path="/admin/addNewCurrency" exact component={AddCurrency} />
        <Route path="/admin/currencyDetails" exact component={CurrencyDetails} />
        <Route path="/admin/currencyEdit" exact component={EditCurrency} />

        <Route path="/admin/product" exact component={AdminProduct} />

        <Route path="/" exact component={Categories} />
        <Route path="/categories/" exact component={Categories} />
        <Route path="/categories/details" component={Details} />

        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/register" exact component={Register} />
        <Route path='/profile' exact component={Profile} />;
        <Route path="/profile/edit" exact component={EditProfile} />
        <Route path='/add-product' exact component={AddProduct} />;
        <Route path='/edit-product' exact component={EditProduct} />
        <Route path="/auth/logout" exact render={Logout} />
        <Route component={Error404} />
      </Switch>

      <Footer />
    </>
  );
}

export default App;
