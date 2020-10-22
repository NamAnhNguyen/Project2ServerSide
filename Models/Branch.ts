import BaseModel from './BaseModel'
import Topic from './Topic'
class Branch extends BaseModel {
    static get tableName() {
        return "branches"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: ['string' || 'null'], minLength: 1, maxLength: 255 },
            }
        }
    }
    static get relationMappings() {
        return {
            topics: {
                relation: BaseModel.HasManyRelation,
                modelClass: Topic,
                join: {
                    from: 'branches.id',
                    to: 'topics.branchId',
                }
            }
        }
    }
}
export default Branch;
