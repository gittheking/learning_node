# Node
## General
- Uses the V8 JS runtime. node provides a wrapper around this engine.
- All written in C
- Good for:
	- building websocket servers
	- Fast file uploading client
	- Ad Server 
- Not a framework
- Single threaded applications
- Non-blocking code
- Allows for pseudo-parallelism 

### Hello.js
- Sample Hello World program for a simple node server
```javascript
var http = require('http'); // How we require modules

http.createServer(function(req,res){
	res.writeHead(200); // Status code in header
	res.write('Hello, this is dog'); // Response body
	res.end(); // Close the connection
}).listen(8080);

console.log('Listening on port 8080...');
```

## Events
- Objects in node can emit events
- Inheret events from the EventEmitter class

### Creating a custom event emmitter
```javascript
// Requiring the event emitter constructor
var EventEmitter = require('events').EventEmitter;

// Creating the logger event emitter
var logger = new EventEmitter();

// Creating an event listener for the custom event called 'error'
logger.on('error', function(message){
	console.log('ERR: ' + message);
})

//Creating a new emitter
logger.emit('error','Spilled Milk');
```
## Streams 
- How data is transferred back and forth
- Readable, writable, or both
- request object is a readable stream, and the response is a writable stream
- request and response objects inheret from EventEmitter
- EXTRA: Gulp.js is built upon streams
- `request.pipe(response)` Allows you to print the response from the client
	
```javascript
// Requiring filesystem module
var fs = require('fs');

// creating a readstream
var file = fs.createReadStream('readme.md');

// creating a writestream
var newFile = fs.createWriteStream('readme_copy.md'); 

file.pipe(newFile);
```
	
	- Better way to write this code in a server would be:
	
```javascript
var fs = require('fs');
var http = require('http');

http.createServer(function(request,response){
	var newFile = fs.createWriteStream('readme_copy.md');
	request.pipe(newFile);

	request.on('end', function(){
		response.end('uploaded!');
	});
}).listen(8080);
```
	- And then use `$ curl --upload-file readme.md http://localhost:8080` from the terminal. 

### Implementing File uploading process using node streams
- What you need: 
	- http server module
	- file system module

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(request, response){
	var newFile = fs.createWriteStream('readme_copy.md');
	var fileBytes = request.headers['content-length'];
	var uploadBytes = 0;

	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			uploadBytes += chunk.length;
			var progress = (uploadBytes / fileBytes) * 100;
			response.write('progress: ' + praseInt(progress,10) + '%\n');
		}
	});

	request.pipe(newFile);

	// Rest of code here... 

}).listen(8080);
```






