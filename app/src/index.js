const http = require('http');

const { app } = require('./app');
const { appConfig } = require('./config');
const { sequelize } = require('./data-base');

const port = appConfig.PORT;

const init = async () => {
    const server = http.createServer(app);

    await sequelize.sync();

    server.listen(port, () => {
        console.log(`Server has been started on ${port} port`);
    });
};

init().catch((e) => {
    console.log(e);
});
