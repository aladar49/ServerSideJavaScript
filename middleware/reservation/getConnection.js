var requireOption = require('../common').requireOption;

/**
 * Simulate connection information as if it has been queried from an external server
 */
module.exports = function (objectrepository) {
    var reservationModel = requireOption(objectrepository, 'reservationModel');

    return function (req, res, next) {
        res.tpl.connectionErrorMessage = undefined;
        if((typeof res.tpl.reservation.when === 'undefined') || (res.tpl.reservation.hours === 'undefined')){
            res.tpl.connectionErrorMessage = "Reservation time not specified!";
            return next();
        }

        var time = new Date(res.tpl.reservation.when);
        var currentDate = new Date();
        //Manage different Timezone
        currentDate.setHours(currentDate.getHours() + 2 );

        if (time > currentDate) {
            res.tpl.connectionErrorMessage = 'The reservation has not started yet.';
        }

        if (time.setHours(time.getHours() + res.tpl.reservation.hours) < currentDate) {
            res.tpl.connectionErrorMessage = 'The reservation has expired';
        }

        var ip = Math.floor((Math.random() * 255) + 1) + '.';
        ip +=  Math.floor((Math.random() * 255) + 1) + '.';
        ip +=  Math.floor((Math.random() * 255) + 1) + '.';
        ip +=  Math.floor((Math.random() * 255) + 1);

        if(!res.tpl.connectionErrorMessage){
            res.tpl.connection = {ip: ip, user: 'admin', password: 'admin'};
        }else {
            res.tpl.connection = {ip: '', user: '', password: ''};
        }
        return next();
    };
};