import BaseModel from './BaseModel'
import Lecture from './Lecture'
import Topic from './Topic'
import Branch from './Branch'
import QuestionLevel from './QuestionLevel'
import QuestionType from './QuestionType'

class Question extends BaseModel {
    static get tableName() {
        return "questions"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['content', 'answers'],
            properties: {
                id: { type: 'integer' },
                content: { type: 'string' },

                typeId: { type: 'integer' },
                levelId: { type: 'integer' },

                lectureId: { type: 'integer' },
                topicId: { type: 'integer' },
                branchId: { type: 'integer' },

                answers: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            content: ['string', 'number'],
                            isAnswer: 'boolean'
                        }
                    }
                },
            }
        }
    }
    static get relationMappings() {
        return {
            lecture: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Lecture,
                join: {
                    from: 'questions.lectureId',
                    to: 'lectures.id',
                }
            },

            topic: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Topic,
                join: {
                    from: 'questions.topicId',
                    to: 'topics.id',
                }
            },

            branch: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Branch,
                join: {
                    from: 'questions.branchId',
                    to: 'branches.id',
                }
            },

            level: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: QuestionLevel,
                join: {
                    from: 'questions.levelId',
                    to: 'question_levels.id',
                }
            },

            type: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: QuestionType,
                join: {
                    from: 'questions.typeId',
                    to: 'question_types.id',
                }
            },
        }
    }
}
export default Question;
