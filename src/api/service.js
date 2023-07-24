import axiosInstance from './axiosInstance';

export const signin = async (post) => {
    try {
        const { data } = await axiosInstance.post('/user/token/', post);
        return data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (post) => {
    try {
        const { data } = await axiosInstance.post('/user/create/', post);
        return data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.email) {
            const errorMessage = error.response.data.email[0];
            throw new Error(errorMessage);
        }
        throw error;
    }
};

export const getRecipes = async () => {
    try {
        const { data } = await axiosInstance.get('/recipe/recipes/');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getRecipe = async ({ queryKey }) => {
    try {
        const { data } = await axiosInstance.get(`/recipe/recipes/${queryKey[1]}/`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const createRecipe = async (recipeData) => {
    console.log(recipeData)
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: recipeData.image.uri,
            name: 'image.jpg',
            type: 'image/jpg',
        });
        formData.append('title', recipeData.title);
        formData.append('time_minutes', recipeData.time_minutes);
        formData.append('price', recipeData.price);
        formData.append('description', recipeData.description);

        const { data } = await axiosInstance.post('/recipe/recipes/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
};
