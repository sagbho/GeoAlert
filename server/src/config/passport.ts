import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IUser } from "../models/User";
import User from "../models/User";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "No user found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
          return done(null, false, { message: "Password incorrect" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//@ts-ignore
passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = (await User.findById(id)) as IUser;
    done(null, user);
  } catch (err) {
    done(err);
  }
});
