const { Model } = require('objection')
import *  as knex from '../Utils'
Model.knex(knex.queryBuilder);
class BaseModel extends Model {
    /**
    * MODEL
    * @param {*} id  
    */

    static async findById(id) {
        return await this.query().findById(id)
    }
    static async findByIds(ids) {
        return await this.query().findByIds(ids)
    }
    static async findOne(...whereArgs) {
        return await this.query().findOne(...whereArgs)
    }
    static async deleteById(id) {
        return await this.query().deleteById(id)
    }
    static async deleteByIds(ids) {
        return await this.query().delete().whereIn('id', ids)
    }
    static async insert(...params) {
        return await this.query().insert(...params)
    }

    /**
     * INSTANCE
     * @param  {...any} params 
     */
    async update(...params) {
        return await this.$query().update(...params)
    }
    async patch(...params) {
        return await this.$query().patch(...params)
    }
    async delete() {
        return await this.$query().delete()
    }
    async patchAndFetch(...params) {
        return await this.$query().patchAndFetch(...params)
    }
}
export default BaseModel