const baseurl = process.env.NODE_ENV ==='development' ? 'http://127.0.0.1:8000/' : 'http://tsnnews-env.eba-h2bna33f.us-west-2.elasticbeanstalk.com/'

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