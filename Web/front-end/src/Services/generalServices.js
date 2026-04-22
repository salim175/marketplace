import http from "./httpService";
const baseUrl = 'http://localhost:2000';

export async function AddProduct(product)
{
    try
    {
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.post(baseUrl + "/api/category/", product);
        return res;
    } catch (e)
    {
        console.log(e);
    }
}

export async function getAllCategory()
{
    try
    {
        const res = await http.get(baseUrl + "/api/category/");
        return res.data;
    } catch (e) { return 400 };
}

export async function getAllCurrency()
{
    try
    {
        const res = await http.get(baseUrl + "/api/currency/");
        return res.data;
    } catch (e) { return 400 };
}

export async function getAllProduct(page)
{
    try
    {
        const res = await http.get(baseUrl + "/api/product/" + page);
        return res.data;
    } catch (e) { return 400 };
}

export async function getProductsByCategory(category, page)
{
    try
    {
        const res = await http.get(baseUrl + `/api/product/${category}/${page}`);
        return res.data;
    } catch (e) { return 400 };
}

export async function searchForaProduct(sample, page)
{
    try
    {
        const res = await http.get(baseUrl + `/api/product/search/${sample}/${page}`);
        return res.data;
    } catch (e) { return 400 };
}
