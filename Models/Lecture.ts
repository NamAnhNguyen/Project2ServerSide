import BaseModel from './BaseModel'
import Topic from './Topic'
class Lecture extends BaseModel {
    static get tableName() {
        return "lectures"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['title', 'pathFile', 'topicId'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                topicId: { type: 'integer' },
                description: { type: ['string' || 'null'], minLength: 1, maxLength: 255 },
                pathFile: { type: 'string' },
            }
        }
    }
    static get relationMappings() {
        return {
            topic: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Topic,
                join: {
                    from: 'lectures.topicId',
                    to: 'topics.id',
                }
            }
        }
    }
}
export default Lecture;
