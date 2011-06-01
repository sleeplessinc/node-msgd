
# node-msgd

Implements a simple server for sending and receiving custom messages over HTTP


## Example Use Case

An example use case would be a web page using AJAX calls to send msgs to a
server using a custom protocol.
This is demonstrated below.

Server code:

	var msgd = require("./msgd")

	function msgHandler(msg, cb) {

		cb("You said, \""+msg+"\"");

	}

	msgd.createServer(msgHandler).listen(3333)


HTML page:

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

