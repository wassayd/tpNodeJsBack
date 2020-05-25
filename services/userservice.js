const bcrypt = require('bcrypt')
const UserDAO = require('../datamodel/UserDao')
const User = require('../datamodel/User')

module.exports = class UserService {
    constructor(db) {
        this.dao = new UserDAO(db)
    }
    insert(displayname, login, password) {
        return this.dao.insert(new User(displayname, login, this.hashPassword(password)))
    }
    async validatePassword(login, password) {
        const user = (await this.dao.getByLogin(login.trim()))[0]
        return this.comparePassword(password, user.password)
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }
}