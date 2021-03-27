/// app path.
var path = require('path')
/// express server
const express = require('express')
// for testing ..
const mockAPIResponse = require('./mockAPI.js')
// to save API_KEY on process and to be secured 
const dotenv = require('dotenv')
/// to solve cors origin .. same server for front/back .. client and server.
const cors = require('cors');
// to fetch data from meancloud, we need fetch.
const fetch = require('node-fetch')

// express version provide that function.
// const bodyParser = require('body-parser');

/// initialize and config dotenv.
dotenv.config();

// create instance from express server as our app. server.
const app = express()

// let app use cors library to handle origin cors problem.
app.use(cors())

/// replaced by express.json()
// app.use(bodyParser.json())

// to handle json bodies parsing between server-client.
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// for production..
app.use(express.static('dist'))

/// / routing to up server for client page.. only one page exist.
app.get('/', function (request, response) {

    //// sending only one page exist.
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))

    // res.json({
    //     message:'Hi from Seif!'}
    // );
});

// meancloud api for sentiment extraction..
// meancloud do NLP for me :D
const BASE_MEANCLOUD_URL = 'https://api.meaningcloud.com/sentiment-2.1?';

// url-analysis routing .. to handle post request from front end..
app.post('/url-analysis', async (request, response) => {

    // get URL param requried to send to meancloud API to analysis it's content.
    var urlParam = request.body.urlText;

    // logging URL for debugging..
    console.log(urlParam);
    try {
        /// fetch data from meancloud using URL and saved key.
        const apiResponse = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${urlParam}&lang=en`);

        /// getting data as json..
        const data = await apiResponse.json();
        /// sending data to front-end.
        response.send(data);

    } catch (exception) {
        /// logging exception with error level.
        console.error(exception);
    }
});

// up and run server with port 8081
app.listen(8081, (exception, server) => {

    /// if something wrong happened .. logged
    if (exception) {
        console.error(exception);
        throw exception;
    }
    /// else: logging that app. is healthy/up & running..
    console.log("Sentiment Extractor app listening on port 8081!");
})

/// for testing simulation.
app.get('/test', (req, res) => {
    res.send(mockAPIResponse)
})

/// to be packed by webpack and used if creating server side unit tests.
module.exports = app;