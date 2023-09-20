const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = require("express").Router();
const { ObjectId } = require("mongodb");
const removeWhiteSpaces = require("../FNS/removeWhiteSpaces");
const create_usernameInUrl = require("../FNS/create-usernameInUrl");

router.route("/").post(async (req, res) => {
  try {
    const refreshToken = req?.cookies?.Bearer;
    if (!refreshToken) {
      res.sendStatus(403);
    } else if (refreshToken) {
      let isValidRefreshToken;
      if (req.body._id) {
        isValidRefreshToken = await db
          .collection("users")
          .findOne({ _id: ObjectId(req.body._id), refresher: refreshToken });
      } else {
        if (!req.body._id) {
          isValidRefreshToken = await db
            .collection("users")
            .findOne({ refresher: refreshToken });
        }
      }

      if (isValidRefreshToken === null) {
        res.sendStatus(403);
      } else {
        //VERIFYING AND ASSIGNING NEW TOKENS

        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decoded) => {
            if (err) {
              res.sendStatus(403);
            } else {
              let accessToken;
              if (decoded?.username && decoded?.id) {
                if (
                  removeWhiteSpaces(isValidRefreshToken.username) !==
                  removeWhiteSpaces(decoded.username)
                ) {
                  res?.sendStatus(403);
                }

                accessToken = jwt.sign(
                  {
                    username: decoded.username,
                    id: decoded.id,
                  },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "30s" }
                );
              }

              if (decoded?.id && decoded?.email) {
                if (
                  removeWhiteSpaces(isValidRefreshToken.email) !==
                  removeWhiteSpaces(decoded.email)
                ) {
                  res?.sendStatus(403);
                }
                accessToken = jwt.sign(
                  {
                    email: decoded.email,
                    id: decoded.id,
                  },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "30s" }
                );
              }

              res.status(200).json({
                accessToken: accessToken,
                id: `${isValidRefreshToken._id}`,
                stagename: `${isValidRefreshToken?.stagename}`,
                image: isValidRefreshToken?.image?.buffer,
                stagenameInUrl: create_usernameInUrl(
                  isValidRefreshToken?.stagename
                ),
                websiteCreated: isValidRefreshToken?.websiteCreated,
              });
            }
          }
        );
      }
    }
  } catch (error) {
    //console.log(error);
    res?.sendStatus(500);
  }
});

module.exports = router;
