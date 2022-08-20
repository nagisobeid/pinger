const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const ping = require('ping')
//const bodyParser = require('body-parser')
const siteData = require('./sites');
//var request = require("request");
//const scrape = require('website-scraper')
//const nodehttp = require('node-http-ping')

const unchagedSites = siteData.sites; 
let sites =  siteData.sites;
 
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
      }
});


io.on("connection", (socket) => {
    console.log('New Connection -> SOCKET ID:', socket.id)
});

setInterval( async () => {
    io.emit("pinging", true);
    for(site of sites) {
        let status = await ping.promise.probe(site.address);
        
        //if(!status.alive) {

        //}
        site.status = status;
    }
    io.emit("pinging", false);
    io.emit("data", sites);
    //const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);
    //console.log(sockets);
}, 30000);

//registerAction('error', async ({error}) => {console.log(error)});
  
httpServer.listen(8080);

const app = express()
//app.use(express.json());
//app.use(morgan('combined'))
//app.use(bodyParser.json())
app.use(cors())
const port = 3000


app.get('/', async (req, res) => {
    res.json(siteData.sites);
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
