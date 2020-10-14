import BaseController from './BaseController'
import Topic from '../Models/Topic'
import Lecture from '../Models/Lecture'
import ApiException from '../Exceptions/ApiException'
import { v4 as uuidv4 } from 'uuid'
import Upload from '@root/Utils/Upload'
import _ from 'lodash'
class TopicController extends BaseController {
    Model: any = Lecture;
    TopicModel: any = Topic;

    async store(inputs: any): Promise<void> {
        try {
            let { name } = inputs
            if (!name) throw new ApiException(6021, "Missing name");

            let { topicId } = inputs
            topicId = Number(topicId)
            inputs.topicId = topicId
            if (!topicId) throw new ApiException(6023, "Missing topicId");

            let checkExistTopic = await this.TopicModel.findById(topicId);
            if (!checkExistTopic) throw new ApiException(6014, "Topic is not exist");

            let checkExist = await this.Model.findOne({ name })
            if (checkExist) throw new ApiException(6025, "Topic is exist");

            let files = inputs.files;
            delete inputs.files;

            if (files.length === 0) throw new ApiException(500, "File is require");
            if (files.length > 1)
                throw new ApiException(500, "Can not upload more than 1 file per Lecture");

            let { fileName, fileSize, path } = this.handleSaveFile(files[0]);
            inputs.pathFile = path
            console.log(inputs)

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

            let { topicId } = inputs
            if (topicId) {
                let checkExistBranch = await this.TopicModel.findById(topicId);
                if (!checkExistBranch) throw new ApiException(6013, "Topic is not exist");
            }

            let checkExist = await this.Model.findById(id)
            if (!checkExist) throw new ApiException(6024, "Topic is not exist");

            let result = await checkExist.patchAndFetch(inputs);
            return result;
        } catch (error) {
            return error
        }
    }

    handleSaveFile(file: any) {
        if (_.isEmpty(file)) throw new ApiException(9996, "File is required");
        let fileName: string = file.originalname;
        let fileExtension: string = this.getFileExtension(fileName);
        let localName: string = uuidv4() + fileExtension;
        let fileSize: number = file.size;
        let directory = './public/pdf'
        let path = `/pdf/${localName}`;
        try {
            let result = Upload.saveToDisk({
                directory,
                data: file,
                fileName: localName,
                overwrite: true
            })
        } catch (error) {
            throw new Error(error);
        }
        return {
            fileName,
            fileSize,
            path,
        };
    }

    getFileExtension(fileName: string): string {
        let length: number = fileName.split(".").length;
        let ext: string = fileName.split(".").pop();
        return length <= 1 ? "" : `.${ext}`;
    }

}
export default TopicController