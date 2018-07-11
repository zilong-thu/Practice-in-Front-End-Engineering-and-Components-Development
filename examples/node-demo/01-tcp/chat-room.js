var net = require("net");
var clients = [];
net.createServer(function(sock){
  clients.push(sock);
  sock.on("data", function(data) {
    for (var i=0; i<clients.length; i++) {
      if (clients[i] !== sock) {
        clients[i].write(data);
      }
    }
  });
  sock.on("end", function() {
    var i = clients.indexOf(sock);
    clients.splice(i, 1);
  });
}).listen(8000);