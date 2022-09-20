const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const port = process.env.PORT || 4173;

const server = http.createServer((req, res) => {
  const baseUrl = path.resolve(__dirname, './dist');
  const filePath = req.url === '/'
    ? path.join(baseUrl, 'index.html')
    : !/^https?:\/\//gim.test(req.url)
      ? path.join(baseUrl, req.url)
      : req.url;
  const extension = path.extname(filePath);
  let contentType = 'text/html';

  switch (extension) {
    // case '.js':
    //   contentType = 'text/javascript';
    //   break;
    // case '.mjs':
    // case '.vue':
    //   contentType = 'application/javascript';
    //   break;
    case '.js':
      contentType = 'application/javascript';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  fs.readFile(filePath, 'utf-8')
    .then((fileText) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.write(fileText);
      res.end();
    })
    .catch((error) => {
      console.log(`reading from: ${filePath}`);
      console.error(error);
      res.end();
    });
});

server.listen(port, () => {
  console.info(`server running on http://localhost:${port}`);
});
