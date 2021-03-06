const passport = require('passport');
const HeaderApiKey = require('passport-headerapikey').HeaderAPIKeyStrategy;
const User = require('./models/User');
const debug = require('debug')('prb:auth');

passport.use(new HeaderApiKey(
  {header: 'Authorization', prefix: 'Api-Key '},
  false,
  function(apikey, done) {
    debug('Verifying auth for:', apikey);
    User.findOne({where: {apikey: apikey}}).then(function(user) {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }).catch((err) => {
      return done(err, false);
    });
  }
));

module.exports = {
  passport: passport,
  auth: () => passport.authenticate('headerapikey',
    {session: false, failureRedirect: '/unauthorized'}),
};
