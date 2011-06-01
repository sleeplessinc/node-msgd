
# node-msgd

Implements a simple server for sending and receiving custom messages over HTTP.


## Example Use Case

An example use case would be a web page using AJAX calls to send msgs to a
server using a custom protocol.

See [test.js](test.js) and [test.html](test.js)

###Server code:

	var msgd = require("./msgd")

	function msgHandler(msg, cb) {
		cb("You said, \""+msg+"\"");
	}

	msgd.createServer(msgHandler).listen(3333)


###HTML page:

	<html>
	<body>

	Send: <input onchange="changed(this.value)"><p>
	Received: <textarea id=rcvd></textarea><p>

	<script>

		function changed(v) {
			var r = new XMLHttpRequest();
			r.open("POST", "http://127.0.0.1:3333/", true);
			r.onreadystatechange = function() {
				if(r.readyState == 4) {
					document.getElementById("rcvd").value = r.responseText
					r.onreadystatechange = function() {}
				}
			}
			r.send(v);
		}

	</script>


## Notes

The server only accepts POST method transactions.
All other methods result in an HTTP 500 response.
HTTP is used merely to provide a transport for the custom message protocol.
Therefore, there is no need to support, or utilize any of the features of HTTP
beyond just what is needed to move the messages back and forth.
