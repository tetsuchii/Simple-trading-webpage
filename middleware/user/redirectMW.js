  
/**
 * Amikor a '/' oldalon van a felhasználó, megnézi, hogy be van-e jelentkezve és így a megfelelő oldalra dobja át
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {

    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/registration');
    } else {
      return res.redirect('/${req.session.userid}');
    }
  };

};