
var msgd = require("./msgd")

function msgHandler(msg, cb) {

	cb("You said, \""+msg+"\"");

}

msgd.createServer(msgHandler).listen(3333)


