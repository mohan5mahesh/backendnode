const fs = require("fs");
console.log("Hello World!");

fs.writeFile("awoseme.js", "console.log('Hello World!')", function (err) {
  console.log(err, "fileis create");
});
