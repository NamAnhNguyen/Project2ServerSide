import BaseController from './BaseController'
import Branch from '../Models/Branch'
import ApiException from '../Exceptions/ApiException'
class BranchController extends BaseController {
    Model: any = Branch;

    async store(inputs: any): Promise<void> {

        try {
            let { name } = inputs
            if (!name) throw new ApiException(6001, "Missing name");

            let checkExist = await this.Model.findOne({ name })
            if (checkExist) throw new ApiException(6003, "Branch is exist");

            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    async update(inputs: any): Promise<void> {

        try {
            let { id } = inputs
            if (!id) throw new ApiException(6002, "Missing id");

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6004, "Branch is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            console.log(checkExist)
            return result;
        } catch (error) {
            return error
        }
    }
}
export default BranchController