
const requireOption = require('../requireOption');
/**
 * Betölti az összes csokit.
 */
module.exports = function (objectrepository) {
	const CsokiModel=requireOption(objectrepository, 'CsokiModel');

  return function (req, res, next) {
	  
	  CsokiModel.find({ }, (err,nscsokik) => {
		  if(err) {
			  return next(err);
		  }
		  		  
		  res.locals.nscsokik=nscsokik;

		  return next();
	  }).populate('_tulajdonos');
  };

};