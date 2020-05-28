const BaseDAO = require('./basedao');

module.exports = class ListDAO extends BaseDAO {
    constructor(db) {
        super(db,"list")
    }
    getAllListsByUser(user){

        return this.dbQuery("SELECT * FROM LIST WHERE user_id = ?",[user[0].id])
    }
    update(list){
        return this.dbQuery('UPDATE List SET shop=?, date_achat=?, is_archived=? WHERE id=?',[
            list.shop,
            new Date(list.date_achat),
            list.is_archived,
            list.id
        ])
    }

    insert(list){
        return this.dbQuery('INSERT INTO List(shop,date_achat,user_id,is_archived) VALUES (?,?,?,?)',[list.shop,list.date_achat,list.user_id,list.is_archived])
    }
};