import passportLocal from "passport-local"; //pentru a face login pe baza de email, username etc
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;

const initPassport = function (passport, getUserByEmail, getUserById) {
  console.log("AICI");
  const authUser = async (email, password, done) => {
    console.log("AICI IAR");
    const user = await getUserByEmail(email); //cautam emailul pe baza functiei definite in server.js
    console.log(user);
    if (user == null) {
      console.log("user null");
      return done(null, false, { message: "No user found!" }); //null tine loc de eroare de server, nu e cazul aici
    }
    try {
      //  console.log(user.Parola);
      if (await bcrypt.compare(password, user.Password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "Email" }, authUser)); //specificam ca vrem pe baza emailului si sa fol functia de mai sus
  passport.serializeUser((user, done) => {
    done(null, user.IdUser); 
  });

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};

export { initPassport };
