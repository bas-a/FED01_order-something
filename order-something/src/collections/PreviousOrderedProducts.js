import {Collection} from "backbone";
import Product from "../models/Product";
Backbone.LocalStorage = require("backbone.localstorage"); // Couldn't import it any other way

const PreviousOrders = Collection.extend({
    model: Product,
    localStorage: new Backbone.LocalStorage("prev-ordered")
});

export default PreviousOrders;