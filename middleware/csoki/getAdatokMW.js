
const requireOption = require('../requireOption');
/**
 * Betölti a többi felhasználó adatait.
 */
module.exports = function (objectrepository) {
	const UserModel=requireOption(objectrepository, 'UserModel');

  return function (req, res, next) {
	  
	  UserModel.find({_tulajdonos: {$ne : res.locals.user._id}}, (err,users) => {
		  if(err) {
			  return next(err);
		  }
		  		  
		  
		  res.locals.users=users;

		  return next();
	  });
  };

};