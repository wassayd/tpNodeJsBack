const BaseDAO = require('./basedao');

module.exports = class ListSharedDAO extends BaseDAO {
    constructor(db) {
        super(db,"list_shared")
    }
    getAllListsByUser(user){
        return this.dbQuery("SELECT * FROM list_shared WHERE user_id = ?",[user[0].id])
    }

    getListSharedByUserAndList(userId,listId){
        return this.dbQuery("SELECT * FROM list_shared WHERE user_id = ? And list_id = ?",[userId,listId])
    }

    getListSharedByList(listId){
        return this.dbQuery("SELECT * FROM list_shared WHERE list_id = ?",[listId])
    }
    insert(listShared){
        return this.dbQuery('INSERT INTO list_shared(is_update,is_view,user_id,list_id) VALUES (?,?,?,?)',[listShared.is_update,listShared.is_view,listShared.user_id,listShared.list_id])
    }
};