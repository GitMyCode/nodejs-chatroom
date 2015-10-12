var http = require("http");

var fs = require("fs");
var index = fs.readFileSync(__dirname + "/index.html");

var app = http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(index);
});

var io = require("socket.io").listen(app);

io.sockets.on('connection', function(socket){
  socket.emit("connected", {id: socket.id} );
  socket.on("client-connected", console.log);
  socket.on("message", function(data){
    socket.broadcast.emit("messagesent", data);
  });
});

app.listen("3000");
