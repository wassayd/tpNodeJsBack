module.exports = (app, itemservice,jwt) => {

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
            const itemsInList = await itemservice.dao.getById(req.params.id);
            if (itemsInList === undefined){
                return res.status(404).end()
            }
            res.json(itemsInList);

        }catch (e) {
            res.status(400).end
        }
    });

    app.put("/item",jwt.validateJWT,async (req,res) => {
        const item = req.body;

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
        console.log(item)
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
