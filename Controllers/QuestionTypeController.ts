import BaseController from './BaseController'
import QuestionType from '../Models/QuestionType'
import ApiException from '../Exceptions/ApiException'
class QuestionTypeController extends BaseController {
    Model: any = QuestionType;

    async store(inputs: any): Promise<void> {

        try {
            let { title } = inputs
            if (!title) throw new ApiException(6031, "Missing title");

            let { availableAnswers } = inputs
            if (!availableAnswers) throw new ApiException(6035, "Missing Available Answers");

            let checkExist = await this.Model.findOne({ title })
            if (checkExist) throw new ApiException(6033, "QuestionType is exist");

            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    async update(inputs: any): Promise<void> {

        try {
            let { id } = inputs
            if (!id) throw new ApiException(6032, "Missing id");

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6034, "QuestionType is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            console.log(checkExist)
            return result;
        } catch (error) {
            return error
        }
    }
}
export default QuestionTypeController