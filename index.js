// Load Config File
var config = require('./secrets/config.json');

// Load libraries; instantiate express app and socket.io
var tmi = require('tmi.js');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser')
app.use(bodyParser.json())


// Set up options for connection to twitch chat
// Add channels in the config.json file
var tmi_options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: config.twitch_identity,
  channels: config.twitch_channels
};

// Connect to twitch
var client = new tmi.client(tmi_options);
client.connect();

// When a chat message comes in
client.on('chat', function(channel, user, message, self) {
  console.log(message);
});

app.get('/', function(req, res){
  res.send("Hello World");
});

app.delete('/ban', function(req, res){
  console.log("Banning user: " + req.body.username);
  client.ban(config.twitch_channels[0], req.body.username, "Banned By Moderator");
  res.sendStatus(200);
});

app.post('/unban', function(req, res){
  console.log("Un-Banning user: " + req.body.username);
  client.unban(config.twitch_channels[0], req.body.username);
  res.sendStatus(200);
});


app.delete('/reinitialize', function(req, res){
  res.sendStatus(200)
});


var mod = {};

mod['app'] = app;

module.exports = mod;
