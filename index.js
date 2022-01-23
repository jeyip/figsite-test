const axios = require("axios");
const express = require("express");
const url = require("url");

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET 
const app = express();

app.get("/", (req, res) => {
  res.json("Test");
});

app.get("/authorize", async (req, res) => {
  const params = new url.URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: "https://figsite-test.herokuapp.com/authorize",
    grant_type: "authorization_code",
    code: req?.query?.code,
  });

  try {
    const result = await axios.post(
      "https://public-api.wordpress.com/oauth2/token",
      params.toString()
    );
    res.json(result.data);
  } catch (e) {
    result = res.json(e);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
