const requireOption = require('../requireOption');
/**
 * Betölti a bejelentkezett felhasználó csokijait.
 */
module.exports = function (objectrepository) {
	
	const CsokiModel=requireOption(objectrepository,'CsokiModel');

	return function (req, res, next) {
		if (typeof res.locals.user === 'undefined') {
			return next();
		}
		
		CsokiModel.find({ _tulajdonos: res.locals.user._id }, (err,csokik) => {
			if (err) {
				return next(err);
			}
			
			res.locals.csokik = csokik;
		
			return next();
		});
  };

};