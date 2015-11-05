var http = require('http'); // How we require modules

http.createServer(function(req,res){
	res.writeHead(200); // Status code in header
	res.write('Hello, this is dog. '); // Response body
	setTimeout(function(){
		res.write(' Dog is done running');
		res.end(); // Close the connection
	},5000)
}).listen(8080);

console.log('Listening on port 8080...');