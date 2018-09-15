
const twitch_control = require('./index');
var app = twitch_control['app']

app.listen(3000, function(){
  console.log('listening on *:3000');
});
