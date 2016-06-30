import _ from "underscore";
import {Events} from "backbone";
import Products from "./collections/Products";
import Order from "./collections/OrderCollection";
import PreviousOrderedProducts from "./collections/PreviousOrderedProducts";
import NavigationView from "./views/NavigationView";
import ProductLinks from "./views/ProductLinks";
import ProductsView from "./views/ProductsView";
import OrderView from "./views/OrderView";
import PlaceOrderView from "./views/PlaceOrderView";
import PrevOrdersView from "./views/PrevOrdersView";
import ProductsRouter from './routers/ProductsRouter';


(function ()
{
    let setGlobalVariables = () =>
    {
        window.App = {};
        App.events = _.clone(Events);
        App.router = new ProductsRouter();
    };

    let init = () =>
    {
        setGlobalVariables();

        // Create the collections
        let ProductsCollection = new Products();
        let OrderCollection = new Order();
        let PrevOrdersCollection = new PreviousOrderedProducts();

        // Create the views
        new NavigationView({ el: "#main" });
        new ProductsView({ el: "#products", collection: ProductsCollection });
        new ProductLinks({ el: "#products", collection: OrderCollection });
        new OrderView({ el: "#order", collection: OrderCollection });
        new PlaceOrderView({ el: "#order", collection: PrevOrdersCollection });
        new PrevOrdersView({ el: "#prev-order", collection: PrevOrdersCollection });

        Backbone.history.start({pushState: true, root: '/FED01/eind-opdracht/'});
    };

    window.addEventListener("load", init);
})();
