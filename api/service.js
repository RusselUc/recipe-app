import axios from 'axios'
const API_URL = 'http://192.168.1.105:8000/api/'

// export const createUser = async () => {
//     const response
// }

export const signin = async (data) => {
    const response = axios.post(API_URL + 'user/token/', data)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })

    return response
}

export const signup = async (data) => {

    const response = axios.post(API_URL + 'user/create/', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    return response
}