import modalBaseTemplate from './modalTemplate.hbs';

var modal = {
    show: function(elemId, template) {

        // Insert our base template, that has the wrapping structure of a modal
        $('body').append(modalBaseTemplate({elemId: elemId}));

        // Add the content template that is passed in to the base templates content area
        $('#' + elemId + '-content').append(template);

        // Show the modal
        var modalElem = $('#' + elemId);
        modalElem.modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        // Clean up when the modal is hidden
        modalElem.on('hidden.bs.modal', () => {
            modalElem.remove();
        });
    },

    hide: function(elemId) {
        var modalElem = $('#' + elemId);
        modalElem.modal('hide');
    }
};


// Export our modal object
export default modal;
