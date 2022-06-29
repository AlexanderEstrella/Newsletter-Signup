const express = require("express");
const app = express();
const request = require("request");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singup.html");
});
app.post("/", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const Email = req.body.email;
  console.log(firstName, lastName, Email);
});
app.listen(4000, () => {
  console.log("nice work, server is good to go");
});

//5c968f60b4b6cde36cac3df91cd6d1d0-us8

//86475e85a8

const mailchimpTx = require("mailchimp_transactional")("YOUR_API_KEY");

async function run() {
  const response = await mailchimpTx.users.ping();
  console.log(response);
}

run();
