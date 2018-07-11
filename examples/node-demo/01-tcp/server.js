var net = require("net");
net.createServer(function(sock){
  sock.on("data", function(data) {
    sock.write(data);
  });
}).listen(8081);
