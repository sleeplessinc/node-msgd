
var msgd = require("./msgd"),
	util = require("util"),
	log = console.log


function msgHandler(msg, cb) {

	log("msg in: "+util.inspect(msg))

	cb({greeting:"Hello, world."})

}

msgd.createServer(msgHandler).listen(3333)
log("listening")


