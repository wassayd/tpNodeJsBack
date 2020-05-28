module.exports = (app, itemservice,listservice,jwt) => {

    app.get("/items", jwt.validateJWT, async (req, res) => {
     try{
         res.json(await itemservice.dao.getAll())

     }catch (e) {
         res.status(500).end
     }
    });

    app.get("/items/:listid",jwt.validateJWT, async (req, res) => {
        try{
            const itemsInList = await itemservice.dao.getItemsByListId(req.params.listid);
            if (itemsInList === undefined){
                return res.status(404).end()
            }
            res.json(itemsInList);

        }catch (e) {
            res.status(400).end
        }
    });

    app.get("/item/:id",jwt.validateJWT, async (req, res) => {
        try{
            const item = await itemservice.dao.getById(req.params.id);
            const list = await listservice.dao.getById(item.list_id);

            if (list[0].user_id !== req.user[0].id) {
                return res.status(403).end()
            }
            if (item === undefined){
                return res.status(404).end()
            }
            res.json(item);

        }catch (e) {
            res.status(400).end
        }
    });

    app.put("/item",jwt.validateJWT,async (req,res) => {
        const item = req.body;
        const list = await listservice.dao.getById(item.list_id);

        if (list[0].user_id !== req.user[0].id) {
            return res.status(403).end()
        }
        if ((item.id === undefined)||(item.id === null) || (!itemservice.isValid(item))){
            return res.status(400).res;
        }

        if (await itemservice.dao.getById(item.id) === undefined){
            return res.status(404).end()
        }

        itemservice.dao.update(item)
            .then(e=>{
                console.log(e);
                res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
                res.status(500).end();
            })
    });

    app.delete("/item/:id",jwt.validateJWT, async (req,res)=>{
        const item = await itemservice.dao.getById(req.params.id);
        const list = await listservice.dao.getById(item.list_id);

        if (list[0].user_id !== req.user[0].id) {
            return res.status(403).end()
        }

        if (item === undefined || item.length === 0){
            return res.status(404).end();
        }
        itemservice.dao.delete(req.params.id)
            .then(e=>{
                console.log(e);
                res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
                res.status(500).end();
            })
    });

    app.post('/item',jwt.validateJWT, async (req,res)=>{

        const item = req.body;
        const list = await listservice.dao.getById(item.list_id);

        if (list[0].user_id !== req.user[0].id) {
            return res.status(403).end()
        }

        if (!itemservice.isValid(item)){
            return res.status(400).end()
        }
        itemservice.dao.insert(item)
            .then(e=>{
                console.log(e);
                res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
                res.status(500).end();
            })
    });

};
