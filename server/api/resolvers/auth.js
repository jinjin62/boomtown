const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2hours
  });
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
