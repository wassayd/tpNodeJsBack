module.exports = (app, serviceExemple) => {
    app.get("/exemple", async (req, res) => {
        res.json(await serviceExemple.dao.getAll(req.user))
    })
}
