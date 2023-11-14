
const requireOption = require('../requireOption');
/**
 * Elmenti az adatbázisba az újonnan hozzáadott csokit./Felülírja az előző mentést.
 */
module.exports = function (objectrepository) {

	const CsokiModel = requireOption(objectrepository, 'CsokiModel');
	
	return function (req, res, next) {
	  
		if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.status === 'undefined' ||
            typeof res.locals.user === 'undefined'
        ) {
            return next();
        }
		
		if (typeof res.locals.csoki === 'undefined') {
            res.locals.csoki = new CsokiModel();
        }
		
		if (req.body.status === 'keres'){
			res.locals.csoki.status =	'keres';
		} else {
			res.locals.csoki.status = 'kinal';
		}
		
		res.locals.csoki.name = req.body.name;
		res.locals.csoki._tulajdonos = res.locals.user._id; 
	 
		res.locals.csoki.save(err => {
            if (err) {
                return next(err);
            }
			
		return res.redirect('/${res.locals.user._id}');
		});
	};
};