require ('dotenv').config();
const passport = require('passport');


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use('google', new GoogleStrategy({
    clientID: "290860385790-ol28keolhg8jua5u864on9o7vv0a44jv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/google/callback"
  },

  function(accessToken, refreshToken, profile, cb) {
    try {
        db.collection("users")?.findOne({googleId : profile?.id}).then((response)=>{
            if(response===null || response===undefined){
                db.collection('users')?.insertOne({googleId : profile?.id, fullname : profile?._json?.name, profilePicture: profile._json?.picture, email: profile?._json?.email, stagename: profile?.displayName, gender:profile?.gender, websiteCreated:"" }).then(()=>{
                    cb(null, profile);
                })
    
            }else{
                cb(null, profile);
            }
        })
    } catch (error) {
        console.log(error);
        cb(error, false)
    }
  }
));

passport?.serializeUser((user, done)=>{
   
    try {
        if(user?.id){
            done(null, user?.id)
        }else if(user?._id){
            done(null, user?._id)
        }
    } catch (error) {
        console.log(error);
        done(error, false);
    }
})

passport.deserializeUser((user,done)=>{

   try {
        if(user?.id){
            done(null, user?.id)
        }else if(user?._id){
            done(null, user?._id)
        }
   } catch (error) {
        console.log(error)
        res?.sendStatus(500)
   }
})

