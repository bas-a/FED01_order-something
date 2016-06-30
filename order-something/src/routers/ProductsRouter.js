import {Router} from 'backbone';

const ProductsRouter = Router.extend({
    routes: {
        "": "AllProducts",
        "products/*": "AllProducts",
        "products/:productId": "SpecificProduct",
        "order": "Order",
        "prev-order": "PreviousOrder",
        '*notFound': 'NotFound'
    },

    AllProducts ()
    {
        App.events.trigger('getAllProducts');
    },

    SpecificProduct (productId)
    {
        App.events.trigger('getSpecificProduct', productId);
    },

    NotFound ()
    {
        App.events.trigger('notFound');
    },

    Order ()
    {
        App.events.trigger('getOrder');
    },

    PreviousOrder ()
    {
        App.events.trigger('getAllPreviousOrderedProducts');
    }

});

export default ProductsRouter;
