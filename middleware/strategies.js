import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passportConfig from '../config/socialAuth';

import dotenv from 'dotenv';

dotenv.config();

// passport.use(
//   new GoogleStrategy(
//     passportConfig.google,
//     passportConfig.google.callbackFunc
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     passportConfig.facebook,
//     passportConfig.facebook.callbackFunc
//   )
// );

// passport.serializeUser(passportConfig.serializeUser);

// passport.deserializeUser(passportConfig.deserializeUser);

// export default passport;




// Eric

// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_CLIENT_ID,       // previously was           clientId
//   clientSecret: FACEBOOK_CLIENT_SECRET,
//   callbackURL: FACEBOOK_CALLBACK_URL,
//   profileFields: ['id', 'email', 'first_name', 'last_name'],
// },
//   UserControllers.facebookCallback,
// ));





// From the debugging

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

export default passport;
