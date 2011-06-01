
# node-msgd

Implements a simple server for sending and receiving text messages.

Example use case would be a web page using AJAX calls to send msgs to a
server using a custom protocol.
Example code here demonstrates this use case.

This is the server:


var msgd = require("./msgd")

function msgHandler(msg, cb) {

	cb("You said, \""+msg+"\"");

}

msgd.createServer(msgHandler).listen(3333)
`

This is the HTML page:


&lt;html&gt;
&lt;body&gt;

Send: &lt;input onchange="changed(this.value)"&gt;&lt;p&gt;
Received: &lt;textarea id=rcvd&gt;&lt;/textarea&gt;&lt;p&gt;

&lt;script&gt;

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

&lt;/script&gt;

`

