module.exports = class Item {
    constructor(label,quantity,list_id) {
        this.label    = label;
        this.quantity = quantity;
        this.checked  = false;
        this.list_id     = list_id;
    }

    setList(list){
        this.list = list;
    }
};