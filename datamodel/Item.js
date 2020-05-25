module.exports = class Item {
    constructor(label,quantity) {
        this.label    = label;
        this.quantity = quantity;
        this.checked  = false;
        this.list     = null;
    }

    setList(list){
        this.list = list;
    }
};