const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const axios = require("axios").default;
const admin = require("firebase-admin");

const serviceAccount = require("./secret.json");

const uuid = require("uuid").v4;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

const localSecret = "CONGPilDnoMinEThonYAnkoLViTypOlmStOd";

exports.end = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.set("Access-Control-Allow-Origin", "*");
    const { secret } = req.body;
    if (secret !== localSecret)
      return res.json({ code: 401, error: "Unauthorized" });

    /**
     * name
     * userid
     * tags
     * nuggets[]
     */

    const { name, userId, tags, nuggets } = req.body;
    if (!name || !userId || !tags || !nuggets || nuggets === [])
      return res.json({ code: 400, error: "Bad Request, missing arguments" });

    const repoId = uuid();

    admin
      .firestore()
      .collection("repos")
      .doc(repoId)
      .set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        creatorId: userId,
        id: repoId,
        name,
        tags: tags === [] ? ["new"] : tags,
        summary: nuggets.reduce((prev, acc) => (acc += ". " + prev)),
      });

    nuggets.forEach(nugget => {
      const id = uuid();
      admin.firestore().collection("nuggets").doc(id).set({
        content: nugget,
        repoId,
      });
    });
    res.json({ code: 200, success: true });
  });
});

exports.addRepo = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.set("Access-Control-Allow-Origin", "*");
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

        axios.post("https://pls-c3twmm6vua-uc.a.run.app/transcribe", {
          secret: localSecret,
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

        axios.post("https://pls-c3twmm6vua-uc.a.run.app/ocr", {
          secret: localSecret,
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

        axios.post("https://pls-c3twmm6vua-uc.a.run.app/text", {
          secret: localSecret,
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
