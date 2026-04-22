import axios from 'axios';
import http from './httpService';
const baseUrl = 'http://localhost:2000';

export async function registerUser(user)
{
    try
    {
        console.log(user);
        const res = await http.post(baseUrl + "/api/user", user);
        return res;
    } catch (e) { return 400 };
}

export async function loginUser(userData)
{
    try
    {
        const res = await http.post(baseUrl + "/api/user/login", userData);
        localStorage.setItem('user-jwt', res.data);
        return res;
    } catch (e) { console.log("failed"); return e.response };
}

export async function getUser()
{
    try
    {
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.get(baseUrl + "/api/user");
        return res.data;
    } catch (e) { return 400 };
}

export async function getUserById(id)
{
    try
    {
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.get(baseUrl + `/api/user/${id}`);
        return res.data;
    } catch (e) { return e };
}

export async function editUserProfile(newData)
{
    try
    {
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.put(baseUrl + `/api/user/`, newData);
        return res;
    } catch (e) { return e };
}

export async function addProduct(formData)
{
    try
    {
        axios.defaults.headers.common["x-auth"] = localStorage.getItem('user-jwt');
        const res = await axios({
            method: "post",
            url: `${baseUrl}/api/product/`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res;
    } catch (e) { return 400 };
}

export async function getProducts(page)
{
    try
    {
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.get(baseUrl + `/api/product/user/product/${page}`);
        return res.data;
    } catch (e) { return e };
}

export async function deleteProduct(id)
{
    try
    {
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.delete(baseUrl + `/api/product/user/${id}`);
        console.log(res);
        return res;
    } catch (e) { return e };
}

export async function updateProduct(product, id)
{
    try
    {
        console.log(id);
        http.setJwt(localStorage.getItem('user-jwt'));
        const res = await http.put(baseUrl + `/api/product/update/product/${id}`, product);
        return res;
    } catch (e) { return e };
}