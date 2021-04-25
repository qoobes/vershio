const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const axios = require("axios").default;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const secret =
  "mu*d2Qos5jmuEmQhaLYUmnE97XgSo@QOQ7cQX$wX$4662u2!hjD4EGRc#zYqeylWh4PhsfYMhlbBj35Nz6S2*xvbh";

exports.addRepo = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { name, userId, tags, sourceType } = req.body;

    if (!name || !userId || !tags || !sourceType)
      return res.json({
        success: false,
        code: 400,
        error: "Bad Request, missing arguments",
      });

    switch (sourceType) {
      case "video":
        const videoUrl = req.body.storageUrl[0];
        if (!videoUrl)
          return res.json({
            success: false,
            code: 400,
            error: "Bad Request, missing storage url for video upload",
          });

        console.log(videoUrl);
        // pass da torch on to the next cloud function

        axios.post("https://google.com/yeahman", {
          secret,
          name,
          userId,
          tags,
          videoUrl,
        });
        return res.json({ success: true, code: 200 });

      case "image":
        const imageUrls = req.body.storageUrl;
        console.log(imageUrls);
        // pass it on

        axios.post("https://google.com/imageone", {
          secret,
          name,
          userId,
          tags,
          imageUrls,
        });
        break;

      case "text":
        const text = req.body.text;
        console.log(text);

        // this one goes straight to gpt3

        axios.post("https://google.com/textone", {
          secret,
          name,
          userId,
          tags,
          text,
        });
        return res.json({ success: true, code: 200 });

      default:
        res.json({
          success: false,
          code: 400,
          error: "Bad Request, unsupported sourcetype",
        });
        return res.json({ success: true, code: 200 });
    }
  });
});
