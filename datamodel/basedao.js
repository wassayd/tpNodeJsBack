module.exports = class BaseDAO {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    delete(id) {
        return this.dbQuery(`DELETE FROM ${this.tablename} WHERE id= ?`, [id])
    }
    getById(id){
        return this.dbQuery(`SELECT * FROM ${this.tablename} WHERE id = ?`,[id])
    }
    getAll(){
        return this.dbQuery(`SELECT * FROM ${this.tablename} ORDER BY id` )
    }
    dbQuery(sql,option=null){
        return new Promise((resovle,reject)=>{
            this.db.query(sql,option,(err,result)=>{
                if(err) reject(err);
                resovle(result);
            })
        })

    }
};