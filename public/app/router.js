
import IntroView from 'views/Main/Intro/Intro';

var Router = Backbone.Router.extend({

    routes: {
        '*path': 'default'
    },

    initialize: function() {
        this.secondaryNav = 'grid';
        _.bindAll(this);
    },
    
    default: function() {
        $('.nav-lnk').removeClass('active');
        $('#nav-home-lnk').addClass('active');
        
        this.introView = this.introView || new IntroView();
        this.introView.show();
    }
});

export default new Router();
