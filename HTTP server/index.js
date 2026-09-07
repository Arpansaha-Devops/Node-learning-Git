const http = require("http") ; 
const fs = require("fs") ;


const myServer = http.createServer((req,res) => {
   const log = `${Date.now()} : New Request Made : ${req.url} : ${req.method}\n`;
  fs.appendFile("log.txt", log , (err) => {
     switch(req.url){
      case "/":
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>Welcome to Home Page</h1>");
        break;
        case "/about":
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>Welcome to About Page</h1>");
        break;
        case "/contact":
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>Welcome to Contact Page</h1>");
        break;
        default:
        res.writeHead(404, {"Content-Type" : "text/html"});
        res.end("<h1>404 Page Not Found</h1>");
        break;
     }
  });

})

myServer.listen(8000, () => console.log("Server Created Sucessfully !"));

