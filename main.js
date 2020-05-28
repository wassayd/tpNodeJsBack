const pg         = require('pg');
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const morgan     = require('morgan');
const mysql      = require('mysql');
const app = express();

const ItemService = require("./services/itemservice");
const ListService = require("./services/listservice");
const UserAccountService = require("./services/userservice")

app.use(bodyParser.urlencoded({ extended: false })) ;// URLEncoded form data
app.use(bodyParser.json()); // application/json
app.use(cors());
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const  db    = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    namedParameters: true
});

function connectDB(){
    return new Promise((resolve, reject) => {
        db.connect((err)=>{
            if(err){
                reject(err);
                return;
            }

            db.query(`CREATE DATABASE IF NOT EXISTS tpnodejs`,(err,result)=>{
                db.changeUser({
                    database : 'tpnodejs'
                });
                if(err){
                    reject(err);
                    return;
                }
                resolve(db)
                if (result.warningCount >0){
                    console.log('Database already created')
                }else{
                    console.log('Database created')
                }

            });
            console.log('Connected');
        });

        

    })
}

let itemService = new ItemService(db);
let listService = new ListService(db);
const seeder    = require('./datamodel/seeder');
const userAccountService = new UserAccountService(db)
const jwt = require('./jwt')(userAccountService)

require('./api/listApi')(app, listService,jwt);
require('./api/itemApi')(app, itemService,listService,jwt);
require('./api/userApi')(app, userAccountService,jwt);

connectDB().then(async (db)=>{
     itemService = new ItemService(db);
     listService = new ListService(db);
    await seeder.listSeeder(userAccountService,listService);
    await seeder.itemSeeder(itemService);

}).then(app.listen(3333))
    .catch(e=>{console.log("Allumez WAMP",e)});



