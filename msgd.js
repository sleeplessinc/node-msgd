
var http = require("http")
var util = require("util")

var log = console.log
var insp = util.inspect


var fail = function(res, err) {
	var jsonOut = err.message+"\n"

	res.writeHead(500, {
		"Content-Type": "text/plain",
		"Content-Length": jsonOut.length,
	})
	log("<-- "+jsonOut)
	res.end(jsonOut)
}


exports.createServer = function(msgHandler) {

	return http.createServer(function(req, res) {
		var jsonIn = ""

		req.setEncoding("utf8")
		//res.setEncoding('utf8')

		log("method="+req.method)
		if(req.method != "POST") {
			fail(res, new Error("BAD METHOD: "+req.method))
		}
		else { 
			req.on("data", function(d) {
				jsonIn += d
			})
			req.on("error", function(e) {
				fail(res, e)
			})
			req.on("end", function() {
				try {
					log("--> "+jsonIn)
					msgHandler(JSON.parse(jsonIn), function(msg) {
						var jsonOut = JSON.stringify(msg)
						res.writeHead(200, {
							"Content-Type": "text/plain",
							"Content-Length": jsonOut.length,
						})
						log("<-- "+jsonOut)
						res.end(jsonOut)
					})
				}
				catch(e) {
					fail(res, e)
				}
			})
		}
	})
}


