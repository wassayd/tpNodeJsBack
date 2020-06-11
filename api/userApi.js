module.exports = (app, svc, jwt) => {
    app.post('/useraccount/authenticate', (req, res) => {
        const { login, password } = req.body
        if ((login === undefined) || (password === undefined)) {
            console.log(req.body)
            res.status(400).end()
            return
        }
        svc.validatePassword(login, password)
            .then(autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(login)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })

    });

    app.get('/useraccount/user/:login',async(req,res)=>{
        try{
            const user = (await svc.dao.getByLogin(req.params.login))[0];
            console.log(user)
            if (user === undefined || user.length === 0){
                return res.status(404).end();
            }
            res.json(user);
        }catch (e) {
            console.log(e);
            res.status(404).end();
        }
    })
    app.get('/useraccount/userid/:id',async(req,res)=>{
        try{
            const user = (await svc.dao.getById(req.params.id))[0];
            console.log(user)
            if (user === undefined || user.length === 0){
                return res.status(404).end();
            }
            res.json(user);
        }catch (e) {
            console.log(e);
            res.status(404).end();
        }
    })
}