const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const https = require("https");

const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "9a7a7852953a91b07acf0cbe9690f27d-us8",

  server: "us8",

  // server key looks like us19 or us13 check your API key to get server key
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName1 = req.body.first;

  const lastName1 = req.body.last;

  const email1 = req.body.email;

  // Audience or list id

  const listId = "86475e85a8";

  const subscribingUser = {
    firstName: firstName1,

    lastName: lastName1,

    email: email1,
  };

  async function run() {
    const res = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,

      status: "subscribed",

      merge_fields: {
        FNAME: subscribingUser.first,

        LNAME: subscribingUser.last,
      },
    });
  }
  if (res.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }

  run();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running at port 3000");
});

// key :9a7a7852953a91b07acf0cbe9690f27d-us8

//86475e85a8
