export const service = {
    login,
    register,
    createCompany,
    updateUser,
    logout,
    get,
    post,
    patch,
    update,
    delete: _delete
};

function login(email, password) {
    return tokenReturn('/users/login', { email, password });
}

function register(user) {
    return tokenReturn('/users/register', user)
}

function createCompany(company) {
    return tokenReturn('/companies/create', company);
}

function updateUser(user) {
  return tokenReturn(`/users/${user._id}`, user)
}

function tokenReturn(url, payload) {

    return axios.post(process.env.API_URL + url, payload).then(handleResponse)
        .then(result => {
            // login successful if there's a jwt token in the response
            console.log("HERE auth")
            console.log(result);
            if (result.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(result.user));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.user.token
            }
            if (result.company) {
                // store company
                localStorage.setItem('company', JSON.stringify(result.company));
            }
            return result;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    axios.defaults.headers.common['Authorization'] = null;
}

function get(url) {
    return axios.get(process.env.API_URL + url).then(handleResponse)
}

function post(url, json) {
    return axios.post(process.env.API_URL + url, json).then(handleResponse)
}

function update(url, json) {
    return axios.update(process.env.API_URL + url, json).then(handleResponse)
}
function patch(url, json) {
    return axios.patch(process.env.API_URL + url, json).then(handleResponse)
}

function _delete(url) {
    return axios.delete(process.env.API_URL + url).then(handleResponse)
}

function handleResponse(response) {

    const data = response.data;

    if (data.error) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            
            logout();
            location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
