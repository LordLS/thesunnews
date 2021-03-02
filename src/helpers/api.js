const baseurl = process.env.NODE_ENV ==='development' ? 'https://thesunnewsapi.com/' : 'https://thesunnewsapi.com/'

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