var expect = require('chai').expect;
var updateUserDetailsMW = require('../../middleware/user/updateUserDetails');

describe('updateUserDetails middleware', function () {
    describe('should call next when', function () {

        it('no post parameter is given', function (done) {
            var nehivd = false;

            var fakeUserModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            updateUserDetailsMW({
                userModel: fakeUserModel
            })({}, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            });
        });

        it('no email parameter is given', function (done) {
            var req = {
                body: {
                    password: 'asd',
                    name: 'lorem'
                }
            };
            var nehivd = false;

            var fakeUserModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            updateUserDetailsMW({
                userModel: fakeUserModel
            })(req, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            });
        });

        it('no password parameter is given', function (done) {
            var req = {
                body: {
                    email: 'lorem@ipsum.com',
                    name: 'lorem'
                }
            };
            var nehivd = false;

            var fakeUserModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            updateUserDetailsMW({
                userModel: fakeUserModel
            })(req, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            });
        });

        it('no name parameter is given', function (done) {
            var req = {
                body: {
                    email: 'lorem@ipsum.com',
                    password: 'asd'
                }
            };
            var nehivd = false;

            var fakeUserModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            updateUserDetailsMW({
                userModel: fakeUserModel
            })(req, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            });
        });

        it('should update existed user if everything is ok', function (done) {
            var req = {
                body: {
                    password: 'asd',
                    email: 'lorem@ipsum.com',
                    name: 'lorem'
                }
            };

            var res = {
                redirect: function (to) {
                    expect(to).to.eql('/reservation');
                    done();
                },
                tpl: {
                    error :[],
                    user: undefined
                }
            };

            var fakeUserModel = function () {
            };

            fakeUserModel.prototype.save= function (cb) {
                return cb(undefined, true);
            };

            updateUserDetailsMW({
                userModel: fakeUserModel
            })(req, res, function (err) {
                expect(err).to.eql(false);
                done();
            });
        });

    });
});