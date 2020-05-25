const BaseDAO = require('./basedao');

module.exports = class ItemDAO extends BaseDAO {
    constructor(db) {
        super(db,"item")
    }
    update(item){
        return this.dbQuery('UPDATE Item SET label=?, quantity= ?, list_id=?,is_checked=? WHERE id=?',[
            item.label,
            item.quantity,
            item.list_id,
            item.is_checked,
            item.id,
        ]);
    }
    insert(item){
        return this.dbQuery('INSERT INTO Item(label,quantity,list_id,is_checked) VALUES (?,?,?,?)',[item.label,item.quantity,item.list_id,item.is_checked])
    }
    getItemsByListId(listId){
     return this.dbQuery('SELECT * FROM Item WHERE list_id = ?',[listId])

    }


};