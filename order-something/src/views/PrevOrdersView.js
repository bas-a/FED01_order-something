import {View} from 'backbone';
import _ from "underscore";

const PrevOrdersView = View.extend({
    templateProducts: "",
    templateError: "",
    
    initialize ()
    {
        //Set templates to use later on
        this.templateProducts = _.template(this.$('#template-prev-orders').html());
        this.templateError = _.template(this.$('#template-prev-orders-error').html());
        
        //Listen to global events for change of new product
        App.events.on('getAllPreviousOrderedProducts', this.loadAllOrderedProducts, this);
    },

    loadAllOrderedProducts ()
    {
        // fetch the collection
        this.collection.fetch({
            success: (collection, response) => this.loadProductsSuccessHandler(collection, response),
            error: (collection, response, options) => this.loadProductsErrorHandler(collection, response, options)
        });
    },

    loadProductsSuccessHandler (collection, response)
    {
        // if we have more then 0 models, display them, otherwise let the user know we have no products
        if(collection.models.length > 0) {
            this.$el.html(this.templateProducts({products: collection.models}));
        } else {
            this.$el.html(this.templateError({message: "You do not have ordered products earlier on this webshop." }));
        }
    },

    loadProductsErrorHandler (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    }
});

export default PrevOrdersView;
