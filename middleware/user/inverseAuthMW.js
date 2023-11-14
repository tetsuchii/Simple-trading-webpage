/**
 * Ha a user be van jelentkezve, a '/'-hez dobja
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {
    if (typeof req.session.userid !== 'undefined') {
      return res.redirect('/');
    }
    return next();
  };
};