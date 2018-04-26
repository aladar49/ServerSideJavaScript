var requireOption = require('../common').requireOption;

/**
 * Get the reservation list and put the reservation on res.tpl.reservation
 */
module.exports = function (objectrepository) {

    var reservationModel = requireOption(objectrepository, 'reservationModel');

    return function (req, res, next) {

        reservationModel.find({
            _user : res.tpl.user._id
        },function (err, results) {
            if (err) {
                return next(new Error('Error getting reservations'));
            }

            res.tpl.reservations = results;
            return next();
        });
    };

};