import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';
let server;

function pipeFileToResponse(res, file, type) {
  if (type) {
    res.writeHead(200, {
      'Content-Type': type,
    });
  }

  fs.createReadStream(path.join(path.resolve(), 'sandbox', file)).pipe(res);
}

server = http.createServer(function (req, res) {
  req.setEncoding('utf8');

  const parsed = url.parse(req.url, true);
  let pathname = parsed.pathname;

  console.log('[' + new Date() + ']', req.method, pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  if (pathname === '/index.html') {
    pipeFileToResponse(res, './client.html');
  } else if (pathname === '/moobius-api-sdk.js') {
    pipeFileToResponse(res, '../dist//moobius-api-sdk.js', 'text/javascript');
  } else if (pathname === '/moobius-api-sdk.js.map') {
    pipeFileToResponse(
      res,
      '../dist//moobius-api-sdk.js.map',
      'text/javascript',
    );
  } else {
    res.writeHead(404);
    res.end('<h1>404 Not Found</h1>');
  }
});

const PORT = 3000;

server.listen(PORT, console.log(`Listening on localhost:${PORT}...`));
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(
      `Address localhost:${PORT} in use please retry when the port is available!`,
    );
    server.close();
  }
});
