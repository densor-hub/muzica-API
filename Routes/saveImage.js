const router = require("express").Router();
const fileSystem = require("fs");
const path = require("path");
const removeWhiteSpaces = require("../FNS/removeWhiteSpaces");
require("express-fileupload");
const { ObjectId } = require("mongodb");
const sharp = require("sharp");

router
  .route("/")

  .post(async (req, res) => {
    try {
      if (!req?.cookies?.Bearer) {
        res.sendStatus(401);
      } else {
        let isValidUser = await db
          .collection("users")
          .findOne({ refresher: req?.cookies?.Bearer });

        if (isValidUser === null) {
          res.sendStatus(403);
        } else {
          if (!req?.files?.file) {
            res.sendStatus(405);
          } else {
            let identifier = `${isValidUser?.stagename?.toLowerCase()}${Date.now()}`;
            let fileExtention = `${req.files.file.mimetype.split("/")[1]}`;

            // console.log(req?.files?.file);

            sharp(req?.files?.file?.data)
              ?.resize(500, 500, { fit: "inside", fastShrinkOnLoad: true })
              ?.withMetadata()
              ?.toBuffer()
              .then((results) => {
                console.log("RESULLTTSSS");
                console.log(results);
                db.collection("images")
                  .insertOne({
                    userId: isValidUser._id,
                    image: results,
                  })
                  .then(async (results) => {
                    if (Boolean(req?.body?.not_current_content) === true) {
                      res.sendStatus(200);
                    } else {
                      if (results?.acknowledged && results?.insertedId) {
                        let existingCurrentContent = await db
                          .collection("currentconent")
                          ?.findOne({ userId: isValidUser?._id });
                        if (existingCurrentContent !== null) {
                          db.collection("currentconent")
                            ?.replaceOne(
                              { _id: existingCurrentContent?._id },
                              {
                                _id: existingCurrentContent?._id,
                                userId: existingCurrentContent?.userId,
                                currentContent: "images",
                                submitted: "images",
                              }
                            )
                            .then(() => {
                              res.sendStatus(200);
                            });
                        } else {
                          db.collection("currentconent")
                            ?.insertOne({
                              userId: isValidUser?._id,
                              currentContent: "images",
                              submitted: "images",
                            })
                            .then((results) => {
                              if (results?.insertedId) {
                                res.sendStatus(200);
                              } else {
                                res?.sendStatus(204);
                              }
                            });
                        }
                      } else {
                        throw error;
                      }
                    }
                  });
              });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res?.sendStatus(500);
    }
  });

module.exports = router;
