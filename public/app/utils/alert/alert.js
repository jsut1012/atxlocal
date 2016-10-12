import AlertView from './AlertView';

// Alert utility that draws a message at the top of the screen.

// USAGE:
//    import alert from 'utils/alert/alert';
//
//    alert.error('the action failed');
//    alert.info('You\'re swell');
//    alert.success('Bingo! That was sweet!')
//
//      'error' is red, 'info' is blue, 'success' is green.
//

$('body').append('<div id="alert-host"></div>');

function createAlertView(type, msg) {

    var alertView = new AlertView({msg: msg, type: type});
    alertView.render();

    // sets off an animation timer to hide gracefully
    //
    alertView.hide();
}

var alert = {
    success: function(msg) {
        createAlertView('success', msg);
    },
    info: function(msg) {
        createAlertView('info', msg);
    },
    error: function(msg) {
        createAlertView('error', msg);
    }
};

export default alert;
