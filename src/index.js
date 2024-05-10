const express = require('express');
const rateLimit = require('express-rate-limit');

const { serverConfig, connectToDB } = require('./config');
const { pingCheck } = require('./controllers');
const { errorHandler } = require('./utils');

const apiRouter = require('./routes');
const app = express();

/**
 * Rate limiter
 */
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).  
});
app.use(limiter);


/**
 * body parser middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.raw());

/**
 * HTTP Requests
 */

app.get('/ping', pingCheck('Server is live...'));
app.use('/api', apiRouter);


// error handler
app.use(errorHandler);


app.listen(serverConfig.PORT, async () => {
    console.log(`Started server at PORT:${serverConfig.PORT}`);

    await connectToDB();
    console.log("Database connected successfully!");
})

