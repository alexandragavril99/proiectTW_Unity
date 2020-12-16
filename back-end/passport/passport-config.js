import passportLocal from "passport-local";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;

const initPassport = function (passport, getUserByEmail, getUserById) {
  console.log("AICI");
  const authUser = async (email, password, done) => {
    console.log("AICI IAR");
    const user = await getUserByEmail(email);
    console.log(user);
    if (user == null) {
      console.log("user null");
      return done(null, false, { message: "No user found!" });
    }
    try {
      //  console.log(user.Parola);
      if (await bcrypt.compare(password, user.Parola)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "Email" }, authUser));
  passport.serializeUser((user, done) => {
    done(null, user.IdProfesor);
  });

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};

export { initPassport };
