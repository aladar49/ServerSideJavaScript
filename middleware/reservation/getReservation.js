var requireOption = require('../common').requireOption;

/**
 * Get the reservation for the id param
 *  - if there is no such reservation, redirect to /tasks
 *  - if there is one, put it on res.tpl.task
 */
module.exports = function (objectrepository) {
    var reservationModel = requireOption(objectrepository, 'reservationModel');

    return function (req, res, next) {
        if(req.params.reservationId === 'undefined' ){
            res.tpl.reservation.destroy();
            return next();
        }



        reservationModel.findOne({
            _id: req.params.reservationId
        },function (err, result) {

            if (err) {
                return next(err);
            }

            res.tpl.reservation = result;
            return next();
        });
    };
};