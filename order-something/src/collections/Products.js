import {Collection} from "backbone";
import Product from "../models/Product";

const Products = Collection.extend({
    model: Product,
    url: "http://localhost:8888/FED01/eind-opdracht/data.php"
});

export default Products;
