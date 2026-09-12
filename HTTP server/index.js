const http = require("http") ; 
const fs = require("fs") ;
const url = require("url") ;


const myServer = http.createServer((req,res) => {
   if(req.url === "/favicon.ico") return res.writeHead(204); // To avoid favicon.ico error in console log .
   const log = `${Date.now()} : New Request Made : ${req.url} : ${req.method}\n`;
   const myUrl = url.parse(req.url,true);
   console.log(myUrl)
  fs.appendFile("log.txt", log , (err) => {
     switch(myUrl.pathname){
      case "/":
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>Welcome to Home Page</h1>");
        break;
        case "/about":
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>Welcome to About Page</h1>");
        break;
        case  "/search" :
        const searchUrl = myUrl.query.search_query;
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(`<h1>Welcome to Search Page</h1><p>You searched for: ${searchUrl}</p>`);
        break;
        case "/contact":
         const userName = myUrl.query.name;
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(`<h1>Welcome to Contact Page</h1><p>Hello, ${userName}!</p>`);
        break;
        default:
        res.writeHead(404, {"Content-Type" : "text/html"});
        res.end("<h1>404 Page Not Found</h1>");
        break;
     }
  });

})

myServer.listen(8000, () => console.log("Server Created Sucessfully !"));

