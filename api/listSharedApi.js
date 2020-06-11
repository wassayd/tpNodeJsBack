module.exports = (app,listservice, listSharedservice,jwt) => {

    app.get("/lists/shared",jwt.validateJWT,async (req,res)=>{
        try{
            res.json(await listSharedservice.dao.getAllListsByUser(req.user));
        }catch (e) {
            console.log(e)
            res.status(500).end();
        }
    });

    app.get("/list/shared/:id",jwt.validateJWT,async (req,res)=>{
        try{
            const listShared = await listSharedservice.dao.getById(req.params.id);

            if (listShared === undefined){
                return res.status(404).end();
            }
            res.json(listShared);
        }catch (e) {
            res.status(500).end();
        }
    });

    app.post("/list/shared",jwt.validateJWT,async (req,res)=>{
        const listShared = req.body;
        try {
            const list = (await listservice.dao.getById(listShared.list_id))[0];

            if (!listservice.isValid(list) || list.user_id === listShared.user_id || list === undefined){
                return res.status(404).end();
            }

        }catch (e) {
            console.log(e)
            return res.status(500).end();
        }

        listSharedservice.dao.insert(listShared)
            .then(e=>{
                console.log(e);
                res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
                res.status(500).end();
            })
    })

    app.get('/list/shared/:user/:list',jwt.validateJWT,async (req,res)=>{
        try{
            res.json(await listSharedservice.dao.getListSharedByUserAndList(req.params.user,req.params.list));
        }catch (e) {
            console.log(e);
            res.status(500).end();
        }
    });

    app.delete('/list/shared/:id',jwt.validateJWT,async (req,res)=>{
        const listShared = await listSharedservice.dao.getById(req.params.id);
        if (listShared === undefined){
            return res.status(404).end;
        }

        listSharedservice.dao.delete(req.params.id)
            .then(e=>{
                console.log(e);
                return  res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
                return  res.status(500).end();
            })
    })
};