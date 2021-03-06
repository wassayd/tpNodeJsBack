module.exports = (app, listservice,jwt,listSharedService) => {
    app.get("/lists",jwt.validateJWT, async (req, res) => {
        try{
            res.json(await listservice.dao.getAllListsByUser(req.user));
        }catch (e) {
            res.status(500).end();
        }
    });

    app.get("/list/:id",jwt.validateJWT,async (req,res)=>{
        try{
            const list = await listservice.dao.getById(req.params.id);
            const listsShared = await listSharedService.dao.getListSharedByList(list[0].id)

            if (list === undefined){
                return res.status(404).end();
            }

            if (list[0].user_id !== req.user[0].id && listsShared.length === 0 ) {
                return res.status(403).end()
            }
            res.json(list);
        }catch (e) {
            res.status(500).end();
        }
    });

    app.put("/list",jwt.validateJWT,async (req,res)=>{
        const list = req.body;
            console.log(list)
        const listsShared = await listSharedService.dao.getListSharedByList(list.id)
        if ((list.id === undefined)||(list.id === null) || (!listservice.isValid(list))){
            return res.status(400).res;
        }
        const prevList = await listservice.dao.getById(list.id)
        if (prevList === undefined) {
            return res.status(404).end()
        }
        if (prevList[0].user_id !== req.user[0].id && listsShared.length === 0) {
            return res.status(403).end()
        }
        listservice.dao.update(list)
            .then(e=>{
                console.log("modifiés",e);
                return res.status(200).end();
            })
            .catch(e=>{
                console.log("erreur",e);
                return res.status(500).end();
            })
    });

    app.delete("/list/:id",jwt.validateJWT,async (req,res)=>{
        const list = await listservice.dao.getById(req.params.id);
        if (list === undefined){
            return res.status(404).end;
        }
        if (list[0].user_id !== req.user[0].id) {
            return res.status(403).end()
        }
        //Supprime la liste partager avec tous les autres utilisateurs
        for(let listShared of await listSharedService.dao.getListSharedByList(req.params.id)){
            await listSharedService.dao.delete(listShared.id)
        }

        listservice.dao.delete(req.params.id)
            .then(e=>{
                console.log(e);
               return  res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
               return  res.status(500).end();
            })

    });

    app.post("/list",jwt.validateJWT,async (req,res)=>{
        const list = req.body;

        if (!listservice.isValid(list)){
            return res.status(404).end();
        }
        list.user_id = req.user[0].id

        listservice.dao.insert(list)
            .then(e=>{
                console.log(e);
                res.status(200).end();
            })
            .catch(e=>{
                console.log(e);
                res.status(500).end();
            })
    })

};
