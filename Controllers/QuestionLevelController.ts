import BaseController from './BaseController'
import QuestionLevel from '../Models/QuestionLevel'
import ApiException from '../Exceptions/ApiException'
class QuestionLevelController extends BaseController {
    Model: any = QuestionLevel;

    async store(inputs: any): Promise<void> {

        try {
            let { title } = inputs
            if (!title) throw new ApiException(6041, "Missing title");

            let checkExist = await this.Model.findOne({ title })
            if (checkExist) throw new ApiException(6043, "QuestionLevel is exist");

            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    async update(inputs: any): Promise<void> {

        try {
            let { id } = inputs
            if (!id) throw new ApiException(6042, "Missing id");

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6044, "QuestionLevel is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            console.log(checkExist)
            return result;
        } catch (error) {
            return error
        }
    }
}
export default QuestionLevelController