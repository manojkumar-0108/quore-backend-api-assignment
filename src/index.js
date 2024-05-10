const express = require('express');

const { serverConfig } = require('./config');
const { pingCheck } = require('./controllers');



const app = express();

app.get('/ping', pingCheck('Server is live...'));

app.listen(serverConfig.PORT, () => {
    console.log(`Started server at PORT:${serverConfig.PORT}`);
})

