var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getReservationMW = require('../middleware/reservation/getReservation');
var getReservationListMW = require('../middleware/reservation/getReservationList');
var updateReservationMW = require('../middleware/reservation/updateReservation');
var deleteReservationMW = require('../middleware/reservation/deleteReservation');
var getConnectionMW = require('../middleware/reservation/getConnection');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var updateUserDetailsMW = require('../middleware/user/updateUserDetails');
var getUserByIdMW = require('../middleware/user/getUserById');
var deleteUserMW = require('../middleware/user/deleteUser')
var reservationModel = require('../models/reservation');
var userModel = require('../models/user');

module.exports = function (app) {
    var objectRepository = {
        reservationModel: reservationModel,
        userModel: userModel
    };

    /**
     * Add new reservation
     */
    app.get('/reservation/new',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        updateReservationMW(objectRepository),
        renderMW(objectRepository, 'edit_reservation')
    );

    /**
     * List reservation by user id
     */
    app.get('/reservation',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        getReservationListMW(objectRepository),
        renderMW(objectRepository, 'reservation')
    );

    /**
     * Edit the reservation details
     */
    app.get('/reservation/:reservationId',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        updateReservationMW(objectRepository),
        renderMW(objectRepository, 'edit_reservation')
    );

    /**
     * Delete reservation
     * - then redirect to /reservation
     */
    app.get('/reservation/:reservationId/delete',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository)
    );

    /**
     * Get connections information
     */
    app.get('/connect/:reservationId',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        getConnectionMW(objectRepository),
        renderMW(objectRepository, 'connect')
    );

    /**
     * Edit user details
     */
    app.use('/profil',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        updateUserDetailsMW(objectRepository),
        renderMW(objectRepository, 'profil')
    );

    /**
     * Delete user by ID
     */
    app.use('/user/delete',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        deleteUserMW(objectRepository)
    );
};
