const _ = require('lodash')
import ApiException from '../Exceptions/ApiException'

class BaseController {
    request: any
    response: any
    Model: any
    async index(): Promise<void> {
        let result = await this.Model.query().select();
        return result;

    }

    async detail(params: any): Promise<void> {
        try {
            let id = params.id
            if (!id) throw new ApiException(9996, "ID is required!");

            let result = await this.Model.query().findById(id);

            if (!result) {
                throw new ApiException(9997, 'Data not found')
            }

            return result;
        } catch (error) {
            return error
        }
    }

    async store(inputs: any): Promise<void> {
        try {
            let result = await this.Model.query().insert(inputs);
            return result;
        } catch (error) {
            return error
        }
    }
}
export default BaseController