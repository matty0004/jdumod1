//XFeliXBlack code with edit :)

const
express = require("express"),
app = express(),
axios = require("axios").default,
fs = require("fs"),
//Root
hip = require("./root/jdparty");

app.post("/v3/profiles/sessions", async (req, res) => {
  const { data } = await axios.post(
    hip.DEFAULT_UBISERVICES_URL + "/v3/profiles/sessions",
    req.body || {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: req.header("Authorization"),
        "Ubi-AppId": req.header("Ubi-AppId"),
        "User-Agent": "UbiServices_SDK_HTTP_Client_4.2.9_PC32_ansi_static",
        Accept: "*",
      },
      responseType: "json",
    }
  );

  res.send(data);
});

app.get("/v2/spaces/:spaceId/entities", async (req, res) =>
  res.send(JSON.parse(fs.readFileSync(hip.FILE_PATH.Entities)))
);

app.get("/v1/applications/:appId/configuration", async (req, res) =>
  res.send(JSON.parse(fs.readFileSync(hip.FILE_PATH.Configuration)))
);

app.get("/v3/users/:userId", async (req, res) => {
  const { data } = await axios.get(
    hip.DEFAULT_UBISERVICES_URL + "/v3/users/" + req.params.userId,
    {
      headers: {
        "User-Agent": "UbiServices_SDK_HTTP_Client_4.2.9_PC32_ansi_static",
        Accept: "*/*",
        Authorization: req.header("Authorization"),
        "Content-Type": "application/json",
        "ubi-appbuildid": "BUILDID_259645",
        "Ubi-AppId": "341789d4-b41f-4f40-ac79-e2bc4c94ead4",
        "Ubi-localeCode": req.header("Ubi-localeCode"),
        "Ubi-Populations": "US_EMPTY_VALUE",
        "Ubi-SessionId": req.header("Ubi-SessionId"),
      },
      responseType: "json",
    }
  );

  res.send(data);
});
app.get("/*", async (req, res) =>
  res.redirect('http://prod-justdance.justdancenext.xyz' + req.url)
);
app.post("/*", async (req, res) =>
  res.redirect('http://prod-justdance.justdancenext.xyz' + req.url)
);

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
