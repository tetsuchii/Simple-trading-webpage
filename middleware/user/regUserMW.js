
const requireOption = require('../requireOption');
/**
 * Új profil létrehozása, annak hozzáadása az adatbázisba. 
 */
module.exports = function (objectrepository) {
		const UserModel = requireOption(objectrepository, 'UserModel');


  return function (req, res, next) {
		if(typeof req.body.name === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined')
			{
				return next();
			}
		
		UserModel.findOne({email: req.body.email}, function (err, result) {

			if ((err) || (result !== null)) {
				res.loscals.error = 'Your email address is already registered!';
				return next();
			}

			if (req.body.name.length < 3) {
				res.locals.error = 'Legalább 3 karakterűnek kell lennie a névnek';
				return next();
			}
		
			res.locals.user=new UserModel();
			res.locals.user.name=req.body.name;
			res.locals.user.email=req.body.email;
			res.locals.user.password=req.body.password;
		
			res.locals.user.save(err => {
			if (err){
				return next(err);
			}
			//return res.redirect('/login');
		});
	});
  };
};