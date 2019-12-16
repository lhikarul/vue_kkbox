export const config = {
    headers: {
        Accept: 'application/x-www/form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const requiredTokenData = {
    grant_type: process.env.VUE_APP_GRANT_TYPE,
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET
}