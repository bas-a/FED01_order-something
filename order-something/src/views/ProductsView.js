import {View} from 'backbone';
import _ from 'underscore';

const ProductsView = View.extend({
    templateProducts: '',
    templateDetailProduct: '',
    templateError: '',

    initialize ()
    {
        //Set templates to use later on
        this.templateProducts = _.template(this.$('#template-products').html());
        this.templateDetailProduct = _.template(this.$('#template-detail-product').html());
        this.templateError = _.template(this.$('#template-error').html());

        //Listen to global events for change of new product
        App.events.on('getAllProducts', this.loadAllProducts, this);
        App.events.on('getSpecificProduct', this.loadSpecificProduct, this);
    },
    
    loadAllProducts ()
    {
        // is there is no parameter given, fetch all products
        this.collection.fetch({
            success: (collection, response, options) => this.loadProductsSuccessHandler(collection, response, null),
            error: (collection, response, options) => this.loadProductsErrorHandler(collection, response, options)
        });
    },

    loadSpecificProduct (productId)
    {
        // if there is a given parameter, fetch that one.
        this.collection.fetch({
            success: (collection, response, options) => this.loadProductsSuccessHandler(collection, response, productId),
            error: (collection, response, options) => this.loadProductsErrorHandler(collection, response, options) //,
        });
    },

    loadProductsSuccessHandler (collection, response, productId)
    {
        // if there is a product id, find that one in the collection and return it
        if(productId != null && productId != undefined) {
            let product = collection.models.find(function(item){
                if(item.attributes.product_id == productId) {
                    return item;
                }
            });

            // if the product exists, show it, otherwise let the user know it doesn't exist
            if(product != undefined) {
                this.$el.html(this.templateDetailProduct({product: product}));
            } else {
                this.$el.html(this.templateError({message: "This product does not exist, please pick another product."}));
            }
        } else {
            this.$el.html(this.templateProducts({products: collection.models}));
        }
    },

    loadProductsErrorHandler (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    }
});

export default ProductsView;
