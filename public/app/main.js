// Import global dependencies -- this are for older, less
// modular libs. Its better to include things as you need them.
import 'backbone.layoutmanager';
import Handlebars from 'handlebars';

// The router is self-executing
import './router';

// Register some handlebar helpers
Handlebars.registerHelper('msg', function(key) {
    
    return new Handlebars.SafeString(key);
});


// Initialize Backbone.LayoutManager
Backbone.Layout.configure({manage: true});

// Extend jquery with a helper function for disabing elements
jQuery.fn.disable = function() {
    return this.attr('disabled', 'disabled').addClass('disabled');
};

// Extend jquery with a helper function for enabling elements
jQuery.fn.enable = function() {
    return this.removeAttr('disabled').removeClass('disabled');
};

// Extend jquery with a custom easing function
jQuery.extend($.easing, {
    def: 'easeOutCirc',
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
});

// Initialize routing
Backbone.history.start({pushState: true});
