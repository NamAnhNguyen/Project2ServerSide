import BaseModel from './BaseModel'

const bcrypt = require('bcrypt')
const authConfig = require('../Config/auth')
class User extends BaseModel {
    static get tableName() {
        return "users"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                password: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                balance: { type: ['integer' || 'null'] },
                levelId: { type: ['integer' || 'null'] },
                experience: { type: ['integer' || 'null'] },
            }
        }
    }
    // static get relationMappings() {
    //     return {
    //     }
    // }

    static async checkLogin({ username, password }) {
        const user = await this.findOne({ username: username });
        if (!user) return false;
        let checkPassword = await this.compare(password, user.password);
        delete user.password;
        if (checkPassword) return user;
        return false;
    }

    static async hash(plainPassword) {
        return await bcrypt.hash(plainPassword + authConfig.SECRET_KEY, 10)
    }

    static async compare(plainPassword, encryptedPassword) {
        return await bcrypt.compare(plainPassword + authConfig.SECRET_KEY, encryptedPassword)
    }

    async changePassword(newPassword) {
        newPassword = await this.hash(newPassword)
        return await this.$query().patchAndFetchById(this.id, {
            password: newPassword
        })
    }
}
export default User;
