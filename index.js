const axios = require("axios");
const express = require("express");
const qs = require("qs");

const PORT = process.env.PORT || 6789;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const app = express();

app.get("/", (req, res) => {
  res.json("Test");
});

app.get("/authorize", async (req, res) => {
  console.log({ CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD });
  const data = qs({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: "https://figsite-test.herokuapp.com/",
    grant_type: "password",
    username: USERNAME,
    password: PASSWORD,
  });
  try {
    const result = await axios.post(
      "https://public-api.wordpress.com/oauth2/token",
      data
    );
    res.json(result);
  } catch (e) {
    result = res.json(e);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
