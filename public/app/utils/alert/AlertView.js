import template from './AlertView.hbs';

// Do not use this directly. Instead call the utils/alert.js module
export default Backbone.View.extend({

    el: '#alert-host',

    template: template,

    events: {
        'click .alerts-view': 'close'
    },

    initialize: function(options) {
        _.bindAll(this);
        this.options = options;
    },

    hide: function() {
        window.setTimeout(() => {
            $('.alerts-view').removeClass('visible');
            window.setTimeout(() => {
                $('#alert-host').empty();
            }, 400);
        }, 7000);
    },

    close: function() {
        $('.alerts-view').removeClass('visible');
        $('#alert-host').empty();
    },

    destroy: function() {
        this.remove();
        this.unbind();
    },

    // --- RENDERING -----------------
    serialize: function() {
        var data = this.options;

        var iconMap = {
            success: 'check',
            info: 'info',
            error: 'alert'
        };

        data.type = iconMap[data.type];
        // doing this because handlebars will use the msg helper
        data.alertMsg = data.msg;

        return data;
    },

    afterRender: function() {
        _.defer(() => {
            this.$('.alerts-view').addClass('visible');
        });
    }
});
