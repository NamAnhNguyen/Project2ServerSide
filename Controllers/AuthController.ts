import BaseController from './BaseController'
import User from '../Models/User'
import ApiException from '../Exceptions/ApiException'
import Auth from "../Utils/auth"
import authConfig from "../Config/auth"
import to from 'await-to-js'
class AuthController extends BaseController {
    Model: any = User;

    async login(inputs) {
        try {
            let user = await this.Model.checkLogin({
                username: inputs.username,
                password: inputs.password,
            });
            if (!user) throw new ApiException(7000, "Can not login");

            let token = Auth.generateJWT(
                {
                    id: user.id,
                },
                {
                    key: authConfig["SECRET_KEY"],
                    expiresIn: authConfig["JWT_EXPIRE_USER"],
                }
            );
            delete inputs.password;

            //Log user login

            return {
                token,
                user: {
                    ...user,
                },
            };
        } catch (error) {
            return error
        }
    }

    async checkToken() {
        let inputs = this.request.all();
        let { token } = inputs;
        if (!token) throw new ApiException(6071, "The token is missing")
        let [error, auth] = await to(
            Auth.verify(token, {
                key: authConfig["SECRET_KEY"],
            })
        );
        if (error) throw new ApiException(6072, "The token has expired");
        let user = await this.Model.query().findById(auth.id);
        if (!user) throw new ApiException(6006, "User doesn't exist!");
        delete user.password;
        return user;
    }
}
export default AuthController