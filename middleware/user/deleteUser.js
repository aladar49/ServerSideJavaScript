var requireOption = require('../common').requireOption;

/**
 * Delete the reservation object, if its already loaded
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.tpl.user === 'undefined') {
            return next();
        }

        res.tpl.user.remove(function (err) {
            if (err) {
                return next(err);
            }
                req.session.destroy();

            //redirect to all tasks
            res.redirect('/login');
        });
    };
};