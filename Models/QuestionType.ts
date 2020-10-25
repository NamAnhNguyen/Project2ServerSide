import BaseModel from './BaseModel'
class QuestionType extends BaseModel {
    static get tableName() {
        return "question_types"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: ['string' || 'null'], minLength: 1, maxLength: 255 },
                availableAnswers: { type: 'number' },
            }
        }
    }
    static get relationMappings() {
        return {

        }
    }
}
export default QuestionType;
