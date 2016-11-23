var http = require('http');
var httpProxy = require('http-proxy').createProxyServer({})

// TODO: 需要在 /etc/vhosts 加入域名解析

console.log('start http proxy');
var proxyServer = http.createServer((req,res) => {
  switch(req.headers.host){
    case 'www.simlelive.com': {
      httpProxy.web(req,res,{target: 'http://localhost:8000'})
    }
  }
}).listen(80);