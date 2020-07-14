const emailSender = require("./src/utils/emailSender");
const mustache = require("mustache");
const fs = require("fs");

const template = fs.readFileSync("./src/templates/email.html", "utf-8");

emailSender({
  to: "muhamadadam20@gmail.com",
  subject: "Hello, i'm from antoo developers",
  html: mustache.render(template, {
    email: "muhamadadam20@gmail.com",
    code: 6969,
  }),
});
