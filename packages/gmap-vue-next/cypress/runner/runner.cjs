const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const port = process.env.PORT || 4173;

const server = http.createServer((req, res) => {
  const filePath = req.url === "/"
    ? path.resolve(__dirname, "./index.html")
    : req.url;
  const extension = path.extname(filePath);
  let contentType = "text/html";

  switch (extension) {
    case ".js":
      contentType = "text/javascript";
      break;
    default:
      contentType = "text/html";
      break;
  }

  fs.readFile(filePath, "utf-8")
    .then((fileText) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
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
