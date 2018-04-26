var requireOption = require('../common').requireOption;

/**
 * Create (or update) reservation if we have the data for it
 * update if we have a res.tpl.reservation, create if we don't have
 */
module.exports = function (objectrepository) {
    var reservationModel = requireOption(objectrepository, 'reservationModel');
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.query.name === 'undefined') ||
            (typeof req.query.vCPU === 'undefined') ||
            (typeof req.query.RAM === 'undefined')||
            (typeof req.query.when === 'undefined') ||
            (typeof req.query.hours === 'undefined')){
            return next();
        }

        var reservation = undefined;
        if((typeof res.tpl.reservation !== 'undefined') && (res.tpl.reservation !== null)) {
            reservation = res.tpl.reservation;
        }else{
            reservation = new reservationModel();
        }


        reservation.name = req.query.name;
        reservation.vCPU = req.query.vCPU;
        reservation.RAM = req.query.RAM;
        reservation.when = req.query.when;
        reservation.hours = req.query.hours;
        reservation._user = req.session.userid;

        reservation.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/reservation');
        });
    };

};