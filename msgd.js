http = require("http")
var util = require("util")

var log = console.log
var insp = util.inspect


exports.createServer = function(msgHandler) {

	return http.createServer(function(req, res) {
		var jsonIn = ""

		req.setEncoding("utf8")
		res.setEncoding("utf8")

		log("method="+req.method)
		if(req.method != "POST") {
			res.statusCode = 404;
			res.end("Bad method: "+m)
		}
		else { 
			req.on("data", function(d) {
				jsonIn += d
			})
			req.on("error", function(e) {
				res.statusCode = 404;
				res.end("Read error")
			})
			req.on("end", function() {
				try {
					msgHandler(JSON.parse(jsonIn), function(e, msg) {
						var jsonOut = null

						if(e) {
							res.statusCode = 404;
							res.end("Error: "+e)
						}
						else {
							jsonOut = JSON.stringify(msg)
							res.writeHead(200, {
								"Content-Type": "text/plain",
								"Content-Length": jsonOut.length,
							})
							res.end(jsonOut)
						}
					})
				}
				catch(e) {
					res.statusCode = 404;
					res.end("Read error")
				}
			})
		}
	})
}


// test code

if(true) {
	var s = exports.createServer(function(msg, cb) {
		log("msg="+insp(msg))
		cb(null, {r:"okey"})
	})

	s.listen(3333)

	log("listening")
}

