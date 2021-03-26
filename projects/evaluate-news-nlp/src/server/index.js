var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv')
const cors = require('cors');
const fetch = require('node-fetch')
// const bodyParser = require('body-parser');

dotenv.config();
const app = express()
app.use(cors())
// app.use(bodyParser.json())


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))

    // res.json({
    //     message:'Hi from Seif located at Server'}
    // );
})
const BASE_MEANCLOUD_URL = 'https://api.meaningcloud.com/sentiment-2.1?';
app.post('/url-analysis', async (req, res) => {
    var urlParam = req.body.urlText;
    console.log(urlParam);
    try {
        const apiResponse = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${urlParam}&lang=en`);
        const data = await apiResponse.json();

      //  console.log(data);

        res.send(data);

    } catch (exception) {
        console.error(exception);
    }
});

app.listen(8081, (error, server) => {
    if (error) throw error;
    console.log("Sentiment Extractor app listening on port 8081!");
})


app.get('/test',  (req, res) =>{
    res.send(mockAPIResponse)
})
