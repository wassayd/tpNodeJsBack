const List = require('./List');
const Item = require('./Item');

module.exports = {

    listSeeder:  async (userAccountService,listService,listSharedService) => {
        return new Promise(async (resolve, reject) => {
            try {
                await userAccountService.dao.dbQuery('CREATE TABLE useraccount(id INT AUTO_INCREMENT,displayName VARCHAR(255),login VARCHAR(255),password VARCHAR(255),PRIMARY KEY(id))')
                await listService.dao.dbQuery(  "CREATE TABLE list(id INT AUTO_INCREMENT, shop VARCHAR(255)," +
                                                    "date_achat DATE,is_archived BOOLEAN,user_id INT, FOREIGN KEY(user_id) REFERENCES useraccount(id), PRIMARY KEY(id))");

                await listSharedService.dao.dbQuery("CREATE TABLE list_shared(id INT AUTO_INCREMENT,is_update BOOLEAN,is_view BOOLEAN,user_id INT,list_id INT," +
                    "FOREIGN KEY(user_id) REFERENCES useraccount(id),FOREIGN KEY(list_id) REFERENCES list(id),PRIMARY KEY(id))")
            }
            catch (e) {
                if (e.errno === 1050){ //TABLE ALREADY EXISTS
                    resolve()
                }else{
                    reject(e)
                }
                return ;
            }

            userAccountService.insert("User1", "user1@example.com", "azerty")
                .then(_ => userAccountService.dao.getByLogin("user1@example.com"))
                .then(async user1 => {

                    // INSERTs
                    for (let i = 0; i < 5; i++) {
                        await listService.dao.insert(new List("Shop " + i,new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)), user1[0].id))
                    }
                })
            userAccountService.insert("User2", "user2@example.com", "azerty")
                .then(_ => userAccountService.dao.getByLogin("user2@example.com"))
                .then(async user2 => {
                    console.log()
                    // INSERTs
                    for (let i = 0; i < 5; i++) {
                        await listService.dao.insert(new List("Shop " + i,
                            new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
                            user2[0].id))
                    }
                    resolve()
                })

        })
    },
    itemSeeder :  async (itemService) => {
        return new Promise(async (resolve, reject) => {
            try {
                await itemService.dao.dbQuery(  "CREATE TABLE item(id INT AUTO_INCREMENT, label VARCHAR(255), quantity INT(11)," +
                                                    "is_checked BOOLEAN,list_id INT," +
                                                    "PRIMARY KEY(id), FOREIGN KEY(list_id) REFERENCES List(id))");
            } catch (e) {
                if (e.errno === 1050){ //TABLE ALREADY EXISTS
                    resolve()
                }else{
                    reject(e)
                }
                return ;
            }
            // INSERTs
            for (let i = 0; i < 5; i++) {
                await itemService.dao.insert( new Item("label"+i,i* Math.random() * 100,1))
            }
            resolve()
        })
    }

};