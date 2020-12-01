import to from 'await-to-js'
import BaseMiddleware from './BaseMiddleware'
import Auth from '@root/Utils/auth'
import authConfig from '@root/Config/auth'
const Cookies = require('universal-cookie')

class AuthApiMiddleware extends BaseMiddleware {
    cookies: any
    constructor(request, response, next) {
        super(request, response, next);
        let cookie: any = this.getBearerTokenFromHeader(request)
        this.cookies = new Cookies(cookie);
        this.checkToken().then(res => {
            if (res.error) return response.status(401).json({ code: 401, error: res.error })
            next();
        }).catch(err => {
            console.log(err)
            return response.status(401).json({ code: 401, error: err })
        })
    }

    getBearerTokenFromHeader(req) {
        if (!req.headers.authorization) {
            return { error: 'Missing access token' };
        }
        const BEARER = 'Bearer';
        let token = req.headers.authorization.trim();
        if (!token || token.length == 0) {
            return { error: 'Missing access token' };
        }
        let index = token.indexOf(BEARER);
        if (index == 0) {
            token = token.substring(BEARER.length, token.length);
        } else {
            return { error: 'Missing token type ' + BEARER };
        }
        return { token: token.trim() };
    }

    async checkToken() {
        let token = this.cookies.get('token')
        let [error, result]: [any, any] = await to(Auth.verify(token, {
            key: authConfig['SECRET_KEY']
        }));
        if (error) return { error: error.message };

        if (result.exp - Date.now() / 1000 < authConfig['JWT_REFRESH_TIME']) {
            let newToken = Auth.generateJWT({
                _id: result.id,
                username: result.username,
            }, {
                key: authConfig['SECRET_KEY'],
                expiresIn: authConfig['JWT_EXPIRE_USER']
            });
            this.response.set('Access-Control-Expose-Headers', 'access-token')
            this.response.set('access-token', newToken);
        }
        this.request.auth = this.makeAuthObject(result);
        return { token };
    }

    makeAuthObject(tokenData) {
        return {
            ...tokenData
        }
    }
}

export = AuthApiMiddleware.export()
