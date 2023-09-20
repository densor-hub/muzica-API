const create_Username_url = require("../FNS/create-usernameInUrl");
const DateValidator = require("../FNS/DurationValidator");

const VerifyURLparams = async (req, res, next) => {
  if (!(String(req?.method) === String("GET"))) {
    next();
  } else {
    try {
      if (!req?.query?.a) {
        next();
      } else {
        let artiste = req?.query?.a;

        if (artiste?.endsWith("/")) {
          artiste = String(artiste?.slice(0, artiste?.length - 1));
        }

        let isValidWebsite = await db
          .collection("websitesCreated")
          .findOne({ stagename: String(artiste)?.trim()?.toLocaleLowerCase() });

        if (isValidWebsite === null || isValidWebsite === undefined) {
          res.sendStatus(404);
        } else {
          let isValidUserWebsite = await db
            .collection("users")
            ?.findOne({ _id: isValidWebsite?.userId });

          if (isValidUserWebsite === null || isValidUserWebsite === undefined) {
            res?.sendStatus(404);
          } else {
            if (
              create_Username_url(
                isValidUserWebsite?.stagename?.trim()?.toLowerCase()
              ) !== artiste?.trim()?.toLowerCase()
            ) {
              res.sendStatus(404);
            } else {
              //get all posts from Database
              //audios
              var submittedAudios = [];
              let submittedAudios_ImagesNotConverted = await db
                .collection("audios")
                .find({ userId: isValidUserWebsite._id })
                .toArray();
              if (submittedAudios_ImagesNotConverted?.length > 0) {
                submittedAudios_ImagesNotConverted?.forEach((element) => {
                  return submittedAudios.push({
                    ...element,
                    image: element?.image?.buffer,
                  });
                });
              }

              //videos
              let submittedVideos = await db
                .collection("videos")
                .find({ userId: isValidUserWebsite._id })
                .toArray();

              //images
              var submittedImages = [];
              let submittedImages_NotConverted = await db
                .collection("images")
                .find({ userId: isValidUserWebsite._id })
                .toArray();
              if (submittedImages_NotConverted?.length > 0) {
                submittedImages_NotConverted?.forEach((element) => {
                  return submittedImages.push({
                    ...element,
                    image: element?.image?.buffer,
                  });
                });
              }

              //upcoming
              let submitedUpcoming = await db
                .collection("upcoming")
                .find({ userId: isValidUserWebsite._id })
                .toArray();
              let submittedNews = await db
                .collection("news")
                .find({ userId: isValidUserWebsite._id })
                .toArray();
              let submittedBiography = await db
                .collection("biography")
                .find({ userId: isValidUserWebsite._id })
                .toArray();
              let submittedSocials = await db
                .collection("socialmedia")
                .find({ userId: isValidUserWebsite._id })
                .toArray();
              let submittedBookingsInfo = await db
                .collection("bookings-info")
                ?.find({ userId: isValidUserWebsite._id })
                .toArray();

              //filtereing upcoming to attain unexpired upcoming
              let UnexpiredUpcoming = [];
              if (submitedUpcoming?.length > 0) {
                submitedUpcoming?.forEach((element) => {
                  if (
                    DateValidator?.equal_To_Or_Bigger_Than_Toadys_Date(
                      element?.date
                    )
                  ) {
                    UnexpiredUpcoming.push(element);
                  }
                });
              }

              let AllSubmitedDetails = [
                submittedAudios,
                submittedVideos,
                submittedImages,
                UnexpiredUpcoming,
                submittedNews,
                submittedBiography,
                submittedSocials,
                submittedBookingsInfo,
              ];
              let correspondingHeaders = [
                "audios",
                "videos",
                "images",
                "upcoming",
                "news",
                "biography",
                "contact",
                "bookings-info",
                "home",
              ];
              let websiteData = [];
              let validAPI_EndPoints = [];

              //corresponding data from database with key
              for (var i = 0; i < AllSubmitedDetails?.length; i++) {
                // if(AllSubmitedDetails[i].length!==0){
                let key = correspondingHeaders[i];
                let value = AllSubmitedDetails[i];
                websiteData.push({ key, value });
                validAPI_EndPoints.push(
                  "/" + correspondingHeaders[i] + req?._parsedUrl?.search
                );
                //  }
              }

              if (websiteData?.length === AllSubmitedDetails?.length) {
                res.status(200).json({ websiteData, validAPI_EndPoints });
              } else {
                res.sendStatus(404);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      res?.sendStatus(500);
    }
  }
};

module.exports = VerifyURLparams;
