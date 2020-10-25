import BaseModel from './BaseModel'
class QuestionLevel extends BaseModel {
    static get tableName() {
        return "question_levels"
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

        }
    }
}
export default QuestionLevel;
