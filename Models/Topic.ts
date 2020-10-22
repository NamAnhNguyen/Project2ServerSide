import BaseModel from './BaseModel'
import Branch from './Branch'
class Topic extends BaseModel {
    static get tableName() {
        return "topics"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['title', 'branchId'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                branchId: { type: 'integer' },
                description: { type: ['string' || 'null'], minLength: 1, maxLength: 255 },
            }
        }
    }
    static get relationMappings() {
        return {
            branch: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Branch,
                join: {
                    from: 'topics.branchId',
                    to: 'branches.id'
                }
            }
        }
    }
}
export default Topic;
