const BaseDAO = require('./basedao');

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db, "UserAccount")
    }
    insert(user) {
        return this.dbQuery("INSERT INTO UserAccount(displayname,login,password) VALUES (?,?,?)",
            [user.displayName,user.login, user.password])
    }
    getByLogin(login) {
        return this.dbQuery("SELECT * FROM UserAccount WHERE login=?", [ login ])

    }
};