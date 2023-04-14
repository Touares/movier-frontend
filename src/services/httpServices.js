import axios from "axios";


const token = localStorage.getItem('token')
if (token) {

    axios.defaults.headers.common['Authorization '] = `Bearer  ${token}` ;
}


axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status <= 500;
    if (!expectedError) {
        console.log("logging the error", error);
        alert("an unexpected error occured");
    }
    return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}