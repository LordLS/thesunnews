import axios from 'axios'
import {api} from '../helpers/api'

const authAxios = axios.create()

authAxios.interceptors.request.use(config => {
    const newConfig = config
    const token = localStorage.getItem('token')
    newConfig.headers = {
        "Authorization": `Token ${token}`
    }
    return newConfig
})



function signup(username, email,password1, password2) {
    return axios.post(`${api.auth.signUp}`, 
        {
            "username": username,
            "email": email,
            "password1": password1,
            "password2": password2,

        }
        ).then(res => {
            return res
        }
        ) 
}

function login(email, password){
    return axios.post(`${api.auth.loginUrl}`, 
            {
                 "email": email,
                 "password": password
             }
             ).then(res => {
                localStorage.setItem("token", res.data.key)
                return res
             }
             )
}


function isAuthenticated() {
    const token = localStorage.getItem('token')
    return token !== null && token !== undefined
}

function logout() {
    // authAxios.post(`${api.auth.logoutUrl}`)
    const token = localStorage.getItem('token')
    // Delete token so you get a new one when you log back in
    axios.delete(`http://127.0.0.1:8000/token-delete/${token}`, {headers: {
        Authorization: `Token ${token}`
    }}).then(res => console.log(res)).catch(err => console.log(err));
    localStorage.removeItem('token')
}

const authenticationService = {
    isAuthenticated:isAuthenticated(),
    logout,
    login,
    signup,
    
}

export {authAxios, authenticationService}