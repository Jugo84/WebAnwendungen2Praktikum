/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////
var fs = require('fs');
const path = require('path');
console.log("Starting server...");

try {

    // create server
    console.log("Creating Web Server...");
    const HTTP_PORT = 80;
    var express = require("express");
    var app = express();

    // provide service router with database connection / store the database connection in global server environment
    console.log("Setup Web Server...");

    // setup server for post data
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(function(request, response, next){
        response.setHeader("Access-Control-Allow-Origin", "*"); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // start server
    app.listen(HTTP_PORT, () => {
        console.log("Start Web Server...");
        console.log("Server running at localhost on port %PORT%".replace("%PORT%", HTTP_PORT));
        console.log("\n\n-----------------------------------------");
        console.log("exit / stop Server by pressing 2 x CTRL-C");
        console.log("-----------------------------------------\n\n");
    });

    // define endpoints for services
    console.log("Binding enpoints...");

    // bind root endpoint
    app.get("/", (request, response) => {
        console.log("Server called without any specification");
        response.status(200).json("Server API arbeitet an Port " + HTTP_PORT.toString());
    });

    // HTML
    app.get('/home.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../home.html'));
    });

    app.get('/kinosaal.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../kinosaal.html'));
    });

    app.get('/checkout.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../checkout.html'));
    });

    app.get('/filmuebersicht.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../filmuebersicht.html'));
    });

    app.get('/impressum.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../impressum.html'));
    });

    app.get('/kasse.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../kasse.html'));
    });

    app.get('/kinosaal_video.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../kinosaal_video.html'));
    });

    app.get('/popcornShop.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../popcornShop.html'));
    });

    app.get('/warenkorb.html',function(req,res){
        res.sendFile(path.join(__dirname+'/../warenkorb.html'));
    });

    // CSS

    app.get('/CSS-Styles/style.css',function(req,res){
        res.sendFile(path.join(__dirname+'/../CSS-Styles/style.css'));
    });

    app.get('/CSS-Styles/kinosaal_style.css',function(req,res){
        res.sendFile(path.join(__dirname+'/../CSS-Styles/kinosaal_style.css'));
    });

    app.get('/CSS-Styles/stylePopcornShop.css',function(req,res){
        res.sendFile(path.join(__dirname+'/../CSS-Styles/stylePopcornShop.css'));
    });
    
    // Javascript

    app.get('/Javascript/filmuebersicht_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/filmuebersicht_API.js'));
    });

    app.get('/Javascript/functionality.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/functionality.js'));
    });

    app.get('/Javascript/helper.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/helper.js'));
    });

    app.get('/Javascript/home_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/home_API.js'));
    });

    app.get('/Javascript/kasse_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/kasse_API.js'));
    });

    app.get('/Javascript/kinosaal_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/kinosaal_API.js'));
    });

    app.get('/Javascript/kinosaal_chat_functionality.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/kinosaal_chat_functionality.js'));
    });

    app.get('/Javascript/kinosaal_video_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/kinosaal_video_API.js'));
    });
    
    app.get('/Javascript/popcornShop_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/popcornShop_API.js'));
    });
    
    app.get('/Javascript/Warenkorb.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/Warenkorb.js'));
    });

    app.get('/Javascript/warenkorb_API.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/warenkorb_API.js'));
    });

    app.get('/Javascript/helpers.js',function(req,res){
        res.sendFile(path.join(__dirname+'/../Javascript/helpers.js'));
    });

    // Pictures

    app.get('/Bilder/BerlinBerlin.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/BerlinBerlin.jpg'));
    });

    app.get('/Bilder/bier.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/bier.jpg'));
    });

    app.get('/Bilder/chips.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/chips.jpg'));
    });

    app.get('/Bilder/cinema.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/cinema.jpg'));
    });

    app.get('/Bilder/cola.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/cola.jpg'));
    });

    app.get('/Bilder/erdnuesse.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/erdnuesse.jpg'));
    });

    app.get('/Bilder/fanta.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/fanta.jpg'));
    });

    app.get('/Bilder/haribo.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/haribo.jpg'));
    });

    app.get('/Bilder/inception.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/inception.jpg'));
    });

    app.get('/Bilder/JamesBond.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/JamesBond.jpg'));
    });

    app.get('/Bilder/nachos.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/nachos.jpg'));
    });

    app.get('/Bilder/popcorn.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/popcorn.jpg'));
    });

    app.get('/Bilder/RufDerWildnis.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/RufDerWildnis.jpg'));
    });

    app.get('/Bilder/schokolade.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/schokolade.jpg'));
    });

    app.get('/Bilder/sitze-footer-1.png',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/sitze-footer-1.png'));
    });

    app.get('/Bilder/smarties.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/smarties.jpg'));
    });

    app.get('/Bilder/sprite.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/sprite.jpg'));
    });

    app.get('/Bilder/zollernalb.jpg',function(req,res){
        res.sendFile(path.join(__dirname+'/../Bilder/zollernalb.jpg'));
    });

    // Videos

    app.get('/Videos/RufDerWildnis.mp4',function(req,res){
        res.sendFile(path.join(__dirname+'/../Videos/RufDerWildnis.mp4'));
    });

} catch (ex) {
    console.log(ex);
}