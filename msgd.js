
var http = require("http")

var fail = function(res, err) {
	var msgOut = err.message+"\n"
	res.writeHead(500, {
		"Content-Type": "text/plain",
		"Content-Length": msgOut.length,
	})
	res.end(msgOut)
}

exports.createServer = function(msgHandler) {

	return http.createServer(function(req, res) {
		var msgIn = ""
		req.setEncoding("utf8")
		if(req.method != "POST") {
			fail(res, new Error("BAD METHOD: "+req.method))
		}
		else { 
			req.on("data", function(d) {
				msgIn += d
			})
			req.on("error", function(e) {
				fail(res, e)
			})
			req.on("end", function() {
				try {
					msgHandler(msgIn, function(msg) {
						var msgOut = msg
						res.writeHead(200, {
							"Content-Type": "text/plain",
							"Content-Length": msgOut.length,
						})
						res.end(msgOut)
					})
				}
				catch(e) {
					fail(res, e)
				}
			})
		}
	})
}

