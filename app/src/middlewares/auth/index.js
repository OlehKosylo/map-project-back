module.exports = {
    checkAccessToken: require('./check-access-token'),
    checkRefreshToken: require('./check-refresh-token'),
    isUserAdmin: require('./check-user-role.middleware'),
    isUserAuthorization: require('./is-user-authorization.middleware'),
    isUserAdminOrSupport: require('./is-user-admin-or-support.middleware'),
    isUserAdminOrModerator: require('./is-user-admin-or-moderator.middleware'),
    isUserExistByEmailOrPhone: require('./is-user-exist-by-email-phone.middleware')
};
