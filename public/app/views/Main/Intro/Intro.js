import template from './Intro.hbs';
import router from 'router';

export default Backbone.View.extend({

    el: '#main-content',
    template: template,

    events: {
        'click .translation-request-btn': 'navigate'
    },

    initialize: function() {
        //$('#main-content').loading('show');
        $(this.el).addClass('intro-container');
        _.bindAll(this);
    },
    
    show: function() {
        this.render();
    },

    afterRender: function() {
        //$('#main-content').loading('hide');
    },
    
    navigate: function(e) {
        e.preventDefault();
        var target = e.target;
        var action = $(target).data('action');
        var url = '/ticket/';
        url += (action.indexOf('create') > -1) ? 'create/' : 'view/';
        url += (action.indexOf('lingua') > -1) ? 'lingua' : '';
        
        $('#main-content').html('');
        router.navigate(url, {trigger: true});
    }
});
