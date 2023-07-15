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

export const getRecipe = async ({ queryKey }) => {
    const { data } = await axios.get(`${API}/recipe/recipes/${queryKey[2]}/`,
        {
            headers: {
                Authorization: `Token ${queryKey[1].toString()}`
            }
        })
    return data
}