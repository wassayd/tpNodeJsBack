module.exports = class List {
    constructor(shop,date,user_id) {
        this.shop     = shop;
        this.date_achat     = date;
        this.archived = false;
        this.user_id = user_id;
        this.items    = [];
    }

    setItems (items){
        this.items = items;
    }

    addItem(item){
        this.items.push(item);
    }
};