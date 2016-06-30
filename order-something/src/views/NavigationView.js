/**
 * Created by basariaansz on 30-06-16.
 */
import {View} from 'backbone';
import _ from 'underscore';

// We have a navigationView for the links in the nav
const NavigationView = View.extend({
    template404: "",

    events: {
        "click #nav a" : "loadPage" // if we click an 'a' inside the #nav element, execute loadPage
    },
    
    initialize () 
    {
        // Get the template from the html template script
        this.template404 = _.template(this.$('#template-404').html());

        // If the event "notFound" is triggered from the router, excute this.notFound
        App.events.on('notFound', this.notFound, this);
    },

    loadPage (e)
    {
        e.preventDefault(); // prevents page reload

        // Look for the elements which are wrappers for pages (with the class page)
        let pageElements = this.$el[0].getElementsByClassName("page");

        // loop through them and add a non visible class, and remove the possible visible class
        _.map(pageElements, (item) => {
            item.classList.remove("visible");
            item.classList.add("non-visible");
        });

        // get the page wrapper of the selected link and make that one visible
        let activePage = document.getElementById(e.currentTarget.dataset["page"]);
        activePage.classList.remove("non-visible");
        activePage.classList.add("visible");

        // Make the use the router to display the right content..
        let url = "/" + e.currentTarget.dataset["page"];
        App.router.navigate(url, {trigger: true, replace: true});

    },

    notFound ()
    {
        this.$el.html(this.template404());
    }
});

export default NavigationView;
