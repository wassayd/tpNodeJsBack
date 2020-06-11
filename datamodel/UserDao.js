const BaseDAO = require('./basedao');

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db, "UserAccount")
    }
    insert(user) {
        return this.dbQuery("INSERT INTO useraccount(displayname,login,password) VALUES (?,?,?)",
            [user.displayName,user.login, user.password])
    }
    getByLogin(login) {
        return this.dbQuery("SELECT * FROM useraccount WHERE login=?", [ login ])
    }
};