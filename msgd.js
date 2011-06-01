http = require("http")
util = require("util")

log = console.log
insp = util.inspect

server = http.createServer(function(req, res) {
	var m = req.method

	log("method="+m)
	if(m != "POST") {
		res.end("error")
	}
	else { 
		req.on("data", function(d) {
			log("data: "+d);
		})
		req.on("error", function(e) {
			log("error"+insp(e));
		})
		req.on("end", function() {
			log("end");
			res.end("thanks\n");
		})
	}
})

server.listen(3333)

console.log("listening")

