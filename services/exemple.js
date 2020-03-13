const ExempleDAO = require("../datamodel/exempledao")

module.exports = class ExempleService {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
}