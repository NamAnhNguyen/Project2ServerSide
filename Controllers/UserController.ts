import BaseController from './BaseController'
import User from '../Models/User'
import ApiException from '../Exceptions/ApiException'
class UserController extends BaseController {
    Model: any = User;

    async store(inputs: any): Promise<void> {

        try {
            let { username } = inputs
            if (!username) throw new ApiException(6081, "Missing username");

            let { password } = inputs
            if (!password) throw new ApiException(6083, "Missing password");
            password = await this.Model.hash(password);

            let { name } = inputs
            if (!name) throw new ApiException(6085, "Missing name");

            let { email } = inputs
            if (!email) throw new ApiException(6087, "Missing email");

            let checkExist = await this.Model.findOne({ username })
            if (checkExist) throw new ApiException(6089, "User is exist");

            inputs = {
                ...inputs,
                password: password,
                levelId: 1
            }

            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    async update(inputs: any): Promise<void> {

        try {
            let { id } = inputs
            if (!id) throw new ApiException(6082, "Missing id");

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6084, "User is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            console.log(checkExist)
            return result;
        } catch (error) {
            return error
        }
    }
}
export default UserController