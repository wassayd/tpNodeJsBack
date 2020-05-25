const ItemDAO = require("../datamodel/itemdao");

module.exports = class ItemService {
    constructor(db) {
        this.dao = new ItemDAO(db)
    }
    isValid(item){
        if (item.label.trim() === "") return false;
        if (item.quantity != null && item.quantity<0) return false;

        return true;
    }
};