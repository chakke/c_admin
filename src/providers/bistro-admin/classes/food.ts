import { Mappingable } from "../interface/mappingable";

export class Food implements Mappingable {
    albumId: string;
    category: string;
    currency: string;
    description: string;
    enName: string;
    firebaseId: string;
    firebaseReference: string;
    id: string;
    image: string;
    name: string;
    options: Array<any>;
    paper: string;
    price: string;
    sales: Array<any>;
    size: string;
    state: number;
    type: number;
    unit: string;
    timeCreate: Date;
    constructor() {
        this.reset();
    }
    reset() {
        this.albumId = "";
        this.category = "";
        this.currency = "";
        this.description = "";
        this.enName = "";
        this.firebaseId = "";
        this.firebaseReference = "";
        this.id = "";
        this.image = "";
        this.name = "";
        this.options = [];
        this.paper = "";
        this.price = "";
        this.sales = [];
        this.size = "";
        this.state = 0;
        this.type = 0;
        this.unit = "";
        this.timeCreate = new Date();
    }

    mappingFirebaseData(data) {
        this.albumId = data.album_id;
        this.category = data.category;
        this.currency = data.currency;
        this.description = data.description;
        this.enName = data.en_name;
        this.firebaseId = data.firebase_id;
        this.firebaseReference = data.firebase_reference;
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.options = data.options;
        this.paper = data.paper;
        this.price = data.price;
        this.sales = data.sales;
        this.size = data.size;
        this.state = data.state;
        this.type = data.type;
        this.unit = data.unit;
        this.timeCreate = data.time_create;
    }
}