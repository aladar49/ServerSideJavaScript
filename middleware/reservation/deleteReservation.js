var requireOption = require('../common').requireOption;

/**
 * Delete the reservation object, if its already loaded
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.tpl.reservation === 'undefined') {
            return next();
        }

        res.tpl.reservation.remove(function (err) {
            if (err) {
                return next(err);
            }

            //redirect to all reservations
            res.redirect('/reservation');
        });
    };
};