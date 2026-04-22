import http from './httpService';
const baseUrl = 'http://localhost:2000';

// export async function getAll(page, category, query)
// {
//     if (query !== "" && query !== undefined)
//     {
//         return (await http.get(`${baseUrl}/products?page=${page}&search=${query}`));
//     } else if (category && category !== 'all')
//     {
//         return (await http.get(`${baseUrl}/products/${category}?page=${page}`));
//     } else
//     {
//         return (await http.get(`${baseUrl}/products?page=${page}`));
//     }
//     // try
//     // {
//     //     console.log(category);
//     //     http.setJwt(localStorage.getItem('jwt'));
//     //     const res = await http.get(baseUrl + "/api/category", category);
//     //     return res;
//     // } catch (e) { return 404 };
// }

// export async function createProduct(product)
// {
//     return (await http.post(`${baseUrl}/products/create`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify(product)
//     })).json();
// }

export async function editProduct(id, product)
{
    return (await http.put(`${baseUrl}/products/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}
