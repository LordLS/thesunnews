const baseurl = process.env.NODE_ENV ==='development' ? 'http://127.0.0.1:8000/' : 'https://thesunnewsapi.com/'

export const api = {
    pub: {
        base: `${baseurl}`,
        create : `${baseurl}createpublication/`,
        list : `${baseurl}publication/`,
       
    },
    
    auth: {
        loginUrl: `${baseurl}dj-rest-auth/login/`,
        logoutUrl: `${baseurl}dj-rest-auth/logout/`,
        signUp: `${baseurl}dj-rest-auth/registration/`,
        profile: `${baseurl}userprofile/`
    }
}