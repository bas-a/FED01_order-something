import {View} from 'backbone';
import Product from '../models/Product';
import _ from 'underscore';

const PlaceOrderView = View.extend({

    initialize ()
    {
        App.events.on("saveOrder", this.saveNewOrder, this);
    },

    saveNewOrder (collection) {

        _.map(collection.models, (model) => {

            // make a new model so we can save it to the database
            let newProduct = new Product({
                id: model.attributes.id,
                img_source: model.attributes.img_source,
                in_stock: model.attributes.in_stock,
                name: model.attributes.name,
                price: model.attributes.price,
                product_id: model.attributes.product_id
            });

            // add the new model to the collection
            this.collection.add(newProduct);

            // and save it to the local storage
            newProduct.save({ }, { ajaxSync: false });
        });
        
        // And now we have to clear the shopping cart again
        App.events.trigger('clearShoppingCart');

    }
});

export default PlaceOrderView;
