import BaseController from './BaseController'
import Branch from '../Models/Branch'
import Topic from '../Models/Topic'
import ApiException from '../Exceptions/ApiException'
class TopicController extends BaseController {
    Model: any = Topic;
    BranchModel: any = Branch;

    async store(inputs: any): Promise<void> {

        try {
            let { title } = inputs
            if (!title) throw new ApiException(6011, "Missing title");

            let { branchId } = inputs
            if (!branchId) throw new ApiException(6013, "Missing branchId");

            let checkExistBranch = await this.BranchModel.findById(branchId);
            if (!checkExistBranch) throw new ApiException(6003, "Branch is not exist");

            let checkExist = await this.Model.findOne({ title })
            if (checkExist) throw new ApiException(6017, "Topic is exist");

            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    async update(inputs: any): Promise<void> {

        try {
            let { id } = inputs
            if (!id) throw new ApiException(6012, "Missing id");

            let { branchId } = inputs
            if (branchId) {
                let checkExistBranch = await this.BranchModel.findById(branchId);
                if (!checkExistBranch) throw new ApiException(6004, "Branch is not exist");
            }

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6014, "Topic is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            console.log(checkExist)
            return result;
        } catch (error) {
            return error
        }
    }

    async getByBranch(inputs: any): Promise<void> {
        try {
            let { branchId } = inputs
            let checkExistBranch = await this.BranchModel.findById(branchId);
            if (!checkExistBranch) throw new ApiException(6004, "Branch is not exist");

            let result = await this.Model.query().where({ branchId });
            console.log(result)
            return result;
        } catch (error) {
            return error
        }
    }
}
export default TopicController