const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2hours
  });
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for attaching a cookie to the HTTP
   *  response. 'apollo-server-express' handles returning the response to the client.
   *  We added the 'req' object to the resolver context so we can use it to atttach the cookie.
   *  The 'req' object comes from express.
   *
   *  A secure cookie that can be used to store a user's session data has the following properties:
   *  1) It can't be accessed from JavaScript
   *  2) It will only be sent via https (but we'll have to disable this in development using NODE_ENV)
   *  3) A boomtown cookie should oly be valid for 2 hours.
   */
  // Refactor this method with the correct configuration values.
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user; // Omit the password from the token
  return jwt.sign({ id, email, fullname, bio }, secret, { expiresIn: '2h' });
}

module.exports = app => {
  return {
    async signup(parent, args, context) {
      console.log(args);
      try {
        /**
         * @TODO: Authentication - Server
         *
         * Storing passwords in your project's database requires some basic security
         * precautions. If someone gains access to your database, and passwords
         * are stored in 'clear-text' your users accounts immediately compromised.
         *
         * The solution is to create a cryptographic hash of the password provided,
         * and store that instead. The password can be decoded using the original password.
         */
        // @TODO: Use bcrypt to generate a cryptographic hash to conceal the user's password before storing it.
        const hashedPassword = await bcrypt.hash(args.user.password, 10);
        // -------------------------------

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        });

        const encodedToken = generateToken(user, app.get('JWT_SECRET'));
        console.log(`JWT: ${encodedToken}`);

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      const { email, password } = args.user;
      console.log(email, password);
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );

        console.log(user);
        if (!user) throw 'User was not Found.';
        const valid = await bcrypt.compare(password, user.password);

        if (!valid || !user) throw 'Username or password is wrong.';

        const encodedToken = generateToken(user, app.get('JWT_SECRET'));
        console.log(`JWT: ${encodedToken}`);

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: encodedToken,
          res: context.req.res
        });

        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
