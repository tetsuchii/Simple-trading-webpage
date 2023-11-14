
const requireOption = require('../requireOption');
/**
 * Betölti a bejelentkezett felhasználó adatait.
 */
module.exports = function (objectrepository) {
	
	const UserModel = requireOption(objectrepository, 'UserModel');

  return function (req, res, next) {
	UserModel.findOne({ _id: req.session.userid }, (err,user) => {
		if (err || !user) {
			return next(err);
		}
		
		res.locals.user = user;	
    return next();
 
		});
	};
};