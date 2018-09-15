// Load Config File
var config = require('./secrets/config.json');

// Load libraries; instantiate express app and socket.io
var tmi = require('tmi.js');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);


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


app.delete('/reinitialize', function(req, res){
  res.sendStatus(200)
});


var mod = {};

mod['app'] = app;

module.exports = mod;
