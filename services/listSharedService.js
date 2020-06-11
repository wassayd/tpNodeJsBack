const ListSharedDAO = require("../datamodel/listSharedDAO");

module.exports = class ListService {
    constructor(db) {
        this.dao = new ListSharedDAO(db)
    }

};