import passport from 'passport';
import bcrypt from 'bcryptjs';
import { BasicStrategy } from 'passport-http';
import { findTokenById } from '@/db/token';

passport.use(
  new BasicStrategy(
    { passReqToCallback: true },
    async function (req, id, secret, done) {
      // connect to database and query against id / secret
      const user = await findTokenById(req.db, id);
      if (user && (await bcrypt.compare(secret, user.secret))) {
        done(null, user);
      }
      if (!user) {
        done(null, false);
      }
    }
  )
);

export default passport;
