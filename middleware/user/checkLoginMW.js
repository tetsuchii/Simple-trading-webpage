
const requireOption = require('../requireOption');
/**
 * Ellenőrzi, hogy a megadott jelsző és email egyezik-e a regesztráltak közül bármelyikkel.
 */
module.exports = function (objectrepository) {

  const UserModel = requireOption(objectrepository, 'UserModel');

  return function (req, res, next) {

    //not enough parameter
    if ((typeof req.body.email === 'undefined') ||
      (typeof req.body.password === 'undefined')) {
      return next();
    }
    //lets find the user
    UserModel.findOne({
      email: req.body.email
    }, function (err, result) {
      if ((err) || (!result)) {
        res.locals.error='Your email address is not registered!';
        return next();
      }

      //check password
      if (result.password !== req.body.password) {
        res.locals.error='Wrong password!';
        return next();
      }

      //login is ok, save id to session
      req.session.userid = result._id;

      //redirect to / so the app can decide where to go next
      return res.redirect('/');
    });
  };

};