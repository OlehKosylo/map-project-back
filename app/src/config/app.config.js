module.exports = {
    PORT: process.env.PORT || 3002,
    HOST: process.env.HOST || 'http://localhost',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 300000
    }
};
