import {View} from 'backbone';
import Product from '../models/Product';

const ProductLinks = View.extend({
    events: {
        'click .product a'       : 'detailsProduct',
        'click .detail-product a': 'orderProduct'
    },

    detailsProduct (e)
    {
        e.preventDefault();

        // get the clicked element and make an url
        let target = e.currentTarget;
        let url = "/products/" + target.dataset['id'];

        // send the application to the url via the router
        App.router.navigate(url, {trigger: true, replace: true});
    },

    orderProduct (e)
    {
        e.preventDefault();
        let target = e.currentTarget;
        let msg = document.getElementById("msg");

        // if the product is not in stock, let the user know. We can't order products which are out of stock
        if(target.dataset['stock'] == "false") {
            msg.innerHTML = "This product is out of stock. Please try again later.";
        } else {

            // make a new model so we can add it to the collection and save it to the database
            let newProduct = new Product({
                img_source: target.dataset['imgsource'],
                in_stock: target.dataset['stock'],
                name: target.dataset['name'],
                price: target.dataset['price'],
                product_id: target.dataset['id']
            });

            // add the new mocel to the collection
            this.collection.add(newProduct);

            // and save it to the local storage
            newProduct.save({ }, { ajaxSync: false });
            
            msg.innerHTML = "This product is added to you shopping cart! Click 'Shopping cart' to complete your order.";
        }
    }
});

export default ProductLinks;
