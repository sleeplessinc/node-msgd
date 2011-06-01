
var http = require("http")

var fail = function(res, err) {
	var msg = err.message+"\n"
	res.writeHead(500, {
		"Content-Type": "text/plain",
		"Content-Length": msg.length,
	})
	res.end(msg)
}

exports.createServer = function(msgHandler) {

	return http.createServer(function(req, res) {
		var msg = ""
		req.setEncoding("utf8")
		if(req.method != "POST") {
			fail(res, new Error("BAD METHOD: "+req.method))
		}
		else { 
			req.on("data", function(d) {
				msg += d
			})
			req.on("error", function(e) {
				fail(res, e)
			})
			req.on("end", function() {
				try {
					msgHandler(msg, function(msg) {
						res.writeHead(200, {
							"Content-Type": "text/plain",
							"Content-Length": msg.length,
						})
						res.end(msg)
					})
				}
				catch(e) {
					fail(res, e)
				}
			})
		}
	})
}

