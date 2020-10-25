import BaseController from './BaseController'
import ApiException from '../Exceptions/ApiException'

import Question from "../Models/Question"
import QuestionLevel from "../Models/QuestionLevel"
import QuestionType from "../Models/QuestionType"
import Branch from "../Models/Branch"
import Topic from "../Models/Topic"
import Lecture from "../Models/Lecture"

class QuestionController extends BaseController {
    Model: any = Question;
    QuestionLevel: any = QuestionLevel;
    QuestionType: any = QuestionType;
    Branch: any = Branch;
    Topic: any = Topic;
    Lecture: any = Lecture;

    async store(inputs: any): Promise<void> {

        try {
            let { content } = inputs
            if (!content) throw new ApiException(6051, "Missing content");

            let { typeId } = inputs
            if (!typeId) throw new ApiException(6053, "Missing Type");

            let checkExistType = await this.QuestionType.findById(typeId)
            if (!checkExistType) throw new ApiException(6034, "Question Type is not exist");

            let { levelId } = inputs
            if (!levelId) throw new ApiException(6055, "Missing Level");

            let checkExistLevel = await this.QuestionLevel.findById(levelId)
            if (!checkExistLevel) throw new ApiException(6044, "Question Level is not exist");

            let { lectureId, topicId, branchId } = inputs
            if (!lectureId && !topicId && !branchId) throw new ApiException(6057, "Must belong to a branch, topic or lecture");

            if (branchId) {
                let checkExistBranch = await this.Branch.findById(branchId)
                if (!checkExistBranch) throw new ApiException(6004, "Branch is not exist");
            }
            if (topicId) {
                let checkExistTopic = await this.Topic.findById(topicId)
                if (!checkExistTopic) throw new ApiException(6014, "Topic is not exist");
            }

            if (lectureId) {
                let checkExistLecture = await this.Lecture.findById(lectureId)
                if (!checkExistLecture) throw new ApiException(6024, "Lecture is not exist");
            }

            let checkExist = await this.Model.findOne({ content })
            if (checkExist) throw new ApiException(6059, "Question is exist");

            let { answers = [] } = inputs
            let checkValidateAnswers = checkExistType?.availableAnswers == answers.length;
            if (!checkValidateAnswers) throw new ApiException(6061, "Invalid answer is not exist");

            let checkExistRightAnswer = answers.filter(answer => answer.isAnswer == true)
            if (checkExistRightAnswer.length !== 1) throw new ApiException(6063, "A question must not have more or less thans one right answer");

            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    async update(inputs: any): Promise<void> {

        try {
            let { id } = inputs
            if (!id) throw new ApiException(6052, "Missing id");

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6054, "QuestionLevel is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            console.log(checkExist)
            return result;
        } catch (error) {
            return error
        }
    }
}
export default QuestionController