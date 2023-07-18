import axios from 'axios'
const API = 'http://192.168.1.105:8000/api'

export const signin = async (post) => {
    const { data } = await axios.post(`${API}/user/token/`, post);
    return await data;
};

export const signup = async (post) => {
    try {
        const { data } = await axios.post(`${API}/user/create/`, post);
        return data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.email) {
            const errorMessage = error.response.data.email[0];
            throw new Error(errorMessage);
        }
        throw error;
    }
};

export const getRecipes = async ({ queryKey }) => {
    const { data } = await axios.get(`${API}/recipe/recipes/`, {
        headers: {
            Authorization: `Token ${queryKey[1].toString()}`,
        }
    })
    return data
}

// export const getRecipe = async ({ queryKey }) => {
//     const { data } = await axios.get(`${API}/recipe/recipes/${queryKey[2]}/`, {
//         headers: {
//             Authorization: `Token ${queryKey[1].toString()}`
//         }
//     })
//     return data
// };

export const getRecipe = async ({ queryKey }) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const { data } = await axios.get(`${API}/recipe/recipes/${queryKey[2]}/`, {
                headers: {
                    Authorization: `Token ${queryKey[1].toString()}`
                }
            });
            resolve(data);
        }, 2000); // 2000 milisegundos = 2 segundos
    });
};


// export const createRecipe = async ({ mutationKey }) => {
//     console.log(mutationKey[1])
//     try {
//         const { data } = await axios.post(`${API}/recipe/recipes/`, mutationKey[1], {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Token ${mutationKey[0]}`,
//             }
//         });
//         return data;
//     } catch (error) {
//         console.log(error.response.data)
//     }

// }

export const createRecipe = async ({ mutationKey }) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: mutationKey[1].image.uri,
            name: 'image.jpg',
            type: 'image/jpg',
        });
        formData.append('title', mutationKey[1].title);
        formData.append('time_minutes', mutationKey[1].time_minutes);
        formData.append('price', mutationKey[1].price);
        formData.append('description', mutationKey[1].description);

        console.log(formData)

        const { data } = await axios.post(`${API}/recipe/recipes/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${mutationKey[0]}`,
            },
        });

        return data;
    } catch (error) {
        console.log(error.response.data);
    }
};


