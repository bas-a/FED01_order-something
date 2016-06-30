import {View} from 'backbone';
import _ from 'underscore';

const OrderView = View.extend({
    templateOrder: "",
    templateError: "",

    events: {
        "click button": "removeProduct",
        "click a#place-order": "order"
    },

    initialize ()
    {
        //Set templates to use later on
        this.templateOrder = _.template(this.$("#template-order").html());
        this.templateError = _.template(this.$("#order-error").html());

        //Listen to global events for change of new product
        App.events.on("getOrder", this.loadOrder, this);
        App.events.on("clearShoppingCart", this.clearShoppingCart, this);
    },

    loadOrder ()
    {
        this.collection.fetch({
            success: (collection, response) => this.loadOrderSuccessHandler(collection, response),
            error: (collection, response, options) => this.loadOrderErrorHandler(collection, response, options)
        });
    },

    loadOrderSuccessHandler (collection, response)
    {
        // if we have no models in the collection, let the user know, else display the models
        if(collection.models.length > 0) {
            this.$el.html(this.templateOrder({products: collection.models}));

            // Sum the total amount of cash they have to pay
            this.getTotalAmount(collection);
        } else {
            this.$el.html(this.templateError({message: "There are no products in your shopping cart yet."}));
        }
    },

    loadOrderErrorHandler (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    },

    getTotalAmount (collection)
    {
        // sum all the amounts to get tot total amount of all products in the shopping cart
        let total = 0;
        _.map(collection.models, (item) => {
            total = total + parseInt(item.attributes.price);
        });

        // and put it in the html
        this.$el[0].getElementsByClassName("total-price")[0].innerHTML = total;
    },

    removeProduct (e)
    {
        // get the id that has to be deleted
        var id = e.target.dataset["id"];

        // find the model with that id
        var _id = this.collection.find( (model) => {
            return model.get("id") === id;
        });

        // and delete it
        _id.destroy();

        // Now we have to update the page, so we call the load order method to show the models that are left in the order
        this.loadOrder();
    },

    order (e)
    {
        e.preventDefault();
        // Because this view is not connected to the previous orders collection, we need to trigger saveOrder
        // in the app.events so the PlaceOrderView, which is connected to  previous orders collection, can save it to the local storage
        App.events.trigger('saveOrder', this.collection);
    },

    clearShoppingCart ()
    {
        // Clear the shopping cart
        _.invoke(this.collection.toArray(), "destroy");

        this.$el.html(this.templateError({message: "Your order is confirmed! You will receive your products within 5 days."}));
    }
});

export default OrderView;
