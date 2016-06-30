import {Collection} from "backbone";
import Product from "../models/Product";
Backbone.LocalStorage = require("backbone.localstorage"); // Couldn't import it any other way

const Order = Collection.extend({
    model: Product,
    localStorage: new Backbone.LocalStorage("order-storage")
});

export default Order;