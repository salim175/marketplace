import http from "./httpService";
const baseUrl = 'http://localhost:2000';

export async function loginAdmin(cred)
{
    try
    {
        const res = await http.post(baseUrl + "/api/admin/autAdmin", cred);
        return res;
    } catch (e)
    {
        console.log(e);
    }
}

// ----------------------------------
// -----------CATEGORY---------------
// ---------------------------------- 
export async function addCategory(categoryData)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.post(baseUrl + "/api/category/", categoryData);
        return res;
    } catch (e) { return 400 };
}

export async function getAllCategory()
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.get(baseUrl + "/api/category/");
        return res.data;
    } catch (e) { return 400 };
}

export async function getCategoryById(id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.get(baseUrl + `/api/category/${id}`);
        return res.data;
    } catch (e) { return 404 };
}

export async function editCategory(newData, id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.put(baseUrl + `/api/category/${id}`, newData);
        return res;
    } catch (e) { return 400 };
}

export async function deleteCategory(id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.delete(baseUrl + `/api/category/${id}`);
        return res;
    } catch (e) { return 400 };
}

// ----------------------------------
// -----------CURRENCY---------------
// ---------------------------------- 
export async function addCurrency(currencyData)
{
    try
    {
        console.log(currencyData);
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.post(baseUrl + "/api/currency/", currencyData);
        return res;
    } catch (e) { return 400 };
}

export async function getAllCurrency()
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.get(baseUrl + "/api/currency/");
        return res.data;
    } catch (e) { return 400 };
}

export async function getCurrencyById(id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.get(baseUrl + `/api/currency/${id}`);
        return res.data;
    } catch (e) { return 404 };
}

export async function editCurrency(newData, id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.put(baseUrl + `/api/currency/${id}`, newData);
        return res;
    } catch (e) { return 400 };
}

export async function deleteCurrency(id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.delete(baseUrl + `/api/currency/${id}`);
        return res;
    } catch (e) { return 400 };
}

// ----------------------------------
// ------------PRODUCT---------------
// ---------------------------------- 
export async function deleteProduct(id)
{
    try
    {
        http.setJwt(localStorage.getItem('jwt'));
        const res = await http.delete(baseUrl + `/api/product/admin/${id}`);
        return res;
    } catch (e) { return 400 };
}