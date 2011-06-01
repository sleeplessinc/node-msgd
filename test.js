
var server = require("./msgd")

function msgHandler(msg, cb) {
	cb("You said, \""+msg+"\"");
}

server.createServer(msgHandler).listen(3333)


