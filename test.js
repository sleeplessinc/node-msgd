
var msgd = require("./msgd"),
	util = require("util"),
	log = console.log,
	insp = util.inspect

var daemon = msgd.createServer(function(msg, cb) {

	log("msg in: "+insp(msg))

	if(msg.e)
		cb("Test error")
	else
		cb(null, {r:"Hello, world."})

})

msgd.listen(3333)
log("listening")


